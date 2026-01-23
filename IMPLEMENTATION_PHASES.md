# Implementation Phases: Benny's Portfolio Redesign

**Project Type**: Personal Portfolio Website
**Stack**: Vanilla HTML + CSS (Modern Variables/Grid) + Vanilla ES6+ JavaScript
**Style**: Neon Aurora (Dark Mode, Glassmorphism, Vibrant Gradients)
**Goal**: Remove Bootstrap/jQuery dependency and implement a premium, "wow" factor design.

---

## Phase 1: Infrastructure & Design System
**Type**: Infrastructure / UI
**Estimated**: 2 hours
**Files**: `css/style.css`, `css/variables.css`, `index.html`

**Tasks**:
- [ ] Create `css/variables.css` for Design Tokens (Colors, Typography, Spacing).
- [ ] Reset `css/style.css` with a modern CSS reset (e.g., Andy Bell's or Josh Comeau's).
- [ ] Clean `index.html`: Remove Bootstrap/jQuery CDN links.
- [ ] Implement global typography (Inter/Google Fonts) and base body styles.
- [ ] Verify: Page loads without errors (console is clean), although styles will be broken initially.

**Verification Criteria**:
- [ ] No 404s for removed CDNs.
- [ ] CSS Variables are accessible in DevTools.
- [ ] Dark background is visible.

**Exit Criteria**: A Clean HTML structure linked to the new CSS system.

---

## Phase 2: Core UI Components
**Type**: UI
**Estimated**: 3 hours
**Files**: `css/components.css`, `index.html`

**Tasks**:
- [ ] Create `css/components.css`.
- [ ] Build `.btn` components (Primary Glow, Outline).
- [ ] Build `.glass-card` component (Background blur, border, shadow).
- [ ] Build `.nav` (Floating specific navigation).
- [ ] Build `.section` layout utilities.

**Verification Criteria**:
- [ ] Buttons have hover states/animations.
- [ ] Glass cards show blur effect over the dark background.
- [ ] Navbar floats and is responsive.

**Exit Criteria**: Key reusable elements look "premium" and match the new aesthetic.

---

## Phase 3: Sections Implementation
**Type**: UI
**Estimated**: 4 hours
**Files**: `index.html`, `css/sections.css`, `js/script.js`

**Tasks**:
- [ ] **Hero Section**: Rebuild with CSS Grid, implement gradient text and entrance animations.
- [ ] **About/Stats**: Layout the stats grid using Flexbox/Grid.
- [ ] **Portfolio**: Create a responsive grid for project cards with hover effects.
- [ ] **Skills (New)**: Add a visual skills section (pills or progress bars).
- [ ] **Contact**: Style the form inputs with focus states.

**Verification Criteria**:
- [ ] Hero section is vertically centered and responsive.
- [ ] Portfolio grid adapts from 1 column (mobile) to 3 columns (desktop).
- [ ] Form inputs look good in dark mode (no default white accumulation).

**Exit Criteria**: All page sections are visually complete and responsive.

---

## Phase 4: Interactions & Logic
**Type**: API / Integration
**Estimated**: 2 hours
**Files**: `js/script.js`

**Tasks**:
- [ ] **Mobile Menu**: Implement vanilla JS toggle for the navbar.
- [ ] **Scroll Spy**: Implement intersection observer for active link highlighting.
- [ ] **API Demo**: Rewrite the "Fetch Updates" functionality using native `fetch()` instead of `$.ajax`.
- [ ] **Micro-interactions**: Add specific hover and scroll reveals (using IntersectionObserver).

**Verification Criteria**:
- [ ] Mobile menu opens/closes smoothly.
- [ ] API button successfully fetches data and updates the DOM.
- [ ] Animations trigger on scroll.

**Exit Criteria**: The site is fully functional and interactive without any console errors.
