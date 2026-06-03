# Sham Dental — Full Website Sitemap

A premium clinic site stays shallow and decisive. Every path leads back to one
action: **Book**. The architecture below balances SEO depth (service & location
landing pages) with a frictionless conversion spine.

```
HOME (/)
│
├── The Journey (/journey)              ← "Transformation Story" expanded
│     └── How treatment works, what to expect, comfort & sedation
│
├── Services (/services)
│     ├── Dental Implants            (/services/dental-implants)
│     ├── Hollywood Smile / Veneers  (/services/hollywood-smile)
│     ├── Orthodontics / Aligners    (/services/orthodontics)
│     ├── Teeth Whitening            (/services/teeth-whitening)
│     ├── Root Canal / Endodontics   (/services/root-canal)
│     ├── Children's Dentistry       (/services/childrens-dentistry)
│     └── General & Preventive       (/services/general-dentistry)
│
├── Results (/results)                  ← Before/After gallery + case studies
│     └── Case Study detail            (/results/[case-slug])
│
├── Experts (/experts)
│     └── Doctor profile               (/experts/[doctor-slug])
│
├── Technology (/technology)
│
├── Patient Stories (/stories)          ← Video testimonials hub
│
├── Locations (/locations)
│     ├── Dubai — Downtown             (/locations/dubai-downtown)
│     ├── Abu Dhabi — Corniche         (/locations/abu-dhabi-corniche)
│     └── Riyadh — Olaya               (/locations/riyadh-olaya)
│
├── About (/about)
│     ├── Our Story / Philosophy
│     ├── Accreditations & Safety
│     └── Careers                      (/careers)
│
├── Book Appointment (/book)            ← Conversion hub (multi-step form)
│
├── Contact (/contact)
│
└── Utility
      ├── Insurance & Financing        (/financing)
      ├── FAQ                          (/faq)
      ├── Blog / Smile Journal         (/journal) → /journal/[post]
      ├── Privacy Policy               (/privacy)
      ├── Terms                        (/terms)
      └── Accessibility Statement      (/accessibility)
```

## Localization

Every route is duplicated for Arabic with full RTL:

```
/        ↔  /ar/
/services/dental-implants  ↔  /ar/services/dental-implants
```

Use `hreflang` tags (`en`, `ar`, `x-default`) and a persistent language switch
in the navigation (implemented on the homepage).

## Global navigation

**Primary nav (desktop):** The Journey · Services · Results · Experts ·
Technology · Locations → with persistent **Book Appointment** button + language
toggle.

**Footer:** Services list · Company (Journey, Experts, Technology, Locations) ·
Contact · Legal/utility links · social.

**Persistent conversion elements:** floating WhatsApp FAB (all pages),
sticky "Book" in nav, click-to-call on mobile.

## Conversion spine

```
Any page  →  Book Appointment  →  Confirmation  →  WhatsApp reminder
        ╲                      ╱
         ╲→  WhatsApp / Call  ╱   (always one tap away)
```

## URL & SEO principles

- Flat, human-readable, keyword-aligned slugs (`/services/hollywood-smile`).
- One H1 per page; service pages target `[treatment] + [city]` intent.
- Location pages carry `LocalBusiness`/`Dentist` schema + Google Business links.
- Case-study & doctor pages drive E-E-A-T (experience, expertise, trust).
