/* bibisipra.com — GA4 conversion events. CSP: no inline scripts, so this lives here.
   Key events in GA4 (Admin → Key events): generate_lead (contact.js),
   linkedin_click and resume_download (below). Event names must not change
   without updating the GA4 key-event list. */
(function () {
  'use strict';

  function track(name, params) {
    if (typeof window.gtag === 'function') { window.gtag('event', name, params || {}); }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) { return; }
    var href = a.href;
    var where = a.getAttribute('data-cta') || location.pathname;

    if (/linkedin\.com\//i.test(href)) {
      track('linkedin_click', { link_url: href, cta_location: where });
    } else if (/\.pdf(\?|#|$)/i.test(href)) {
      track('resume_download', { link_url: href, file_name: href.split('/').pop().split('?')[0], cta_location: where });
    } else if (/\/resume\/?(\?|#|$)/.test(a.getAttribute('href') || '') && location.pathname !== '/resume/') {
      track('resume_click', { cta_location: where });
    }
  }, true);
})();
