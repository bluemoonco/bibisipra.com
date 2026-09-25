# Deploying the static site

## Build and local review

There is no build dependency. Publish only `public/`.

```sh
python3 -m http.server 8765 --directory public
```

The report under `docs/` is internal project documentation and is not in the published directory. The public site uses a small contact script and Web3Forms for email delivery; it has no analytics tag.

## Cloudflare Pages (Git integration)

This is a deployment-ready option, not a claim that Cloudflare is currently serving the domain.

1. Connect `bluemoonco/bibisipra.com` to a Pages project.
2. Production branch: `main`.
3. Framework preset: None.
4. Build command: `exit 0`.
5. Build output directory: `public`.
6. Root directory: repository root.
7. Check the generated HTTPS Pages URL before changing the domain.
8. Add `www.bibisipra.com` and `bibisipra.com` as custom domains through the Pages project. Review existing records first; retain mail and unrelated records. The intended canonical is `https://www.bibisipra.com/`.
9. Configure an apex-to-www 301 Redirect Rule in Cloudflare for hostname `bibisipra.com`, preserving the path and query string. Pages `_redirects` does not support domain-level redirects. `_redirects` handles `/index.html`; `_headers` handles response headers. Confirm their behavior in production. Other hosts require equivalent configuration.
10. The existing Weebly contact backend is not part of this deployment. The new site uses an inquiry form and the user-supplied email bibisipra@gmail.com. Activate Web3Forms before enabling submissions.

## Required post-deployment checks

- Root and privacy page return 200; a made-up path returns 404.
- `https://bibisipra.com/` redirects to the www canonical without a loop.
- `/index.html` resolves to the canonical root.
- `/robots.txt`, `/sitemap.xml` and `/llms.txt` return their actual content rather than an HTML fallback; llms.txt is served as text/plain.
- No production `noindex` or host-level crawler challenge blocks search access.
- Header navigation, anchors, skip link, FAQ details and inquiry form and email links work on desktop and mobile.
- Inspect widths 360, 390, 768 and 1440 pixels for clipping, portrait crop and legibility. Verify keyboard navigation and image loading.
- Validate the production URL with Google's Rich Results Test and Schema.org Validator.
- If Search Console/Bing Webmaster access exists, submit the canonical sitemap and request recrawl. Do not create fake verification files or claim submission without a verified account response.
- Record the deployed commit and retain the previous hosting configuration for rollback.

## Measurement plan

After launch, establish a baseline for branded/non-branded search impressions, profile clicks, target-region interest and qualified recruiter conversations. If a site-specific analytics property is supplied, track inquiry CTA clicks and successful submissions without sending message contents or other personal data. Never reuse another site's analytics ID.

## Future content additions requiring Bibi's input

A current approved CV, verified direct business email, current CPA licensing details, and examples confirming specialist international-tax competencies would strengthen the profile further. Do not invent them or publish private resume details by inference.
