# Sham Dental — UX Strategy, Wireframe & Section Layout

## 1. Strategic foundation

### Positioning
Sham Dental sells **feelings, not procedures**: confidence, beautiful smiles,
family trust, long-term health, premium care, modern technology, peace of mind.

Every section must reinforce one emotional verdict:
> _"This is the most professional dental clinic I can trust with my smile."_

### Design north star
Modern **luxury medical** — the calm precision of Apple, the materiality of
Aesop, the serenity of Aman Resorts, the aspiration of Dubai luxury real
estate. Generous negative space, cinematic imagery, restrained motion.

**Avoid:** generic stock, medical-blue templates, dated clinic layouts, dense
text blocks.

### Audiences & primary jobs-to-be-done
| Persona | Need | Primary path |
|---------|------|--------------|
| Aesthetic seeker (Hollywood smile, veneers, whitening) | Reassurance of taste + real results | Hero → Results → Experts → Book |
| Functional patient (implants, root canal) | Trust, painless, expertise | Trust → Journey → Technology → Book |
| Parent / family | Safety, gentleness, convenience | Services (Kids) → Locations → Book |
| Anxious patient | Comfort, control, no surprises | Journey → Technology → Testimonials → WhatsApp |

### Experience principles
1. **Emotion first, proof second, action always.** Every screen has a felt
   moment, a credibility anchor, and a path to book.
2. **One decision per screen.** Reduce cognitive load; never compete CTAs.
3. **Show, don't tell.** Before/after, video, 3D scanning visuals over copy.
4. **Calm confidence.** Motion is slow, weighted, intentional — never busy.
5. **Always one tap from a human.** WhatsApp + call persistent.

---

## 2. Homepage wireframe (desktop-first)

```
┌──────────────────────────────────────────────────────────────┐
│  ◐ SHAM        Journey  Services  Results …    [AR] [ Book ]   │  Fixed nav (transparent → solid on scroll)
├──────────────────────────────────────────────────────────────┤
│                                                                │
│   • Rated #1 luxury dental care                                │
│                                                  ┌───────────┐ │
│   Where                                          │ 100,000+  │ │  HERO  (100vh)
│   *Confidence*                                   │ Smiles    │ │  cinematic bg + vignette
│   Begins.                                        └───────────┘ │  floating glass stat cards
│                                                  ┌───────────┐ │
│   Every smile has a story…                       │ ★ 4.9     │ │
│                                                  └───────────┘ │
│   [ Book Appointment → ]  [ WhatsApp ]                         │
│                         ( ↓ scroll )                           │
├──────────────────────────────────────────────────────────────┤
│   — TRUSTED ACROSS THE REGION —                                │
│   A standard of care that speaks for itself.                   │  TRUST
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                          │  4 animated counters
│   │ 20+  │ │100k+ │ │  48  │ │ 15+  │                          │
│   └──────┘ └──────┘ └──────┘ └──────┘                          │
├──────────────────────────────────────────────────────────────┤
│  (dark)  THE TRANSFORMATION STORY                              │
│   More than treatment. A journey to confidence.               │  STORY
│   ① Consultation ─┐                          ┌──────────────┐ │  interactive timeline
│   ② Diagnosis     │  active step expands      │   visual     │ │  (left steps / right
│   ③ Treatment     │  ───────────────────────▶ │   panel      │ │   cross-fading image)
│   ④ Transformation│                           │  (4:5)       │ │
│   ⑤ Confidence  ──┘                           └──────────────┘ │
├──────────────────────────────────────────────────────────────┤
│   OUR EXPERTISE          Treatments worthy of a launch.        │  SERVICES
│   ┌───────────────────────────┐ ┌────────────┐                │  premium cards, feature
│   │  01  Dental Implants       │ │ 02 Holly…  │                │  card spans 2 cols,
│   │  (large feature card)      │ └────────────┘                │  image zoom + reveal CTA
│   └───────────────────────────┘ ┌────┐┌────┐┌────┐            │
│   ┌────┐ ┌────┐ ┌────┐          │ 03 ││ 04 ││ 05 │            │
│                                                                │
├──────────────────────────────────────────────────────────────┤
│   REAL TRANSFORMATIONS         ┌───────────────────────────┐  │  BEFORE / AFTER
│   See the difference.          │ before  ║  after           │  │  draggable handle,
│   ✓ documented cases           │         ║                  │  │  auto-hint wobble
│   ✓ natural results            │  [◀ ║ ▶]                   │  │
│   [ Start your transformation ]└───────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│   MEET THE EXPERTS    The hands behind your smile.            │  EXPERTS
│   ┌─────────┐ ┌─────────┐ ┌─────────┐                         │  storytelling cards:
│   │ portrait│ │ portrait│ │ portrait│                         │  photo, role badge,
│   │ name    │ │ name    │ │ name    │                         │  philosophy quote,
│   │ "philo" │ │ "philo" │ │ "philo" │                         │  years / cases
│   └─────────┘ └─────────┘ └─────────┘                         │
├──────────────────────────────────────────────────────────────┤
│  (dark, glow)  THE FUTURE OF DENTISTRY                         │  TECHNOLOGY
│   Technology that makes the impossible routine.               │  2×2 glass cards
│   ┌────────────┐ ┌────────────┐                               │  with hover glow
│   │ Digital    │ │ 3D Scan    │                               │
│   ┌────────────┐ ┌────────────┐                               │
│   │ Implant T. │ │ Precision  │                               │
├──────────────────────────────────────────────────────────────┤
│           Smiles that changed everything.                     │  TESTIMONIALS
│   ◀ [video][video][video][video][video] ▶  (auto-marquee)     │  pausable on hover
├──────────────────────────────────────────────────────────────┤
│   FIND US        A clinic near you, always.                   │  LOCATIONS
│   ┌ Dubai  ┐                    ┌──────────────────────────┐  │  branch list ↔ map pin
│   │ Abu Dh.│  (active = filled) │   map  ◉ animated pin     │  │  selecting moves pin +
│   └ Riyadh ┘                    │   [ branch card · Book ]  │  │  updates float card
├──────────────────────────────────────────────────────────────┤
│  (dark, glow)   Your best smile *is waiting.*                 │  FINAL CTA
│        [ Book ]  [ WhatsApp ]  [ Call Now ]                   │
├──────────────────────────────────────────────────────────────┤
│   ◐ SHAM   |  Services | Company | Contact  | socials         │  FOOTER
└──────────────────────────────────────────────────────────────┘
                                                        ( ⊙ WhatsApp FAB )
```

