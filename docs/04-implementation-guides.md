# Sham Dental — Framer & Webflow Implementation Guides

Two paths to ship the same design. **Framer** = fastest path to cinematic
motion. **Webflow** = maximum control over CMS, SEO and bilingual structure.

---

## Shared design tokens (set up first in either tool)

**Colors**
| Name | Hex |
|------|-----|
| Sham Blue | `#317EBB` |
| Sham Blue Light | `#5FA4DA` |
| Sham Blue Dark | `#245E8B` |
| Sham Teal | `#1D938D` |
| Sham Teal Light | `#38B7AF` |
| Sham Teal Dark | `#136E69` |
| Ink | `#0C1418` |
| Ink 2 | `#122029` |
| Background | `#F8FAFB` |
| Surface | `#FFFFFF` |
| Surface Secondary | `#F1F5F7` |
| Text Primary | `#1B1F23` |
| Text Secondary | `#5E6B75` |
| Border | `#DDE5EA` |
| Brand Gradient | `135°, #317EBB → #1D938D` |

**Type**
- Display: **Cormorant Garamond** (500 / italic) — headlines.
- Body/UI: **Manrope** (300–700).
- Arabic: **Tajawal** (300–800).

**Radii:** 10 / 18 / 28 / 40 px.  **Container:** 1320px, gutter `clamp(20px,5vw,80px)`.
**Signature easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## A. Framer implementation guide

### 1. Project setup
1. New Framer project → **desktop-first** breakpoints: Desktop 1440, Tablet 810,
   Phone 390 (add an Ultra-wide 1920 variant for the hero).
2. Add fonts (Cormorant Garamond, Manrope, Tajawal) via Framer's Google Fonts.
3. Create **Color Styles** and **Text Styles** from the tokens above.

### 2. Section-by-section
| Section | Framer technique |
|---------|------------------|
| **Nav** | Sticky frame, top. Use a **Scroll Transform** / variant: at scroll>40 switch to a "solid" variant (blur background, dark text). Component variants for default/solid. |
| **Hero** | Full-bleed stack. Background = video fill (cinematic smile clip) at low opacity over an ink frame + gradient overlay. Headline uses **Appear** animation (fade + 40px up), staggered via per-layer delays. Floating stat cards = absolute frames with **Appear** + subtle **breathing** loop. |
| **Trust counters** | Use the **Number / Ticker** override or a code override `useAnimationFrame` to count up `onAppear`. |
| **Story timeline** | Build as a **Component with variants** (one per step). Drive with a "Cycle" interaction (auto-advance) + click to set variant. Right panel = image with **cross-fade** between variants. |
| **Services** | Grid of card components. Hover variant: scale image 1.1, lift card, reveal CTA. Make the first card a wide variant (2-col span). |
| **Before/After** | Use a community **Before/After slider** component, or a code override with a draggable handle controlling `clipPath`. |
| **Experts / Tech / Testimonials** | Card components with hover variants. Testimonials = **Marquee** component (built-in), pause on hover. |
| **Locations** | Component with branch variants; clicking a list item sets the active variant and animates the pin position. |
| **Final CTA / Footer** | Standard stacks; CTA buttons share a Button component with sheen hover. |

### 3. Motion in Framer
- Prefer **Appear** (scroll-in) + **Variants** (hover/active) + **Effects**
  (Parallax, Magnetic) over custom code where possible.
- Use the **Scroll** section animation for parallax on the hero background.
- Global transition: Spring or custom bezier `0.16,1,0.3,1`, ~0.9s.

### 4. Code override starter (counter)
```tsx
import { useAnimationFrame } from "framer-motion"
import { useState } from "react"

export function Counter(Component): ComponentType {
    return (props) => {
        const [n, setN] = useState(0)
        const target = 100000, dur = 2000
        const start = performance.now()
        useAnimationFrame((t) => {
            const p = Math.min((t - start) / dur, 1)
            setN(Math.floor(target * (1 - Math.pow(1 - p, 3))))
        })
        return <Component {...props} text={n.toLocaleString() + "+"} />
    }
}
```

### 5. Localization (Framer)
- Use Framer's built-in **Localization** for EN/AR; enable **RTL** on the Arabic
  locale. Mirror layouts and flip the before/after clip direction per locale.

