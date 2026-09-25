# Deploying bibisipra.com

Static site; publish `public/`. See also README.md.

## Cloudflare Pages

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

