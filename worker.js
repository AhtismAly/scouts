// Ismaili Scouts website Worker.
// Serves the static site from the ASSETS binding, and handles the enquiry
// form POST at /api/enquiry by emailing the team via Cloudflare Email Routing.
import { EmailMessage } from "cloudflare:email";

const TO = "ahtismaly@gmail.com";          // verified Email Routing destination
const FROM = "noreply@ismailiscout.com";   // any address on the domain

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry" && request.method === "POST") {
      return handleEnquiry(request, env);
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

    const body =
`New enquiry from ismailiscout.com

Name:          ${name}
Email:         ${email}
Town / region: ${region}
Interested in: ${interest}

Message:
${message}
`;

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

    const msg = new EmailMessage(FROM, TO, raw);
    await env.SEB.send(msg);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, errors: [{ message: "Could not send just now. Please email info@ismailiscout.com." }] }, 500);
  }
}
