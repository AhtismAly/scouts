/* Enquiry form: submit to Formspree via fetch so the visitor stays on the page.
   Set the form's action to your Formspree endpoint (https://formspree.io/f/XXXX).
   Until that is set (action still contains FORM_ID), the form shows a friendly notice. */
(function () {
  const form = document.getElementById('enquiry-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  const configured = !form.action.includes('FORM_ID');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!configured) {
      status.textContent = 'The form is not connected yet. Please email us at info@ismailiscout.com for now.';
      status.style.color = '#a5841a';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.style.color = '';
    status.textContent = 'Sending your message…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        status.style.color = '#1a7f4b';
        status.textContent = 'Thank you. Your message has been sent, and we will be in touch soon.';
        btn.textContent = 'Sent ✓';
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = (data.errors && data.errors.map((x) => x.message).join(', ')) || 'Something went wrong.';
        status.style.color = '#b3261e';
        status.textContent = msg + ' Please try again, or email info@ismailiscout.com.';
        btn.disabled = false;
        btn.textContent = original;
      }
    } catch (err) {
      status.style.color = '#b3261e';
      status.textContent = 'Could not send just now. Please check your connection, or email info@ismailiscout.com.';
      btn.disabled = false;
      btn.textContent = original;
    }
  });
})();
