# Motion UI Upgrade — Scroll Experience

Adds a cinematic, F1-telemetry-style scroll experience on top of the existing
framer-motion setup. Nothing existing is deleted — this is additive.

## New files
- `client/src/components/RaceLineProgress.jsx` — replaces the plain top
  progress bar with a glowing race-line, per-section "lap checkpoints" you can
  click to jump to a section, and a live px/s "speed" HUD reacting to scroll
  velocity.
- `client/src/components/RevealSection.jsx` — reusable wrapper with 4 entrance
  variants: `speed-wipe`, `gauge-count`, `stagger-cards`, `curtain`.
- `client/src/styles/scroll-motion.css` — styles for both.

## Already wired into `App.jsx`
- `RaceLineProgress` replaced `ScrollProgress` and is fed the section id order:
  `home, about, machine, projects, hackathons, education, achievements,
  certifications, hobbies, github, contact` (these ids already exist on each
  `<section id="...">`, so nothing else needed).
- `scroll-motion.css` is imported after `global.css`.

## Next steps for your agent (optional, section-by-section polish)
Wrap the *existing* JSX inside individual section components with
`RevealSection` to get the scroll-triggered entrance. Example for `About.jsx`:

```jsx
import { RevealSection } from './RevealSection';

// before:
<section id="about" className="section f1-about-section">
  <div className="about-content">...</div>
</section>

// after:
<section id="about" className="section f1-about-section">
  <RevealSection variant="speed-wipe">
    <div className="about-content">...</div>
  </RevealSection>
</section>
```

Suggested variant per section (purely a starting point, tweak to taste):
| Section | Variant |
|---|---|
| About | `speed-wipe` |
| F1MachineTelemetry | `gauge-count` |
| Projects (grid of cards) | `stagger-cards` |
| Hackathons | `speed-wipe` |
| Education | `curtain` |
| Achievements | `gauge-count` |
| Certifications | `stagger-cards` |
| Hobbies | `speed-wipe` |
| GitHubHighlights | `gauge-count` |
| Contact | `curtain` |

For `stagger-cards`, pass an array of card elements as children so each one
staggers in:

```jsx
<RevealSection variant="stagger-cards" className="projects-grid">
  {projects.map((p) => <ProjectCard key={p.id} {...p} />)}
</RevealSection>
```

## Verified
`npm run build` in `client/` completes cleanly with these changes.
