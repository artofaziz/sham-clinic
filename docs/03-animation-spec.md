# Sham Dental — Animation Specifications

> **Quality bar:** Apple product-launch. Elegant, weighted, intentional —
> **never distracting.** If an animation calls attention to itself rather than
> the content, it's wrong.

## 1. Motion principles
1. **Slow & weighted.** Hero/section transitions 0.8–1.2s. Micro-interactions
   0.3–0.5s. Nothing snaps.
2. **One signature easing.** `cubic-bezier(0.16, 1, 0.3, 1)` ("ease-lux") for
   almost everything — a confident decelerate.
3. **Enter once.** Scroll reveals fire a single time (no replay jitter).
4. **Stagger, don't dump.** Sibling elements offset by 60–120ms.
5. **GPU-only properties.** Animate `transform` & `opacity`; avoid layout
   thrash. Use `will-change` sparingly on animated elements.
6. **Respect users.** `prefers-reduced-motion` disables all non-essential
   motion and shows final states instantly.

## 2. Global tokens (`:root`)
```css
--ease-lux: cubic-bezier(0.16, 1, 0.3, 1);  /* signature */
--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
--dur: 0.9s;
```

## 3. Per-effect specification

| # | Effect | Where | Trigger | Properties | Duration / easing |
|---|--------|-------|---------|------------|-------------------|
| 1 | **Scroll reveal** | All `[data-reveal]` | IntersectionObserver (12%, −8% margin) | `opacity 0→1`, `translateY 40→0` (or X / scale variants) | 1s · ease-lux, per-element `--delay` stagger |
| 2 | **Animated counters** | Trust stats, hero card | IO at 60% | integer count-up, cubic ease-out | 2000ms |
| 3 | **Nav state morph** | `#nav` | scrollY > 40 | padding, background blur, color invert, shadow | 0.5s · ease-lux |
| 4 | **Scroll progress bar** | top of viewport | scroll | width 0→100% | linear (0.1s) |
| 5 | **Hero mesh drift** | `.hero-bg::before` | autoplay loop | translate + scale of radial gradients | 22s alternate |
| 6 | **Hero Ken-Burns** | `.hero-bg img` | autoplay loop | scale 1.12→1.25 + translate | 24s alternate |
| 7 | **Scroll cue wheel** | `.hero-scroll .mouse` | autoplay loop | dot translateY + fade | 1.8s loop |
| 8 | **Parallax** | `[data-parallax]` | scroll | `translate3d(0, y*factor, 0)` | rAF-throttled |
| 9 | **Journey auto-advance** | `.jstep` / panels | interval (in-view) | opacity/scale cross-fade of panel, step expand | 4.2s cycle · 0.9–1.2s transition |
| 10 | **Service card hover** | `.service-card` | hover | lift `translateY(-10px)`, image `scale(1.1)`, CTA rise+fade | 0.7s · ease-lux |
| 11 | **Stat hover bar** | `.stat::before` | hover | `scaleX 0→1` (origin start, RTL-aware) | 0.7s · ease-lux |
| 12 | **Before/After drag** | `.ba-slider` | pointer/touch | `clip-path inset` + handle position | realtime |
| 13 | **Before/After hint** | `.ba-slider` | IO at 40% | scripted sine wobble (~22 frames) | one-shot |
| 14 | **Expert card hover** | `.expert-card` | hover | lift + portrait `scale(1.08)` | 0.6s · ease-lux |
| 15 | **Tech card hover** | `.tech-card` | hover | lift, border ignite, glow opacity↑ | 0.6s |
| 16 | **Testimonial marquee** | `.testi-track` | autoplay | `translateX 0→−50%` (seamless dup) | 46s linear, pause on hover, reverse in RTL |
| 17 | **Location pin** | `.loc-pin` | branch select | left/top reposition + radar `ping` | 0.7s move · 1.8s ping loop |
| 18 | **Button sheen** | `.btn-primary::after` | hover | sheen sweep `translateX(-120%→120%)` + lift | 0.9s · ease-lux |
| 19 | **WhatsApp FAB pulse** | `.fab` | autoplay | expanding ring shadow + hover scale | 2.6s loop |
| 20 | **Mobile menu** | `.mobile-menu` | burger | slide `translateX(100%→0)` | 0.6s · ease-lux |
| 21 | **Smooth anchor scroll** | in-page links | click | `scrollTo` smooth, −70px offset | native smooth |

## 4. Section choreography (scroll storytelling)

```
HERO        badge → headline → sub → CTAs → floating cards   (staggered .08s steps)
TRUST       title reveal, then 4 counters count up in sequence
STORY       heading reveals; timeline auto-plays once in view; visual cross-fades
SERVICES    header reveals; cards rise in a diagonal stagger (.08 / .16 / .24)
RESULTS     copy slides from left, slider scales/right + auto-hint wobble
EXPERTS     three cards rise with 0 / .1 / .2 stagger
TECH        heading reveal; 2×2 cards rise alternating; glows breathe
TESTIMONIAL heading reveal; marquee begins its endless drift
LOCATIONS   list slides left, map slides right; pin radar pulses
FINAL CTA   statement rises, sub, then CTA row — the emotional crescendo
```

## 5. Premium micro-interactions checklist
- Buttons: lift + sheen sweep + shadow bloom on hover.
- Links: animated underline grows from the inline-start edge (RTL-aware).
- Cards: never just scale — combine lift + media zoom + content reveal.
- Cursor-follow / magnetic buttons and a custom cursor are optional upgrades
  for Framer/Webflow (see implementation guide §"Enhancements").

## 6. Performance & accessibility guardrails
- Only `transform`/`opacity` in transitions; no animating `width/height/top`
  except controlled cases (clip-path, progress bar).
- `IntersectionObserver` over scroll math wherever possible; scroll handlers are
  passive and rAF-batched.
- All loops pause when off-screen or on hover where relevant.
- `@media (prefers-reduced-motion: reduce)` zeroes durations, freezes marquee,
  and forces reveal end-states — content is fully usable without motion.
