# bibisipra.com — audit and implementation

Reviewed 25 September 2026. Contact-flow update: the user subsequently requested removal of LinkedIn. The current implementation uses the on-page inquiry form with bibisipra@gmail.com as the intended recipient; Web3Forms activation is still required. The tables below describe the initial audit/rebuild. This report distinguishes observed production behavior from the replacement implementation. Committing this repository does not prove a production deployment.

## Current production findings

Source: https://www.bibisipra.com/ (live HTML retrieved successfully). The naked-domain request timed out from the execution environment; that does not establish an outage. The www site loaded in the browser.

| Area | Observed finding | Replacement |
|---|---|---|
| Positioning | Hero says US Tax Compliance & Reporting; Southeast Asia hiring intent is not prominent | Leads with US corporate tax and Southeast Asia, with four named target hubs |
| Career evidence | Broad capability statements; no visible career progression or education | Adds EY progression, a specific Deloitte-team project and USF education from public professional profile |
| Headings | No H1; name and other headings are H2 | One H1, logical H2/H3 sections, native navigation and main landmark |
| Metadata | Existing title, description and canonical; service/fractional focus | Recruiting-specific title, description and social metadata; preserves www canonical |
| Social image | Open Graph uses Weebly's blank placeholder | Uses existing Bibi portrait |
| Structured data | Existing Person markup and expat-role Demand | Linked ProfilePage/Person graph, stable IDs, skills, credentials, alumni and clearly labeled target regions |
| Sitemap | Lists /index.html while canonical is / | Sitemap uses canonical root; redirect configuration normalizes /index.html |
| Crawlers | robots.txt permits general crawling except /ajax/ and /apps/; NerdyBot blocked | Static replacement allows crawling and declares sitemap |
| AI summary | /llms.txt returns 404 | Plain Markdown /llms.txt mirrors visible profile |
| Conversion | Generic LinkedIn “Connect”; form requires first/last name, phone, email, message | Clear recruiter CTAs, role-brief guidance and LinkedIn CV-request path |
| Dependencies | Multiple repeated font links, legacy jQuery, Weebly application scripts and form backend | No client application JS, no external fonts, self-contained CSS and portrait |
| Repository | main initially contained only README.md | Complete static site under public/; review and deployment notes in docs/ |

The old site is already indexed in available search results; it is not accurate to call it unindexable or claim it has no SEO. The main opportunity is stronger candidate intent, evidence and structure.

## Keyword strategy

Put the primary concept in the title, H1, opening copy, description and profile summary: **Big 4-trained US CPA / US corporate tax + Southeast Asia**. ASC 740, US GAAP, direct income tax, SEC reporting, multinational compliance and cross-border leadership have supporting content. Target role titles and Singapore, Kuala Lumpur, Bangkok and Jakarta are visibly labeled as desired opportunities.

Do not pursue a percentage-based “keyword density” target. The objective is clear, useful recruiter content rather than repetition. Do not make cloned city pages without distinct information.

## Evidence and claims

- Existing website: corporate tax, CPA, ASC 740, US GAAP (existing schema), SEC reporting, valuation allowance, deferred tax, ONESOURCE, multinational collaboration and relocation interest. Public professional claims are reused; no independent CPA license-status verification was performed.
- https://pangea.app/profile/bibi-sipra-cpa : EY 2016–2023 progression through Tax Senior Manager; two Deloitte teams with 11 and 8 people and 495+ multistate returns; USF MBA and bachelor's education. Historical profile, not confirmation of current employer or immediate availability.
- https://www.linkedin.com/in/bibisipra/ : identity/contact destination already linked from the live site. No private profile information was accessed.
- User brief: target Southeast Asia cities, MNC hiring audience and desired role positioning.
- No verified specialist evidence was found for Subpart F, GILTI, FDII, Pillar Two / BEPS, M&A due diligence or cross-border structuring. Those terms appear only as potential role-remit discussion topics and are deliberately excluded from knowsAbout. Add them as skills only after Bibi confirms the relevant experience.
- No invented employer, current executive title, license number, licensing jurisdiction, local tax qualification, office, immigration status, availability date, deal value or client name.
- Target regions are represented in a clearly described seeks/Demand object. workLocation is intentionally not populated with desired cities: that would suggest current work locations. No current work location more specific than “US-based” is asserted.

## Lead-generation decisions

LinkedIn is the confirmed professional contact channel. A static copy of the Weebly form would not reliably deliver inquiries; its backend depends on the old host. The replacement does not show a fake form or invented contact email. This changes the conversion path to LinkedIn and may exclude visitors without LinkedIn messaging access. A verified direct email and mail delivery service would enable a lower-friction on-site contact form later. No contact test was sent to Bibi.

The page gives recruiters a concise brief: credentials, strongest capabilities, historical evidence, desired mandates, four target hubs and a clear next action. It avoids implying that a US credential establishes local Southeast Asian tax expertise.

## Technical and AI-search limits

- Static semantic HTML exposes the profile without JavaScript. All important factual text appears visibly, not only in JSON-LD or llms.txt.
- ProfilePage markup describes a page about one person. Schema eligibility and search display are not guaranteed; validate again on the production URL.
- llms.txt is supplemental. Google says it does not improve or reduce Google Search visibility. No claim is made that LinkedIn Recruiter or another proprietary sourcing platform consumes it.
- robots.txt cannot override a hosting provider's firewall, bot challenges, account settings or HTTP headers. Host-level crawler rules need review after deployment.
- Search engine recrawling/indexing and recruiter leads are outcomes to measure, not guaranteed deliverables.

Primary technical references:
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- https://schema.org/Person
- https://schema.org/Demand
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Validation and open deployment items

Passed local source checks for one H1 and one main per page, unique IDs, valid in-page anchors, existing internal routes/assets, parseable JSON-LD and linked entity IDs. Content and contact destinations were inspected. No form submission occurred.

The design includes responsive breakpoints, a skip link, visible focus styling, native details elements, reduced-motion support, image dimensions and print styles. Local browser preview was blocked by this environment's URL policy; rendered desktop/mobile QA and Core Web Vitals remain unverified until an HTTPS deployment is accessible. The existing portrait is retained in a 150 KB WebP export (from the 1.6 MB PNG), without changing its composition or dimensions.

At audit time there was no observed hosting pipeline in the repository, and the live host was Weebly. The GitHub source alone cannot replace that deployment. Publishing requires the host account or a Git-connected static host plus approved domain configuration. No DNS or mail records were changed.
