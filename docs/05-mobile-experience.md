# Sham Dental — Mobile Experience Design

Most patients in the region discover and book on a phone, often one-handed,
frequently via WhatsApp. Mobile is not a shrink of desktop — it's the **primary
conversion surface**. The desktop-first design degrades into a deliberately
crafted mobile journey.

## 1. Principles
1. **Thumb-first.** Primary actions sit in the lower 2/3 of the screen; the
   WhatsApp FAB and sticky Book are always reachable.
2. **One column, big rhythm.** Generous vertical spacing, one idea per scroll.
3. **Tap targets ≥ 44px.** Buttons, nav items, slider handle, list rows.
4. **Lighter motion.** Keep reveals and counters; drop heavy parallax/loops to
   protect battery and smoothness.
5. **Speed is luxury.** Sub-2.5s LCP on 4G; nothing janky ever.

## 2. Layout adaptations (from `styles.css`)
| Section | Desktop | Tablet (≤1024) | Phone (≤720) |
|---------|---------|----------------|--------------|
| Nav | Full links + Book + lang | Same | Burger → full-screen overlay menu |
| Hero | Headline + 2 floating cards | Cards hidden | Headline scales `clamp(2.6rem,13vw,4rem)`, single-column CTAs |
| Trust | 4 columns | 2 columns | 2 columns, tighter gap |
| Story | Side-by-side | Stacked (visual under steps) | Stacked, swipe/tap steps |
| Services | Feature(2-col)+grid of 3 | 2 columns | 1 column, full-width cards |
| Before/After | 2 columns | Stacked | Stacked; **touch-drag** slider |
| Experts | 3 columns | 2 columns | 1 column |
| Technology | 2×2 | 1 column | 1 column |
| Testimonials | 380px cards marquee | same | 300px cards marquee |
| Locations | List ↔ map | Stacked | Stacked; list above map |
| Footer | 4 columns | 2 columns | 1 column |

## 3. Navigation pattern
- Burger reveals a **full-screen ink overlay** (`.mobile-menu`) with
  display-serif links and stacked **Book** + **WhatsApp** CTAs.
- Menu closes on link tap; slide-in `translateX` (0.6s ease-lux).
- Consider a future **bottom tab bar** (Book · Call · WhatsApp · Menu) for
  even faster conversion.

## 4. Touch interactions
- **Before/After:** `touchstart/move/end` drag the handle (already implemented);
  auto-hint wobble shows it's interactive.
- **Story timeline:** tap a step to switch; auto-advance continues.
- **Testimonials:** finger can grab/scroll; marquee pauses, momentum scroll.
- **Locations:** tap a branch → pin animates, card updates.
- All hover-only affordances have a tap/visible equivalent (no hidden CTAs).

## 5. Performance budget (mobile)
- **LCP < 2.5s**, **CLS < 0.1**, **INP < 200ms**.
- Hero: serve a poster image first; lazy-init video (or skip video on
  slow/`save-data` connections) — keep the animated gradient as the always-on
  luxury layer.
- Images: responsive `srcset`, WebP/AVIF, explicit dimensions to avoid CLS,
  `loading="lazy"` below the fold.
- JS is vanilla and tiny; scroll handlers passive + rAF; observers disconnect
  after firing.

## 6. Accessibility on mobile
- `prefers-reduced-motion` honored (reveals/marquee/parallax disabled).
- Color contrast AA+ on all text over imagery (gradient scrims guarantee it).
- Focus states visible; language toggle reachable; semantic headings order.
- Dynamic type friendly (rem/clamp based).

## 7. Conversion on mobile
- Persistent **WhatsApp FAB** (pulsing) — the region's preferred channel.
- `tel:` click-to-call in Final CTA and footer.
- Booking form: minimal fields, large inputs, native date/time pickers,
  autofill-friendly, single-thumb completion.
