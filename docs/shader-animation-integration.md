# ShaderAnimation — Integration Guide

A full-screen WebGL shader background (Three.js) packaged as a shadcn-style UI
component.

---

## ⚠️ Important: current project state

This repository is currently a **static HTML/CSS/JS site** (vanilla). It does
**not** yet have the stack this `.tsx` component requires:

| Requirement | Present? |
|-------------|----------|
| React | ❌ |
| TypeScript | ❌ |
| Tailwind CSS | ❌ |
| shadcn (`components.json`) | ❌ |
| `package.json` | ❌ |

The component files have been placed at the correct path
(`components/ui/shader-animation.tsx` + `components/ui/demo.tsx`), but to
**run** them you must first turn this into a React + TypeScript + Tailwind
project. Follow Section 2.

---

## 1. Default paths for components & styles (and why `components/ui` matters)

Because there is no `components.json` yet, these are the shadcn **defaults** the
CLI will create:

| Alias | Default location |
|-------|------------------|
| `@/components` | `components/` (or `src/components/` if you use `src`) |
| `@/components/ui` | `components/ui/` ← **where primitives live** |
| `@/lib` / utils | `lib/utils.ts` |
| styles (global CSS) | `app/globals.css` (Next.js) or `src/index.css` (Vite) |

**Why the `/components/ui` folder is important**

- **shadcn convention:** the shadcn CLI installs every primitive into
  `components/ui` and resolves the `@/components/ui/*` import alias to it. The
  demo here literally imports `@/components/ui/shader-animation` — that path
  must exist or the import breaks.
- **Separation of concerns:** `ui/` holds reusable, presentational primitives
  (buttons, dialogs, this shader). Your feature/page components live one level
  up in `components/`. Keeping them apart keeps the design system clean and
  upgrade-safe.
- **Tooling expectations:** `npx shadcn@latest add <component>` will drop new
  files into `components/ui`. If the folder/alias don't match, the CLI and
  every copy-pasted registry component will fail to resolve.

✅ This is why the component was placed in **`components/ui/`** rather than
anywhere else.

---

## 2. Make the project shadcn / Tailwind / TypeScript ready

Pick the framework you want. The component uses `"use client"`, so it works in
both, but is most at home in **Next.js (App Router)**.

### Option A — Next.js + TypeScript + Tailwind (recommended)

```bash
# 1) Scaffold a TypeScript + Tailwind app
npx create-next-app@latest sham-app --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*"
cd sham-app

# 2) Initialise shadcn (creates components.json + components/ui + lib/utils)
npx shadcn@latest init

# 3) Install this component's runtime dependency
npm install three
npm install -D @types/three
```

### Option B — Vite + React + TypeScript + Tailwind

```bash
# 1) Scaffold
npm create vite@latest sham-app -- --template react-ts
cd sham-app && npm install

# 2) Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
#   → set content: ["./index.html","./src/**/*.{ts,tsx}"]
#   → add @tailwind base/components/utilities to src/index.css

# 3) Add the "@/*" alias in tsconfig.json + vite.config.ts (see Section 4)

# 4) shadcn + dependency
npx shadcn@latest init
npm install three
npm install -D @types/three
```

> If you instead want to add this stack **into this existing repo** (so the
> static marketing site and the React app coexist), scaffold in a subfolder
> (e.g. `/app`) to avoid clobbering `index.html`, or migrate the static site
> into the new React app's `public/` + components.

---

## 3. Install dependencies (external)

```bash
npm install three          # WebGL engine used by the shader
npm install -D @types/three  # TypeScript types (TS projects)
```

There are **no other runtime deps** — no context providers, no state libraries,
no icon set required for this component. (`lucide-react` is only needed if you
add icons elsewhere.)

---

## 4. Path alias (`@/…`) — required for the demo import

`demo.tsx` imports `@/components/ui/shader-animation`. Ensure the alias resolves.

**tsconfig.json**
```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }   // Next.js default. For src-dir use ["./src/*"]
  }
}
```

**Vite also needs** (`vite.config.ts`):
```ts
import path from "path"
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "./") } },
})
```

---

## 5. Use it

```tsx
// app/page.tsx (Next.js)  — or any route/component
import DemoOne from "@/components/ui/demo"

export default function Page() {
  return <DemoOne />
}
```

Or drop the raw component anywhere as a full-screen background:

```tsx
import { ShaderAnimation } from "@/components/ui/shader-animation"

export default function Hero() {
  return (
    <section className="relative">
      <ShaderAnimation />
      <h1 className="absolute inset-0 grid place-items-center text-white text-7xl font-semibold tracking-tighter">
        Where Confidence Begins.
      </h1>
    </section>
  )
}
```

---

## 6. Answers to the integration questions

- **Props/data passed in:** None. `ShaderAnimation` takes **no props** — it's a
  self-contained canvas. (Easy extension: expose `className`, `speed`, or a
  color uniform as props.)
- **State management:** None external. It keeps Three.js objects in a `useRef`
  and runs its own `requestAnimationFrame` loop; cleanup disposes the renderer,
  geometry and material on unmount. No Redux/Zustand/Context needed.
- **Required assets:** None — the visual is generated procedurally in the
  fragment shader. No images/icons required (so no Unsplash assets needed for
  this one; `lucide-react` not required).
- **Responsive behavior:** Fills its container — the root div is `w-full
  h-screen` and a `resize` listener keeps the renderer/uniform resolution in
  sync. In the demo it's constrained to `h-[650px]`. ⚠️ Note: the inner
  component is `h-screen`; when nesting inside a fixed-height parent (like the
  demo's `h-[650px]`), change `h-screen` → `h-full` so it fits the parent.
- **Best place to use it:** As a **hero / section background** behind large
  headline text (exactly the demo pattern). It's GPU-intensive and full-bleed,
  so use it once, above the fold — not repeated across the page.

---

## 7. Gotchas & performance notes

- **`"use client"`** is required (the component touches `window`/WebGL). In
  Next.js App Router keep it a client component; never render it during SSR.
- **One instance:** running multiple WebGL contexts is expensive. Prefer a
  single shader background per view.
- **Respect motion preferences:** consider gating the animation behind
  `prefers-reduced-motion` for accessibility.
- **`h-screen` vs `h-full`:** see the responsive note above when embedding in a
  fixed-height container.
- **Cleanup is handled** on unmount, but avoid mounting/unmounting it rapidly.

---

## 8. Relating this to the existing Sham Dental site

The current site already ships a CSS-based animated hero. If you migrate to the
React stack, this shader makes an excellent **cinematic hero background** —
pair it with the existing brand gradient (`#317EBB → #1D938D`) by tinting the
shader's output color, and overlay the headline _"Where Confidence Begins."_
for an Apple-launch feel.
