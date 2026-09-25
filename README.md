# bibisipra.com

Professional profile site for **Bibi Sipra, CPA** — US corporate tax, ASC 740 and SEC reporting; open to US and APAC roles. Migrated from Weebly to a static site on GitHub + Cloudflare Pages, keeping the original look (black/charcoal, Roboto + Poppins, blue pill buttons, the same portrait).

No build step, no framework, no dependencies. Cloudflare Pages serves `public/` as-is.

## Contact form (Web3Forms)

The form posts to Web3Forms using the access key for the form **"Bibi Sipra - Direct Contact"** in the Web3Forms account (davidleeti@gmail.com). Leads go to the recipient set on that form in the Web3Forms dashboard (Form → Settings) — target recipient is **bibisipra@gmail.com** (linked email; must be verified from that inbox). The Gmail address never appears in the page source.

## Deploy (Cloudflare Pages)

Pages → Create → Connect to Git → `bluemoonco/bibisipra.com`

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `public` |
| Root directory | `/` |

Every push to `main` deploys. Then:

1. **Custom domains:** add `www.bibisipra.com` and `bibisipra.com`. Canonical is **www**.
2. **Redirect Rule** (Rules → Redirect Rules): `bibisipra.com/*` → `https://www.bibisipra.com/${1}`, 301, keep query string.
3. **Let the bots in:** Security → Bots / AI Crawl Control → turn **off** "Block AI bots" and **off** Cloudflare's managed robots.txt. Leave Bot Fight Mode off. Otherwise ChatGPT, Claude, Perplexity and Google's AI crawlers get blocked and the GEO work is wasted.
4. Cut DNS over from Weebly only after the `*.pages.dev` URL looks right. Keep any MX/TXT mail records.

## After launch

- Google Search Console + Bing Webmaster Tools: verify the domain (DNS TXT), submit `https://www.bibisipra.com/sitemap.xml`.
- IndexNow (Bing, Yandex, Seznam, Naver): the key file `public/8261aff6b20258a9843d0fb9d13f0c4f.txt` is already in place. Ping:
  `https://api.indexnow.org/indexnow?url=https://www.bibisipra.com/&key=8261aff6b20258a9843d0fb9d13f0c4f`
- Validate: https://search.google.com/test/rich-results and https://validator.schema.org on the live URL.
- Send one test through the form and confirm it lands in bibisipra@gmail.com.
- Cancel the Weebly plan once DNS has moved and the form is confirmed working.

## Files

```
public/
  index.html                 the whole profile (one page)
  thank-you/index.html       no-JS form landing page (noindex)
  privacy/index.html
  404.html
  llms.txt                   plain-text profile for AI assistants
  robots.txt                 allows all crawlers incl. AI/search bots
  sitemap.xml
  _headers / _redirects      Cloudflare Pages headers + old Weebly URL redirects
  8261aff6...c4f.txt         IndexNow key
  apple-touch-icon.png
  assets/
    site.css, contact.js     styles + form logic (bump ?v= in the HTML when changed)
    bibi-sipra-cpa-*.webp    hero portrait (desktop 1920/1280, mobile crop)
    bibi-sipra-cpa-og.jpg    1200x630 LinkedIn/social share card
    favicon.svg
docs/                        SEO/GEO notes (AUDIT.md), form setup, deployment
```

Preview locally: `python3 -m http.server 8765 --directory public`
