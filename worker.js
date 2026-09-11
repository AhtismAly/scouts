// Ismaili Scouts website Worker.
// - Serves the static site from the ASSETS binding.
// - POST /api/enquiry: emails the enquiry via Cloudflare Email Routing.
//   Any attached photos/videos are stored in R2 (UPLOADS) and the email
//   includes private download links served by GET /api/file/<key>.
//
// Free-tier guard: R2's free allowance is 10 GB. To avoid any charge, this
// Worker checks total bucket usage on every upload:
//   - at/over 8 GB it adds a "storage almost full" warning to the email;
//   - if a new upload would push usage past 9 GB it does NOT store the files
//     (the enquiry still emails through, with a note to clear old uploads).
import { EmailMessage } from "cloudflare:email";

const TO = "ahtismaly@gmail.com";          // verified Email Routing destination
const FROM = "noreply@ismailiscout.com";   // any address on the domain
const SITE = "https://ismailiscout.com";
const MAX_FILES = 6;
const MAX_FILE_BYTES = 45 * 1024 * 1024;   // 45 MB per file

const GB = 1000 * 1000 * 1000;             // use decimal GB so we stop early
const WARN_LIMIT = 8 * GB;                 // warn in the email from here
const HARD_LIMIT = 9 * GB;                 // never store past here

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry" && request.method === "POST") {
      return handleEnquiry(request, env);
    }
    if (url.pathname.startsWith("/api/file/") && request.method === "GET") {
      return serveFile(url, env);
    }
    return env.ASSETS.fetch(request);
  },
};

function clean(s) {
  return String(s || "").replace(/[\r\n]+/g, " ").trim();
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
function safeName(name) {
  return String(name || "file").replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 80) || "file";
}

// Total bytes currently stored in the bucket.
async function bucketUsage(env) {
  let total = 0;
  let cursor;
  for (;;) {
    const list = await env.UPLOADS.list({ cursor, limit: 1000 });
    for (const o of list.objects) total += o.size || 0;
    if (!list.truncated) break;
    cursor = list.cursor;
  }
  return total;
}

async function handleEnquiry(request, env) {
  try {
    const form = await request.formData();

    // Honeypot: bots fill this hidden field, real people never see it.
    if (clean(form.get("_gotcha"))) return json({ ok: true });

    const name = clean(form.get("name"));
    const email = clean(form.get("email"));
    const region = clean(form.get("region"));
    const interest = clean(form.get("interest"));
    const message = String(form.get("message") || "").trim();

    if (!name || !email) {
      return json({ ok: false, errors: [{ message: "Please add your name and email." }] }, 400);
    }

    // Collect uploaded files (input name="files", multiple).
    const files = form.getAll("files").filter((f) => f && typeof f === "object" && f.size > 0);
    if (files.length > MAX_FILES) {
      return json({ ok: false, errors: [{ message: `Please attach at most ${MAX_FILES} files.` }] }, 400);
    }
    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) {
        return json({ ok: false, errors: [{ message: `"${file.name}" is larger than 45 MB. Please send a smaller file or a link.` }] }, 400);
      }
    }

    const links = [];
    let storageNote = "";

    if (files.length) {
      const used = await bucketUsage(env);
      const incoming = files.reduce((s, f) => s + f.size, 0);

      if (used + incoming > HARD_LIMIT) {
        // Storage full: do not store, but still deliver the enquiry.
        storageNote =
`\n*** ATTACHMENTS NOT STORED ***
Storage is full: ${(used / GB).toFixed(2)} GB of the 10 GB free limit is used, and these files would push it over 9 GB.
Please clear old attachments in Cloudflare R2 (bucket "scouts-uploads"), then ask the sender to resend, or have them email the files to info@ismailiscout.com.
`;
      } else {
        for (const file of files) {
          const key = `enquiries/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName(file.name)}`;
          await env.UPLOADS.put(key, file.stream(), {
            httpMetadata: { contentType: file.type || "application/octet-stream" },
          });
          links.push(`${SITE}/api/file/${key}`);
        }
        const after = used + incoming;
        if (after >= WARN_LIMIT) {
          storageNote =
`\n*** STORAGE ALMOST FULL ***
R2 storage is now about ${(after / GB).toFixed(2)} GB of the 10 GB free limit.
Please log in to Cloudflare R2 (bucket "scouts-uploads") and delete old attachments soon, so uploads keep working and you are never charged.
`;
        }
      }
    }

    const attachmentBlock = links.length
      ? `\nAttachments (${links.length}):\n` + links.map((l) => `  ${l}`).join("\n") + "\n"
      : "\nAttachments: none\n";

    const body =
`New enquiry from ismailiscout.com

Name:          ${name}
Email:         ${email}
Town / region: ${region}
Interested in: ${interest}

Message:
${message}
${attachmentBlock}${storageNote}`;

    const raw = [
      `From: Ismaili Scouts Website <${FROM}>`,
      `To: <${TO}>`,
      `Reply-To: ${name} <${email}>`,
      `Message-ID: <${crypto.randomUUID()}@ismailiscout.com>`,
      `Subject: New enquiry from ismailiscout.com`,
      `MIME-Version: 1.0`,
      `Content-Type: text/plain; charset="utf-8"`,
      ``,
      body,
    ].join("\r\n");

    await env.SEB.send(new EmailMessage(FROM, TO, raw));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, errors: [{ message: "Could not send just now. Please email info@ismailiscout.com." }] }, 500);
  }
}

async function serveFile(url, env) {
  const key = decodeURIComponent(url.pathname.slice("/api/file/".length));
  if (!key) return new Response("Not found", { status: 404 });
  const obj = await env.UPLOADS.get(key);
  if (!obj) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);
  headers.set("Content-Disposition", `attachment; filename="${safeName(key.split("/").pop())}"`);
  headers.set("Cache-Control", "private, max-age=3600");
  return new Response(obj.body, { headers });
}
