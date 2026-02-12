# Corporate Events - Premium Physics Design

## Overview
The Corporate Events section has been completely redesigned with a premium, Awwwards-style aesthetic featuring physics-based floating pills powered by Matter.js.

## Components Created

### 1. `/components/ui/gravity.tsx`
A reusable physics engine component that provides:
- Matter.js integration with React
- Customizable gravity and physics properties
- Interactive mouse/touch controls with grab cursor
- Configurable walls (top, bottom, left, right)

**Props:**
- `grabCursor` (boolean): Enable grab/grabbing cursor on interaction
- `topWall`, `bottomWall`, `leftWall`, `rightWall` (boolean): Control wall boundaries
- `gravity` (object): Set gravity direction and strength
- `restitution`, `friction`, `frictionAir` (number): Physics properties
- `onReady` (function): Callback when engine is initialized

### 2. `/components/sections/corporate-fancy.tsx`
The main corporate section component featuring:
- Large italic headline with premium typography
- Centered subtitle with elegant spacing
- Physics-based floating pills representing corporate benefits
- Interactive drag-and-drop functionality
- Fully responsive design

**Props:**
- `title` (string): Main headline (default: "Corporate Experiences")
- `subtitle` (string): Descriptive subtitle
- `ctaText` (string): Call-to-action text
- `pills` (Pill[]): Array of floating pill objects
- `onCtaClick` (function): CTA button click handler

**Pill Object:**
```typescript
{
  text: string;        // Pill label
  color: string;       // Background color (hex)
  size: "large" | "small";  // Pill size variant
}
```

### 3. `/components/CorporateEventsView.tsx`
Completely redesigned corporate events page with:
- Minimal navigation bar
- Clean white background
- Full integration of CorporateFancy component
- Contact functionality

## Installation

Dependencies installed:
```bash
npm install lodash matter-js poly-decomp svg-path-commander
npm install --save-dev @types/lodash @types/matter-js
```

## Design Principles

### Visual Style
- **Background**: Pure white (#ffffff)
- **Typography**: Large italic headlines (6xl-8xl), clean sans-serif
- **Whitespace**: Generous padding and spacing throughout
- **Colors**: Vibrant, brand-friendly pill colors (green, blue, orange, purple, pink, cyan)
- **Shadows**: Soft shadows on pills for depth

### Physics Behavior
- **Gravity**: Gentle downward pull (y: 0.5)
- **Restitution**: 0.6 (bouncy but controlled)
- **Friction**: 0.1 (smooth sliding)
- **Air Friction**: 0.01 (natural deceleration)

### Responsive Design
- Mobile: Smaller text sizes, adjusted pill dimensions
- Desktop: Full-size experience with optimal spacing
- All viewports: Centered content, no horizontal overflow

## Customization Examples

### Change Pill Colors
```tsx
<CorporateFancy
  pills={[
    { text: "+50% Productividad", color: "#10b981", size: "large" },
    { text: "Custom Pill", color: "#ff6b6b", size: "small" },
  ]}
/>
```

### Modify Text Content
```tsx
<CorporateFancy
  title="Experiencias Corporativas"
  subtitle="Tu mensaje personalizado aquí"
  ctaText="Solicitar información"
/>
```

### Custom CTA Action
```tsx
<CorporateFancy
  onCtaClick={() => {
    // Custom action
    window.location.href = '/contact';
  }}
/>
```

## Performance Considerations

1. **Physics Engine**: Matter.js runs efficiently but consider:
   - Limit number of pills to 7-10 for optimal performance
   - Physics calculations run at 60fps
   - Canvas is hidden (opacity: 0) to reduce render overhead

2. **Memory**: Engine cleanup is handled automatically on component unmount

3. **Mobile**: Physics works smoothly on mobile devices with touch support

## Integration Checklist

✅ **What props can be customized?**
- Title, subtitle, CTA text
- Pills array (text, color, size)
- CTA click handler
- All physics properties via Gravity component

✅ **Where should this section be used?**
- Corporate events landing page (current implementation)
- Homepage corporate section (can be extracted)
- Any premium service showcase page

✅ **Performance considerations?**
- Limit pills to 7-10 items
- Physics engine auto-cleans on unmount
- Responsive and mobile-optimized
- No external assets required

## Browser Support
- Modern browsers with WebGL support
- Mobile Safari, Chrome, Firefox
- Touch and mouse interaction supported

## Future Enhancements
- Add more physics shapes (polygons, custom SVG paths)
- Implement collision sound effects
- Add particle effects on pill collisions
- Create theme variants (dark mode)
