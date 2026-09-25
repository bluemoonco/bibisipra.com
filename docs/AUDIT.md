# SEO / GEO build notes — bibisipra.com (rebuilt 25 Sept 2026)

Goal: be found and correctly summarized by recruiters, search engines, AI assistants (ChatGPT, Claude, Perplexity, Gemini / AI Overviews, Copilot) and job-matching bots looking for US corporate tax / ASC 740 candidates for US and APAC roles.

This rebuild replaces the earlier redesign in this repo. It restores the original Weebly look (black/charcoal, Roboto + Poppins, blue #4c64e9 pill buttons, same portrait) and keeps the original copy nearly verbatim, with the SEO/GEO structure built underneath.

## Weebly vs. now

| Weebly | Now |
|---|---|
| No H1 (name was an H2) | One H1 = "Bibi Sipra, CPA"; each expertise block is an H2 |
| OG image = Weebly blank placeholder | 1200x630 branded share card (LinkedIn/Slack/Teams previews) |
| Connect → LinkedIn | Connect → on-page Direct Contact form (Web3Forms → bibisipra@gmail.com) |
| Weebly JS, jQuery, repeated font loads | Static HTML, one Google Fonts request, small JS, WebP images; fast LCP |
| Basic Person schema | JSON-LD graph: WebSite, ProfilePage, ImageObject, Person (credentials, alumniOf, knowsAbout, hasOccupation, seeks → target roles/locations), FAQPage |
| No llms.txt | /llms.txt plain-text profile for AI crawlers |
| Default robots | robots.txt explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, Bingbot, LinkedInBot, etc. |
| Capability copy only | Added Experience (EY 2016–2023, 495+ return project, CPA / USF MBA), Target roles & locations, Recruiter Q&A |

Copy tweaks: "CARES" → "CARES Act", "OneSource" → "ONESOURCE", one bullet tightened.

## Why each piece matters

- **Visible Q&A + FAQPage schema:** AI answer engines lift short, self-contained Q&A. Each answer restates the name and key facts so it stands alone when quoted.
- **seeks / target locations:** makes "open to US remote, Singapore, KL, Bangkok, Jakarta" machine-readable without claiming she works there now.
- **Consistent entity facts:** name, "CPA", "EY 2016–2023", "Senior Tax Manager", "ASC 740" appear identically in title, H1, schema, llms.txt and the share card. Keep LinkedIn and other profiles consistent with this wording.
- **Descriptive image filenames and alt text** for image search.
- **Performance:** only Google Fonts and the form endpoint are third-party; strict CSP.
- **LinkedIn in sameAs + visible links (rel=me)** ties the site to her LinkedIn identity; **Tampa Bay, Florida** home location helps US metro recruiter searches.

## Sources for experience facts
Existing Weebly copy and the public Pangea profile (https://pangea.app/profile/bibi-sipra-cpa). Nothing else was added. Specialist topics (GILTI, Subpart F, Pillar Two, transfer pricing) are not claimed — add only if Bibi confirms.

## Next wins (need Bibi's input)
- Downloadable one-page CV (PDF) linked from the page.
