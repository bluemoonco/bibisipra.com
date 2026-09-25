/* bibisipra.com — Direct Contact form (Web3Forms)
   Same pattern as the other sites: native HTML POST works without JS
   (Web3Forms redirects to /thank-you/); with JS we validate, submit async
   and show an inline status. Leads go to the inbox the access key is
   registered to (bibisipra@gmail.com) — the address never appears in the page. */
(function () {
  'use strict';

  var yr = document.getElementById('yr');
  if (yr) { yr.textContent = new Date().getFullYear(); }

  var form = document.getElementById('leadForm');
  if (!form) { return; }
  var statusBox = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  var keyConfigured = /^[0-9a-f-]{36}$/i.test(form.elements.access_key.value.trim());

  var rules = {
    first_name: { test: function (v) { return v.trim().length >= 1; }, msg: 'Please enter your first name.' },
    last_name:  { test: function (v) { return v.trim().length >= 1; }, msg: 'Please enter your last name.' },
    email:      { test: function (v) { return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()); }, msg: 'Please enter a valid email address so Bibi can reply.' },
    message:    { test: function (v) { return v.trim().length >= 5; }, msg: 'Please add a short message about the role or request.' }
  };

  function showError(input, msg) {
    var wrap = input.closest('.field');
    var err = document.getElementById('err-' + input.id);
    if (wrap) { wrap.setAttribute('data-invalid', ''); }
    input.setAttribute('aria-invalid', 'true');
    if (err) { err.textContent = msg; err.hidden = false; }
  }
  function clearError(input) {
    var wrap = input.closest('.field');
    var err = document.getElementById('err-' + input.id);
    if (wrap) { wrap.removeAttribute('data-invalid'); }
    input.removeAttribute('aria-invalid');
    if (err) { err.hidden = true; err.textContent = ''; }
  }
  function validate(input) {
    var rule = rules[input.name];
    if (!rule) { return true; }
    if (rule.test(input.value)) { clearError(input); return true; }
    showError(input, rule.msg);
    return false;
  }

  Object.keys(rules).forEach(function (key) {
    var input = form.elements[key];
    if (!input) { return; }
    input.addEventListener('blur', function () { if (input.value) { validate(input); } });
    input.addEventListener('input', function () {
      if (input.hasAttribute('aria-invalid') && rules[key].test(input.value)) { clearError(input); }
    });
  });

  function setStatus(kind, title, body) {
    statusBox.innerHTML = '<div class="' + kind + '"><strong>' + title + '</strong>' + body + '</div>';
  }
  function busy(on) {
    submitBtn.disabled = !!on;
    submitBtn.textContent = on ? 'Sending…' : 'Submit';
    if (on) { form.setAttribute('aria-busy', 'true'); } else { form.removeAttribute('aria-busy'); }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    statusBox.innerHTML = '';

    var firstBad = null;
    Object.keys(rules).forEach(function (key) {
      var input = form.elements[key];
      if (input && !validate(input) && !firstBad) { firstBad = input; }
    });
    if (firstBad) {
      firstBad.focus();
      setStatus('bad', 'Please check the highlighted fields', 'A required detail is missing.');
      return;
    }

    /* Web3Forms honeypot checkbox (never autofilled): pretend success, send nothing */
    if (form.elements.botcheck && form.elements.botcheck.checked) {
      form.reset();
      setStatus('ok', 'Thank you.', 'Your message has been received.');
      return;
    }

    if (!keyConfigured) {
      console.error('[form] Web3Forms access key not set in index.html (PASTE-YOUR-WEB3FORMS-KEY-HERE).');
      setStatus('bad', 'The contact form is being set up', 'Please try again shortly.');
      return;
    }

    var data = new FormData(form);
    /* one readable name for the email Web3Forms sends; reply-to = sender */
    data.set('name', (data.get('first_name') + ' ' + data.get('last_name')).trim());
    data.set('replyto', data.get('email'));

    busy(true);
    var controller = 'AbortController' in window ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 20000) : null;

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) { return res.json().catch(function () { return { success: false, _status: res.status }; }); })
      .then(function (json) {
        busy(false);
        if (json && json.success === true) {
          form.reset();
          setStatus('ok', 'Thank you — your message is on its way to Bibi.',
            'She will reply to the email address you provided.');
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', { event_category: 'form', event_label: 'bibisipra_direct_contact' });
          }
        } else {
          if (json) { console.error('[form] Web3Forms response:', json); }
          setStatus('bad', 'That didn’t go through',
            'Your message is still in the form. Please try again in a moment.');
        }
      })
      .catch(function () {
        busy(false);
        setStatus('bad', 'Connection problem',
          'Your message is still in the form. Please check your connection and try again.');
      })
      .then(function () { if (timer) { clearTimeout(timer); } });
  });
})();
