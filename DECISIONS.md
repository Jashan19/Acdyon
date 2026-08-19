# Architectural & Design Decisions — Aether Landing Page

This document outlines the technical, architectural, and design choices made during the creation of the **Aether** product landing page for the **Acdyon Technologies Frontend Challenge — Part 2**.

---

## 1. Aesthetic & UI Strategy

* **Theme & Atmosphere**: Adopted a deep, dark palette (`#050608` ambient background) accented with subtle radial cyan glows (`#00e5ff`) and thin white borders (`rgba(255, 255, 255, 0.08)`). This delivers a cinematic, technical, and premium feel aligned with modern frontier AI tools.
* **Typography**: Used `Inter` for crisp body prose and `JetBrains Mono` for structural keys, metadata labels, and structural tags to reinforce a high-performance system aesthetic.
* **Honest Representation**: Strictly avoided generic SaaS tropes such as fake client logos, fabricated metrics, or artificial trust badges. Conceptual visualizers (such as the Knowledge Graph) are explicitly labeled as structural visual representations.

---

## 2. Dynamic Features & Interactive Components

### Hero Ambient Mesh (Canvas Canvas 2D)
* **Implementation**: A lightweight Vanilla JS Canvas algorithm that creates floating memory nodes that automatically draw vector lines when within spatial proximity of one another.
* **Performance Choice**: Implemented particle caps scaled dynamically based on screen resolution to ensure smooth 60fps rendering without DOM node bloating.

### Simulated Memory Engine Processing
* **Implementation**: A state-machine simulation using Vanilla JS timeouts.
* **User Flow**: Captures raw user input, visually progresses through processing states (*Interaction → Memory Extraction → Memory Updated*), and presents structured output keys (`GOAL`, `PROJECT`, `TIME`).

### Interactive Knowledge Graph (Inline SVG + Data Attributes)
* **Implementation**: Built with inline SVG `<g>`, `<circle>`, and `<line>` elements bound through `data-id`, `data-from`, and `data-to` attributes.
* **Interaction**: Hovering over any node triggers JS vector relation highlighting to emphasize connected nodes and memory edges in real-time.

---

## 3. Responsive & Mobile Performance

* **Breakpoints**: Optimized specifically across a continuous range, including explicit support for **390px mobile** (iPhone 12/13/14 class) up to **1440px desktop**.
* **Layout**: Utilized CSS Flexbox, Grid, and mobile-friendly scroll tracks for horizontal pipelines to prevent horizontal page overflow (`overflow-x: hidden`).

---

## 4. Easter Egg

* **Konami Code Listener**: Built-in sequence detector (`↑ ↑ ↓ ↓ ← → ← → B A`). Triggering this sequence slides up a subtle toast notification confirming active kernel archival state overrides.