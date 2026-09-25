(() => {
  'use strict';
  const form = document.getElementById('inquiry-form');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');
  const key = form.elements.access_key.value.trim();
  const configured = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key);
  let sending = false;
  if (configured) { button.disabled = false; status.textContent = ''; }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!configured || sending || !form.reportValidity()) return;
    if (form.elements.botcheck.checked) {
      status.textContent = 'Your inquiry could not be submitted. Please email Bibi directly.';
      return;
    }
    sending = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your inquiry…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission not accepted');
      form.reset();
      status.textContent = 'Thank you. Your inquiry has been submitted to Bibi.';
    } catch (error) {
      status.textContent = 'We couldn’t confirm submission. Your message is still here. Please try again later or email bibisipra@gmail.com directly.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
