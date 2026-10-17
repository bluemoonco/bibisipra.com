#!/usr/bin/env python3
"""Build public/bibi-sipra-cpa-resume.pdf from the live resume page's print stylesheet.

Run from the repo root after any resume edit:
    python3 -m http.server 8765 --directory public &   # local preview server
    python3 tools/build_resume_pdf.py
Needs Playwright with Chromium (pip install playwright && playwright install chromium).
The PDF drops the web-only sections (roles grid, FAQ) so it reads as a
standard recruiter resume; everything else comes from resume.css @media print.
"""
import asyncio, sys
from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8765/resume/"
OUT = "public/bibi-sipra-cpa-resume.pdf"

PDF_CSS = """
@page { size: Letter; margin: 12mm 13mm; }
#roles, #faq, .rside__navwrap { display: none !important; }
body.resume { font-size: 9.6pt !important; line-height: 1.32 !important; }
.lead { font-size: 10.2pt !important; }
.rsec { padding-bottom: 6pt !important; margin-bottom: 8pt !important; }
.rsec > h2 { font-size: 13pt !important; padding-top: 4pt !important; margin-bottom: 6pt !important; }
.job { margin-bottom: 8pt !important; }
.rsec li { break-inside: avoid; }
#industries ul { display: block !important; }
#industries li { display: inline !important; border: 0 !important; padding: 0 !important; background: none !important; font-size: 9.4pt !important; }
#industries li + li::before { content: ' · '; }
.rsec > h2, .job__head { break-after: avoid; }
.rhead { padding-bottom: 8pt !important; }
.rhead h1 { font-size: 21pt !important; }
.rhead__title { font-size: 11.5pt !important; }
.rside { margin-bottom: 8pt !important; padding-bottom: 6pt !important; }
.pdf-contact { font-size: 9.5pt; color: #222; margin-top: 3pt; }
.pdf-contact a { color: #0a58ca; text-decoration: none; }
"""

ADD_CONTACT = """
() => {
  const meta = document.querySelector('.rhead__meta');
  if (!meta || document.querySelector('.pdf-contact')) return;
  const p = document.createElement('p');
  p.className = 'pdf-contact';
  p.innerHTML = '<a href="https://www.bibisipra.com/?utm_source=resume&utm_medium=pdf">www.bibisipra.com</a> · ' +
    '<a href="https://www.linkedin.com/in/bibisipra/">linkedin.com/in/bibisipra</a> · ' +
    'Contact: <a href="https://www.bibisipra.com/?utm_source=resume&utm_medium=pdf#contact">bibisipra.com/#contact</a>';
  meta.after(p);
}
"""

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.route("**/*googletagmanager*", lambda r: r.abort())
        await page.goto(URL, wait_until="networkidle")
        await page.emulate_media(media="print")
        await page.add_style_tag(content=PDF_CSS)
        await page.evaluate(ADD_CONTACT)
        await page.pdf(path=OUT, prefer_css_page_size=True, print_background=False,
                       tagged=True, outline=True)
        await browser.close()
    print("wrote", OUT)

asyncio.run(main())
