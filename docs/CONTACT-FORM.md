# Direct Contact form (Web3Forms)

Same setup as bradentonbushhogging.com.

- "Connect" (hero) and footer "Contact" jump to `#contact`.
- Fields: first name*, last name*, email*, phone, company/search firm, role & location, message*.
- Spam: hidden honeypot + Web3Forms `botcheck` + a 2.5-second time trap. Bots get a fake success and nothing is sent.
- With JS: inline validation, async submit, inline status. Without JS: normal POST, Web3Forms redirects to `/thank-you/`.
- Email subject: `NEW RECRUITER LEAD — bibisipra.com`. Reply-to is set to the sender, so hitting Reply in Gmail answers the recruiter.

## Status
- Web3Forms form "Bibi Sipra - Direct Contact" created in the davidleeti@gmail.com Web3Forms account; its access key is in `public/index.html`.
- bibisipra@gmail.com added as a linked email. Once the verification link in that inbox is clicked, set it as the form's recipient (Web3Forms → Bibi Sipra - Direct Contact → Settings). Until then submissions go to davidleeti@gmail.com.
- After launch, send one test and confirm delivery; mark "Not spam" in Gmail the first time.

The key is public by design (it ships in the HTML); if abused, regenerate it in the Web3Forms dashboard and update index.html.
