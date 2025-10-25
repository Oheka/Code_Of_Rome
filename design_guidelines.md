# Design Guidelines - Code of Rome

## Color Palette

### Light Mode
- **Primary**: Bronze/Gold (HSL 35° 60% 45%) - Roman imperial gold
- **Background**: Warm cream (HSL 40° 8% 97%) - Aged parchment
- **Card**: Light sand (HSL 40° 12% 95%) - Stone tablets
- **Foreground**: Deep brown (HSL 35° 15% 12%) - Ink

### Dark Mode
- **Primary**: Warm gold (HSL 35° 55% 50%) - Torchlit gold
- **Background**: Deep charcoal (HSL 35° 8% 10%) - Night stone
- **Card**: Dark slate (HSL 35° 10% 13%) - Shadowed marble
- **Foreground**: Warm white (HSL 38° 10% 90%) - Moonlit scroll

## Typography

### Font Families
1. **Cinzel** (Headings) - Inspired by Roman inscriptions
   - Hero title: 4rem (desktop) / 2.5rem (mobile)
   - Section headings: 2rem-3rem
   - Font weight: 400-700

2. **Cormorant** (Body) - Elegant serif for readability
   - Body text: 1.125rem
   - Line height: 1.7
   - Italic for quotes and emphasis

3. **JetBrains Mono** (Cipher text) - Monospace for encrypted messages
   - Cipher display: 2rem
   - Code-like elements: 1rem

## Spacing System
- **Small**: 0.5rem-1rem (8-16px) - Tight spacing, badges
- **Medium**: 1.5rem-2rem (24-32px) - Card padding, section gaps
- **Large**: 3rem-4rem (48-64px) - Section padding, major divisions

## Components

### Hero Section
- Full viewport height (85vh)
- Colosseum background with dark gradient overlay (black/70 to black/60)
- Light text regardless of theme (works on dark overlay)
- Centered content with smooth scroll CTA

### Progress Tracker
- Horizontal progress bar with 10 Roman numeral markers (I-X)
- Active markers: primary color
- Inactive markers: muted-foreground/30
- Responsive: hide numerals on mobile, show dots only

### Game Card
- Decorative corner borders (4px primary/30)
- Ample padding: 3rem (desktop) / 2rem (mobile)
- Two-tone layout: accent background for encrypted text, card background for input
- Border radius: rounded-lg (0.5rem)

### Feedback Messages
- Success: primary background (10% opacity) with primary border
- Error: destructive background (10% opacity) with destructive border
- Animated entrance: fade + slide from top
- Shake animation on input error

### Stats Cards
- Grid layout: 1 column (mobile) / 3 columns (desktop)
- Icon badges with primary/10 background
- Large numbers (2rem) with muted labels
- Subtle hover elevation effect

### Victory Modal
- Full-screen overlay with backdrop blur
- Centered card with 2px primary border
- Confetti animation (500 pieces, gravity 0.3)
- Spring animation entrance
- 2-column stats grid

## Interactions

### Buttons
- Primary variant for main actions (Start Game, Check Answer)
- Size: lg for primary actions (min-h-10)
- Icon + text combination for context
- Built-in hover/active elevation (no custom states needed)

### Input Fields
- Textarea with serif font for natural text entry
- Min height: 120px for comfortable typing
- Disabled state when game inactive
- Keyboard shortcut: Ctrl+Enter to submit

### Animations
- **Entrance**: Fade + slide up (20px)
- **Hero scroll indicator**: Bounce loop (10px amplitude, 2s)
- **Error shake**: Horizontal shake sequence [-10, 10, -10, 10, 0] over 0.4s
- **Victory confetti**: 500 pieces, non-recycling, 0.3 gravity

## Layout Structure

### Desktop (≥768px)
