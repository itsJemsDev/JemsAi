---
name: ui-ux-frontend-design
description: Senior-level UI/UX and frontend design conventions covering responsive layout, spacing and type systems, accessibility (WCAG 2.1 AA), interaction states, motion, and Tailwind usage. Use this whenever building or editing any frontend interface, component, page, or screen — including when the user asks for a "form", "dashboard", "landing page", "modal", "card", or similar UI element, even if they don't explicitly say "design" or "UX".
---

## Why this exists

Code that "works" and an interface that feels considered are different bars. Most UI bugs a user actually notices aren't logic bugs — they're missing states, inconsistent spacing, or accessibility gaps. This skill exists to catch those before they ship, not just to enforce style.

## 1. Design Foundations: Spacing & Type

Arbitrary pixel values (`margin: 13px`, `padding: 22px`) are the single biggest tell of an unpolished UI, because nothing lines up with anything else. Use a base-unit scale instead:

- **Spacing**: multiples of 4 (4, 8, 12, 16, 24, 32, 48, 64). Pick from this scale for margin, padding, and gap — don't invent one-off values.
- **Typography**: a small modular scale (e.g. 12 / 14 / 16 / 18 / 24 / 32 / 48px) rather than ad hoc font sizes. Body text line-height ~1.5; headings tighter (~1.1–1.3). Keep line length to roughly 60–75 characters for readability.
- **Radius & elevation**: define 2–3 border-radius steps and shadow steps and reuse them — don't mix `rounded-sm` and `rounded-2xl` in the same component family without reason.

If the project already has a theme config (Tailwind config, CSS variables, a design-tokens file), those values are the source of truth — check for one before inventing your own scale.

## 2. Responsive & Mobile-First

Design for the smallest viewport first, then progressively enhance with `min-width` media queries for tablet and desktop. Mobile-first forces you to prioritize content, which usually produces a cleaner desktop layout too — the reverse (deleting things to fit mobile) rarely does.

- Common breakpoints: `640px` (sm), `768px` (md), `1024px` (lg), `1280px` (xl) — adjust to match the project's existing breakpoints if set.
- Touch targets: minimum 44×44px (iOS HIG) / 48×48px (Material) with adequate spacing between adjacent tappable elements, so mis-taps don't happen on real thumbs.
- Prefer fluid values (`clamp()`, relative units) over a wall of breakpoint overrides when a value just needs to scale smoothly.

## 3. Component States & Interaction

Every interactive element has more than one state, and skipping them is what makes an interface feel unfinished or broken:

- **Hover, focus, active, disabled** — each needs a visually distinct treatment. Focus states must remain visible for keyboard users (never `outline: none` without a replacement).
- **Loading** — show a skeleton or spinner for anything that takes >~300ms; don't let the UI sit static while something happens invisibly.
- **Empty** — design the zero-data case on purpose (helpful copy + a clear next action), not as a blank page that looks broken.
- **Error** — messages should say what went wrong and what to do next, not just "An error occurred." Place the message near the thing it relates to.

**Motion**: use short durations (~150–300ms), ease-out for things entering/appearing and ease-in for things leaving, and keep motion purposeful (indicating state change or spatial relationship) rather than decorative. Always respect `prefers-reduced-motion` — wrap non-essential animation in that media query rather than assuming everyone wants it.

## 4. Accessibility (WCAG 2.1 AA)

Accessibility isn't a separate pass — it's cheaper and more reliable to build in from the start:

- Use semantic HTML (`<nav>`, `<main>`, `<button>`, `<label>`) before reaching for ARIA. ARIA is a patch for when semantic HTML can't express something, not a default.
- Images need descriptive `alt` text, or `alt=""` if purely decorative.
- Every form input needs an associated `<label>` (or `aria-label` if a visible label truly isn't feasible) — placeholder text is not a label.
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text (≥24px or ≥18.5px bold) and for meaningful UI components/icons.
- Full keyboard operability: everything reachable and operable via Tab/Enter/Space/Escape, with a visible focus indicator at every step. If you can't complete the flow with a mouse unplugged, it fails.
- Announce dynamic changes (form errors, toasts) to assistive tech via `aria-live` or `aria-describedby` rather than relying on visual placement alone.

## 5. Tailwind CSS (if the project uses it)

- Detect and reuse the project's `tailwind.config` theme (colors, spacing, fonts) instead of arbitrary values (`w-[437px]`) — arbitrary values are a sign the design system doesn't cover a case, which is worth noticing rather than routing around.
- Prefer utility classes over custom stylesheets; only drop into custom CSS for things Tailwind genuinely can't express (complex animations, certain pseudo-elements).
- When the same utility cluster repeats across several components, that's a signal to extract a component or a `@apply`-based class, not to keep copy-pasting the cluster.

## 6. Consistency

- Before building a new component, check whether one already exists (buttons, inputs, cards, modals) and extend it rather than creating a near-duplicate with slightly different spacing or radius.
- Keep icon sizing, button heights, and input heights consistent within a given context — small unintentional size differences read as sloppiness even when nothing is "wrong."

## Pre-ship checklist

Before considering a UI piece done, check it against this list:

- [ ] Renders correctly at mobile, tablet, and desktop widths
- [ ] Touch targets ≥44px with adequate spacing
- [ ] Hover / focus / active / disabled / loading / empty / error states all designed, not just the happy path
- [ ] Keyboard-only navigation works, with visible focus at every stop
- [ ] Color contrast checked for text and meaningful UI elements
- [ ] Spacing and type pulled from the scale/tokens, not arbitrary values
- [ ] Motion respects `prefers-reduced-motion`
- [ ] No orphaned one-off components duplicating something that already exists