### 6. Launch checklist
SEO fields per page · OG image · alt text · `prefers-reduced-motion` (Framer
respects it) · Lighthouse pass · custom domain + redirects.

---

## B. Webflow implementation guide

### 1. Project & style system
1. New Webflow site. In **Site Settings → Fonts**, add Cormorant Garamond,
   Manrope, Tajawal.
2. Define global classes / variables: create CSS variables in an embed on the
   `<body>` (paste the `:root` from `assets/css/styles.css`) so classes can use
   `var(--sham-blue)` etc., or recreate as Webflow **Variables** (Colors, sizes).
3. Build a base **Container** class (max 1320, responsive padding) and reusable
   **Button** combo classes (`btn`, `btn-primary`, `btn-ghost`, `btn-whatsapp`).

### 2. Structure with native Webflow
| Section | Webflow approach |
|---------|------------------|
| **Nav** | Navbar component. Add Interaction: "While page is scrolling" / scroll-into-view to toggle a `scrolled` combo class (background, color). |
| **Hero** | Section with background video (Webflow Background Video) + overlay divs. Use **Page Load** IX2 to stagger headline/sub/CTA (move + fade). |
| **Trust** | Grid (4 col → 2 → 2). Counter via custom code (see below) triggered on scroll. |
| **Story** | Tabs component for the 5 steps (tab links = timeline, tab panes = visuals) + a small script to auto-advance tabs. |
| **Services** | Grid; first card wider via grid span. Hover interactions: image scale, card lift, CTA reveal. |
| **Before/After** | Custom embed (script below) or a Finsweet/3rd-party slider. |
| **Experts/Tech** | Grid of cards; hover IX2 (lift + image scale). Make these a **CMS Collection** (Doctors, Technologies) for scalability. |
| **Testimonials** | CMS Collection list + Marquee (CSS animation embed) or a slider; pause on hover. |
| **Locations** | CMS Collection (Branches) + tabs/links controlling a map image and pin position. |

### 3. Recommended CMS collections
- **Services** (name, slug, excerpt, body, hero image, gallery)
- **Doctors** (name, role, specialty, philosophy, photo, years, cases)
- **Case Studies** (before img, after img, treatment, location)
- **Testimonials** (quote, name, treatment, city, video URL, avatar)
- **Branches** (name, address, hours, map coords, embed URL)

### 4. Counter (custom code embed)
```html
<script>
document.querySelectorAll('[data-count]').forEach(el=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return; io.unobserve(el);
    const t=+el.dataset.count,s=el.dataset.suffix||'',d=2000,st=performance.now();
    (function tick(n){const p=Math.min((n-st)/d,1),v=Math.floor(t*(1-Math.pow(1-p,3)));
      el.textContent=v.toLocaleString()+(p===1?s:''); if(p<1)requestAnimationFrame(tick);})(st);
  }),{threshold:.6}); io.observe(el);
});
</script>
```

### 5. Before/After slider (custom embed)
Reuse the logic from `assets/js/main.js` (`#baSlider` block) — paste into a
Webflow **Embed** inside the section; it manipulates `clip-path` + handle
position and is RTL-aware.

### 6. Bilingual EN / AR
- Use **Webflow Localization** (or a parallel `/ar` folder). Set `dir="rtl"` on
  the Arabic locale `<html>` via locale settings / embed. Verify the
  before/after clip and underline directions mirror correctly.

### 7. SEO & performance
- Per-page Title/Meta/OG, `hreflang` for en/ar/x-default, descriptive alt text.
- Add `Dentist` / `LocalBusiness` JSON-LD per location (Settings → Custom Code).
- Compress images to WebP/AVIF, lazy-load below the fold, host hero video
  externally (Mux/Cloudflare) and poster-fallback.
- Enable Webflow's minify CSS/JS; audit with Lighthouse.

---

## C. Reusing this repo's code in either tool
The hand-built homepage (`index.html` + `assets/`) is framework-free, so any
section's markup/CSS/JS can be lifted directly into a Framer **Embed** or
Webflow **Embed/Custom Code** block when a native equivalent is harder to
achieve (notably the before/after slider, counters, and the journey timeline).
