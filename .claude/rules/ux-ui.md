---
paths:
  - "**/*.tsx"
---

# UX & UI Components

## Project UI System

- **Text** — **ALL** user-facing text via `~/components/ui/text` (H1-H4, Text, Muted, P, Small) — NEVER raw RN `Text`
- **Icons** — `~/components/ui/icon` with `as` prop for Lucide icons
- **Uniwind** (NOT NativeWind) for universal Tailwind CSS v4
- **`cn()`** from `~/lib/utils/cn` for class merging
- **`cva()`** from `class-variance-authority` for component variants with `defaultVariants`
- `Platform.select()` within `cn()`/`cva()` for web-only/native-only classes
- **TextClassContext** pattern: parent injects text styling into children via context

## Component Placement

- **`src/components/ui/`** — React Native Reusables primitives (CLI-added, linter excluded)
- **`src/components/custom/`** — cross-feature custom components
- **`src/features/<name>/`** — domain-scoped UI + logic
- Add primitives: `bun x --bun @react-native-reusables/cli@latest add <component>`

## Accessibility (WCAG 2.1 AA)

- Touch targets **min 44x44px**, text contrast **4.5:1**, large text/UI **3:1**
- **Semantic structure first**, ARIA only when HTML insufficient
- `accessibilityRole`/`accessibilityState` on RN, `aria-expanded`/`aria-controls` on web
- **`focus-visible`** indicators, keyboard event handlers alongside mouse
- Focus trapping for modals, restore on close
- Respect **`prefers-reduced-motion`**, never flash > 3x/sec
- **Alt text** for informative images, `alt=""`/`accessible={false}` for decorative

## UX Principles

- **Consistency** (same component = same function), follow established patterns
- **Immediate feedback** on actions, purposeful micro-interactions (100-500ms)

## Component Selection

- 1 option → **Button/Switch**
- 2-5 → **Radio Group**
- 5-15 → **Select**
- 15+ → **Combobox**
- Critical info → **Alert Dialog**
- Important → Badge/Alert
- Informative → Toast/Tooltip
- Destructive → **Alert Dialog with confirmation**

## Buttons & Controls

- Variants: **`default`** (primary), **`outline`** (secondary), **`destructive`** (danger), **`ghost`** (tertiary)
- Max 3 buttons side by side, **clear action text** ("Save" not "OK")
- Toggle/Switch for immediate binary states

## Navigation

- Nav **max 7+-2 items**, highlight active, hamburger on mobile
- Tabs 2-7 sections, Breadcrumb for > 3 levels, Pagination with item counts

## Feedback

- **Toast**: 3-5s, bottom-right, max 3 simultaneous, optional undo action
- **Alert Dialog**: always Cancel, focus safe action, for destructive confirmations
- **Dialog**: close on Escape + outside click, keep minimal
- **Tooltip**: < 10 words, 500ms delay, no critical info
- **Sheet**: slides from bottom (mobile) / side (desktop)

## Presentation

- **Card**: clear hierarchy (header/body/footer), hover if clickable
- **Table**: sticky headers, paginate > 20 rows, card list on mobile
- **Skeleton**: mimics structure, avoids layout shift
- Spinner < 2s, Progress Bar > 2s with percentage
- **Empty state**: explain why + offer action
