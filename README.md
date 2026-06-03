# Sham Dental — Luxury Dental Clinic Experience

> _"This is the most professional dental clinic I can trust with my smile."_

A modern-luxury, award-aspiring website experience for **Sham Dental**. Sham
does not sell dental treatments — it sells **confidence, beautiful smiles,
family trust, long-term oral health, premium medical care, modern technology
and peace of mind**.

This repository contains both a **working, production-ready homepage** and the
full set of **design & strategy deliverables** behind it.

---

## ✨ What's inside

### Live homepage (zero build step)
| File | Purpose |
|------|---------|
| `index.html` | Full bilingual (EN/AR) homepage, all sections |
| `assets/css/styles.css` | Complete luxury design system + animations |
| `assets/js/main.js` | Scroll reveals, counters, parallax, journey, before/after slider, locations, language switch |
| `assets/js/i18n.js` | English + Arabic content & testimonials data |

### Deliverables (`/docs`)
1. [`01-sitemap.md`](docs/01-sitemap.md) — Full website sitemap
2. [`02-ux-strategy.md`](docs/02-ux-strategy.md) — UX strategy, homepage wireframe & section-by-section layout
3. [`03-animation-spec.md`](docs/03-animation-spec.md) — Animation specifications
4. [`04-implementation-guides.md`](docs/04-implementation-guides.md) — Framer & Webflow implementation guides
5. [`05-mobile-experience.md`](docs/05-mobile-experience.md) — Mobile experience design
6. [`06-conversion-strategy.md`](docs/06-conversion-strategy.md) — Conversion optimization strategy
7. [`07-moodboard.md`](docs/07-moodboard.md) — Visual moodboard direction

---

## 🎨 Brand colors (official)

| Token | Hex | Use |
|-------|-----|-----|
| `--sham-blue` | `#317EBB` | Primary brand, trust |
| `--sham-teal` | `#1D938D` | Secondary, vitality / health |
| `--sham-gray` | `#646463` | Neutral text accents |
| Brand gradient | `135° blue → teal` | CTAs, accents, highlights |

Full token set lives in `:root` of `assets/css/styles.css`.

---

## 🧩 Homepage sections

1. **Hero** — full-screen cinematic, _"Where Confidence Begins."_
2. **Trust** — animated counters (20+ yrs · 100,000+ smiles · 48 specialists · 15+ technologies)
3. **The Transformation Story** — interactive 5-step journey timeline
4. **Services** — premium product-launch cards (Implants, Hollywood Smile, Orthodontics, Whitening, Root Canal, Children's)
5. **Before & After** — draggable interactive reveal slider
6. **Meet the Experts** — storytelling profile cards
7. **Technology** — futuristic glass cards
8. **Testimonials** — auto-scrolling premium video cards
9. **Locations** — interactive branch selector + animated map pin
10. **Final CTA** — _"Your Best Smile Is Waiting."_
11. **Footer** + floating WhatsApp

---

## 🚀 Run locally

No dependencies, no build. Open `index.html` directly, or serve it:

```bash
# Python
python3 -m http.server 8000
# then open http://localhost:8000

# or Node
npx serve .
```

---

## ✅ Built-in quality

- **Bilingual EN / AR** with full **RTL** mirroring (layout, slider, animations)
- **Performance**: vanilla JS, no frameworks, system-friendly animations, lazy-friendly imagery
- **Accessibility**: semantic landmarks, ARIA labels, keyboard-friendly anchors, `prefers-reduced-motion` honored
- **SEO**: meta tags, Open Graph, `Dentist` JSON-LD structured data
- **Responsive**: desktop-first → tablet → mobile → ultra-wide

> Photography uses Unsplash placeholders with graceful gradient fallbacks.
> Replace with the clinic's own cinematic photo/video for production.
