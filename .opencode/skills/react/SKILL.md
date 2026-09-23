---
name: React & Next.js
description: React, Next.js, Hooks, Server Components, SSR, caching, and testing conventions.
---

## Workflow

When working on this React/Next.js project, adhere to the following workflow and conventions:

1. **Architecture & Routing**
   - For Next.js App Router: understand `app/` conventions (`page.tsx`, `layout.tsx`, `route.ts`, `template.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`).
   - Server Components are the default. Only add `"use client"` when the component needs interactivity, browser APIs, hooks like `useState`/`useEffect`, or a third-party lib that requires the client.
   - Push `"use client"` as far down the tree as possible — wrap only the interactive leaf, not the whole page, to keep bundle size small.
   - Co-locate route-specific components inside their route segment; keep only truly shared components in `components/`.
   - Use route groups `(group)` and parallel/intercepting routes (`@slot`, `(.)folder`) only when the routing need is real, not preemptively.

2. **TypeScript & Type Safety**
   - No `any`. Prefer `unknown` + narrowing, or proper generics.
   - Type component props explicitly with `interface`/`type`; avoid `React.FC` (it adds implicit `children` and complicates generics).
   - Derive types from schemas (e.g. Zod) rather than duplicating shape definitions by hand — `z.infer<typeof schema>`.
   - Type Server Action inputs/outputs explicitly, including error shapes (`{ error: string } | { data: T }`), so callers must handle both branches.

3. **State & Hooks**
   - Don't sync props into state with `useEffect` — compute derived values during render, or use `useMemo` only when the computation is actually expensive.
   - Default to no memoization; add `useMemo`/`useCallback` only after profiling shows a real re-render cost, or when passing stable references to a memoized child / dependency array.
   - Lift state only as high as the nearest common consumer — avoid dumping everything into global context.
   - Every `useEffect` needs a real reason (subscriptions, DOM measurement, external sync) and a cleanup function when it sets up anything (listeners, intervals, subscriptions).
   - For cross-component state, prefer URL state (`useSearchParams`) or server state over client state when the data isn't purely ephemeral UI state.
   - Reach for a state manager (Zustand, Jotai) only once prop drilling or Context re-render cost becomes a measured problem — don't default to Redux.

4. **Data Fetching & Caching**
   - Fetch in Server Components by default; use `fetch()` with explicit caching intent — `{ cache: 'force-cache' }`, `{ next: { revalidate: N } }`, or `{ cache: 'no-store' }` — never leave it implicit when correctness matters.
   - Parallelize independent fetches (`Promise.all`, or multiple sibling Server Components) instead of awaiting sequentially and creating request waterfalls.
   - Use `React.cache()` / `server-only` data-access functions to dedupe fetches across a render tree.
   - Tag cached data with `next: { tags: [...] }` and invalidate precisely with `revalidateTag`/`revalidatePath` after mutations rather than blanket revalidating.
   - Use `<Suspense>` boundaries around slow data to stream the rest of the page instead of blocking the whole route.

5. **Server Actions & Mutations**
   - Validate all inputs server-side with a schema (Zod) even though the client also validates — never trust client input.
   - Re-check auth/authorization inside every Server Action; don't assume UI-level gating is sufficient.
   - Return typed result objects instead of throwing for expected failure cases (validation errors, business rule failures); reserve thrown errors for truly exceptional cases caught by `error.tsx`.
   - Call `revalidatePath`/`revalidateTag` after a successful mutation so the UI reflects new state without a full reload.
   - Pair with `useActionState`/`useFormStatus` for pending/error UI instead of hand-rolled loading flags where possible.

6. **Components & Composition**
   - Small, single-responsibility functional components; extract when a component mixes more than one concern (data shaping + layout + interaction).
   - Prefer composition (children/slots) over prop explosion or boolean-flag-driven branching inside one component.
   - Always provide a stable, unique `key` for list items — never array index if the list can reorder, filter, or be mutated.
   - Colocate a component's types, tests, and styles next to it.

7. **Styling**
   - Use the project's existing solution consistently (Tailwind CSS, CSS Modules, styled-components) — don't mix approaches within the same feature.
   - Keep design tokens (spacing, color, radius) centralized; avoid magic values scattered in components.
   - Ensure responsive and dark-mode variants are handled through the existing system, not one-off overrides.

8. **Performance**
   - Use `next/image` for all images (proper `sizes`, `priority` only on above-the-fold LCP images).
   - Use `next/link` for internal navigation so prefetching works; avoid raw `<a>` for in-app routes.
   - Code-split heavy, non-critical client components with `next/dynamic` (`{ ssr: false }` only when the component genuinely can't render server-side).
   - Avoid importing entire libraries for one function — use targeted imports to keep client bundles lean.
   - Watch for accidental client-component boundary creep pulling large server-only dependencies into the client bundle.

9. **Error & Loading States**
   - Provide `loading.tsx` for route segments with async data, and granular `<Suspense fallback>` for slower sub-sections.
   - Provide `error.tsx` (and `global-error.tsx` at the root) with a reset action; don't let errors silently blank the page.
   - Handle empty states explicitly (no data ≠ error ≠ loading — three distinct UI states).

10. **SEO & Metadata**
    - Use the Metadata API (`generateMetadata`, static `metadata` export) rather than manual `<head>` tags.
    - Provide `alt` text, canonical URLs, and Open Graph data for public-facing pages.
    - Use `generateStaticParams` for known dynamic routes to enable static generation where content isn't user-specific.

11. **Accessibility**
    - Semantic HTML first (`button`, `nav`, `label`) before reaching for ARIA.
    - Every interactive element is keyboard-operable and has a visible focus state.
    - Form inputs have associated labels; icon-only buttons have `aria-label`.

12. **Testing**
    - Unit/component tests with React Testing Library — test behavior and accessible output, not implementation details.
    - Server Actions and data-access functions get isolated unit tests with mocked I/O.
    - Critical user flows get E2E coverage (Playwright) rather than trying to cover everything at the unit level.

13. **Security**
    - Never expose secrets to the client — only `NEXT_PUBLIC_*` env vars reach the browser; verify before adding one.
    - Sanitize any user-generated content rendered as HTML (avoid raw `dangerouslySetInnerHTML` without sanitization).
    - Treat all Server Action and Route Handler input as untrusted, regardless of where the request originated.