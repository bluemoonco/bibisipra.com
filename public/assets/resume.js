// /resume/ — print / save-as-PDF button and footer year. CSP: no inline scripts.
(function () {
  var btn = document.getElementById('printBtn');
  if (btn) { btn.addEventListener('click', function () { window.print(); }); }
  var yr = document.getElementById('yr');
  if (yr) { yr.textContent = new Date().getFullYear(); }
})();