---

## 3. Section-by-section layout & intent

### 3.1 Navigation
- **Behavior:** transparent over hero → frosted glass + shadow on scroll
  (`.nav.scrolled`). Brand text/links invert from white to ink.
- **Contents:** logo · 6 anchor links · language toggle · persistent Book button.
- **Mobile:** burger → full-screen ink overlay menu with display-serif links + CTAs.
- **Goal:** orientation without distraction; Book always visible.

### 3.2 Hero (100svh)
- **Layout:** left-aligned emotional headline, sub-line, dual CTA. Two floating
  glass stat cards (desktop). Scroll cue bottom-center.
- **Headline:** display serif, oversized, italic accent on the emotional word.
- **Background:** cinematic smile imagery at low opacity + animated mesh
  lighting (`heroDrift`) + slow Ken-Burns (`kenburns`) + vignette + grain.
- **Copy direction:** _"Where Confidence Begins."_ / _"Every Smile Has A Story."_
- **Goal:** instant premium verdict + emotional hook within 3 seconds.

### 3.3 Trust / Stats
- **Layout:** eyebrow + title, then 4-up animated counters on light surface.
- **Numbers:** 20+ years · 100,000+ smiles · 48 specialists · 15+ technologies.
- **Motion:** count-up on scroll-in; top gradient bar scales in on hover.
- **Goal:** convert emotion into credibility immediately after the hero.

### 3.4 The Transformation Story (dark)
- **Layout:** two columns — left clickable timeline (5 steps), right
  cross-fading visual panel (4:5) with caption.
- **Behavior:** active step auto-advances every ~4.2s (pauses off-screen);
  clicking a step jumps + restarts. Active step expands its description.
- **Steps:** Consultation → Diagnosis → Treatment → Transformation → Confidence.
- **Goal:** reframe "treatment" as a guided, reassuring personal journey.

### 3.5 Services
- **Layout:** asymmetric grid — one large **feature** card (implants) spanning
  two columns, then five standard cards. Each card = full-bleed luxury photo,
  dark gradient scrim, glass icon, number tag, title, description, hover-reveal
  "Learn More".
- **Motion:** lift + image zoom on hover; CTA slides up on hover.
- **Goal:** make each treatment feel like a product launch, not a price list.

### 3.6 Before / After
- **Layout:** copy + checklist left, draggable comparison slider right (4:3).
- **Behavior:** mouse + touch drag; RTL-aware clip direction; gentle auto
  wobble hint when first revealed.
- **Goal:** undeniable, ethical proof of craftsmanship — the strongest section.

### 3.7 Meet the Experts
- **Layout:** 3 storytelling cards — square portrait with role badge,
  name, specialty, italic **philosophy** quote, years/cases stats.
- **Motion:** card lift + portrait zoom on hover.
- **Goal:** humanize expertise; build personal trust (E-E-A-T).

### 3.8 Technology (dark, glow)
- **Layout:** 2×2 frosted glass cards over radial brand glows.
- **Cards:** Digital Dentistry · 3D Scanning · Implant Technology · Precision.
- **Motion:** hover lift, border ignite, internal glow intensify.
- **Goal:** "future of dentistry" — competence and modernity.

### 3.9 Testimonials
- **Layout:** centered heading + infinite horizontal marquee of video cards
  (poster + play button, 5-star, quote, avatar + name + treatment/city).
- **Behavior:** auto-scroll, pause on hover, direction flips in RTL.
- **Goal:** emotional, life-changing social proof at scale.

### 3.10 Locations
- **Layout:** branch list (left) ↔ stylized map with animated pin (right) +
  floating branch card with Book CTA.
- **Behavior:** selecting a branch animates the pin and updates the card.
- **Goal:** prove reach/convenience; route to the nearest booking.

### 3.11 Final CTA (dark, glow)
- **Layout:** centered oversized statement + triple CTA (Book / WhatsApp / Call).
- **Copy:** _"Your Best Smile Is Waiting."_
- **Goal:** the emotional close — last, strongest push to convert.

### 3.12 Footer + WhatsApp FAB
- 4-column footer (brand/about/social, services, company, contact) + legal bar.
- Persistent pulsing WhatsApp FAB for instant, low-friction contact.

---

## 4. Information scent & flow logic
Emotion (Hero) → Credibility (Trust) → Reassurance (Journey) →
Desire (Services) → Proof (Before/After) → Human trust (Experts) →
Confidence in capability (Technology) → Social proof (Testimonials) →
Convenience (Locations) → Action (Final CTA). Each section answers the
objection raised by the previous one and always leaves a path to Book.
