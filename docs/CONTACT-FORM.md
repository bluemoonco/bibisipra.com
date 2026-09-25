# Inquiry form activation

All public LinkedIn links and the LinkedIn sameAs entry have been removed at the user's request. Homepage CTAs now link to `#contact`.

Intended recipient, supplied explicitly by the user: **bibisipra@gmail.com**.

The form uses Web3Forms, native validation, a honeypot, a duplicate-submit guard, a timeout and inline status messages. Name, email and message are required; company and role/location are optional. No phone number or attachment is required. Failed submissions preserve the visitor's message. A direct email link is available as a fallback.

## Activation required

The `access_key` value in `public/index.html` is intentionally empty. The submit button stays disabled and a visible pending-activation message is shown until a valid Web3Forms public form key is present. No key was invented, no account was created, and no test message was sent.

1. Use an existing Web3Forms account or complete its login/signup process. The current signup UI requires accepting Terms and Privacy Policy; that acceptance was not performed automatically.
2. Create a form whose receiving address is **bibisipra@gmail.com** and complete any required mailbox verification.
3. Put its public form access key into the hidden `access_key` input in `public/index.html`. This is the browser-embedded form key, not a password, login token or private API credential.
4. Confirm recipient settings inside Web3Forms. The receiving inbox is bound to the key, not to the visible email link or JSON-LD value.
5. Publish and submit one clearly labeled test inquiry when authorized; confirm arrival in that inbox. An API success response confirms acceptance by Web3Forms, not inbox delivery.
6. Review Web3Forms retention and spam settings before launch.

Use the API endpoint documented at https://docs.web3forms.com/how-to-guides/html-and-javascript . Do not remove the activation guard while the key is blank. Standalone/inline design previews must never send real messages.
