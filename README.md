# YOUNG STAR BOYZ — Ganesh Puja Committee Website

A responsive single-page website for the YOUNG STAR BOYZ Ganesh Puja Committee, Binjharpur, Bachhol, Odisha. Built with plain HTML, CSS and JavaScript; no build step or framework is required.

## Included sections and original content

- Announcement bar and responsive navigation
- Hero section with Ganesh mantra, “Since 2008” message and calls to action
- Live countdown to Ganesh Chaturthi (Saturday, 4 September 2027, midnight IST)
- Committee values and festival highlights
- Full original committee introduction and three core values: Devotion, Culture and Community
- Ganesh Puja programme: Pran Pratishtha, daily aarti and visarjan
- Traditional Ganesh mantra with its English meaning
- Contribution information and supported celebration expenses
- Contact details, location and contribution/volunteer contact prompt
- Footer with committee identity and social links

The updated design follows the supplied black-and-gold reference. The separate Gallery section has intentionally been left out, as requested; the original programme and all other original content have been retained.

## Run locally

1. Extract the ZIP.
2. Open `Young-Star-Boyz-main/index.html` in a browser.

## Before publishing

Update these placeholders in `index.html`:
- Phone / WhatsApp contact number (`Contact number — to be added`)
- Social profile links currently set to `#`
- The `tel:` link if the committee contact number changes

Programme dates and timings marked “To be announced” should be updated once confirmed by the committee. Confirm the local puja muhurat for the committee's city before publishing worship timings.

## Change the countdown date

In `script.js`, edit `targetTime` / the date string `2027-09-04T00:00:00+05:30`.

## Project files

- `index.html` — all website content and sections
- `style.css` — responsive layout, styling and design tokens
- `script.js` — mobile navigation, scroll highlighting, reveal effects, footer year and countdown
- `g.png` — committee logo
- `assets/` — hero, committee and event image assets
