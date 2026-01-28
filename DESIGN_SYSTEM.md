# Design System: Neon Aurora

**Theme**: Deep Space Dark with Vibrant Neon Accents
**Core Concept**: A premium, developer-focused portfolio that feels "alive" through glassmorphism, dynamic gradients, and smooth interactions.

---

## 1. Color Palette

### Backgrounds
- **Surface Dark**: `#0a0a0b` (Main background - nearly black)
- **Surface Glass**: `rgba(255, 255, 255, 0.03)` (Card background)
- **Surface Glass Hover**: `rgba(255, 255, 255, 0.07)`
- **Border Glass**: `rgba(255, 255, 255, 0.1)`

### Accents (Neon Gradients)
- **Primary Gradient**: `linear-gradient(135deg, #00f260 0%, #0575e6 100%)` (Cyan to Blue - Logic/Code)
- **Secondary Gradient**: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)` (Pink to Red - Creative/Design)
- **Text Gradient**: `linear-gradient(to right, #e0e0e0, #ffffff)`

### Text Colors
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#a1a1aa` (Zinc 400)
- **Text Muted**: `#52525b` (Zinc 600)

---

## 2. Typography

**Font Family**: `Inter`, system-ui, sans-serif
**Weights**: 400 (Regular), 600 (SemiBold), 800 (ExtraBold)

### Scale (Fluid Clamp)
- **H1 (Hero)**: `clamp(2.5rem, 5vw, 4.5rem)`
- **H2 (Section)**: `clamp(2rem, 4vw, 3rem)`
- **H3 (Card)**: `1.5rem`
- **Body**: `1rem` (16px)

---

## 3. UI Components

### Glass Card
- **Background**: `backdrop-filter: blur(12px)`
- **Border**: `1px solid var(--border-glass)`
- **Radius**: `16px` (Modern rounded corners)
- **Shadow**: `0 4px 24px -1px rgba(0, 0, 0, 0.2)`

### Buttons
1.  **Primary Glow**:
    *   Background: Primary Gradient
    *   Text: White (Bold)
    *   Hover: `transform: translateY(-2px)`, `box-shadow: 0 0 20px rgba(5, 117, 230, 0.5)`
2.  **Outline Glass**:
    *   Border: 1px solid white/20
    *   Hover: Background white/10

### Inputs (Forms)
- **Bg**: Transparent
- **Border**: Bottom border only (Minimalist) or Full rounded glass border
- **Focus**: Border color changes to Primary Gradient via `border-image` or `outline`

---

## 4. Animations

- **Fade In Up**: Elements slide up and fade in upon scroll.
- **Hover Lift**: Cards lift 5px on hover.
- **Pulse**: Subtle glow effect behind key elements.

---

## 5. Spacing System (Grid 4px base)

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 48px
- **section**: 80px (Vertical spacing between sections)
