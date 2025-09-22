
# 5-Day Technical Roadmap

## Day 1 — Setup & Math

### Setup
- Create Vite project in library mode (`vite build --lib`).
- Configure TypeScript strict mode.
- Install dependencies:
	- `three` (optional, for visualization)
	- `pinia` (optional, for state management)
	- `d3-scale` (for units)

### Math Core
- Implement `Vector2D` class: `add`, `sub`, `mul`, `div`, `magnitude`, `normalize`.
- Utility: gravitational force calculation `F = G * m1 * m2 / r²`.

### Types

- Define `CelestialBody`:

```ts
	{
		id: string;
		name: string;
		mass: number;
		position: Vector2D;
		velocity: Vector2D;
		radius: number;
		color: string;
	}
```

### Vue Demo
- Static rendering of Sun + Earth mockup (SVG/Canvas).

**✅ Deliverable:** Running Vue app showing static system, math utilities tested.

---

## Day 2 — Gravity & Motion ✅ COMPLETED

- ✅ Implement gravity function: returns force vector on body from another body.
- ✅ Implement Euler integration: update positions/velocities by timestep `dt`.
- ✅ Create simulation loop (`requestAnimationFrame` or manual stepping).
- ✅ Physics simulation class with step-by-step integration.
- ✅ SimulationRunner for real-time animation loops.
- ✅ Energy tracking utilities for orbit stability analysis.
- Vue demo: 2-body orbit (Earth around Sun) - *Ready for implementation*.

## Day 3 — 3D Physics & Conservation Laws ✅ COMPLETED

- ✅ **Vector3D Class**: Complete 3D vector mathematics with cross products for angular momentum
- ✅ **CelestialBody3D Interface**: 3D celestial bodies with orbital inclination support
- ✅ **3D Gravitational Forces**: `calculateGravitationalForceVector3D` with proper vector math
- ✅ **PhysicsSimulation3D**: Full 3D simulation with conservation law tracking
- ✅ **Conservation Laws**: `getTotalEnergy()` and `getTotalAngularMomentum()` methods
- ✅ **3D Presets**: Realistic planetary data with Sun, Earth, Mars, Jupiter, and Comet
- ✅ **Angular Momentum**: Cross product calculations for proper 3D orbital mechanics
- ✅ **Documentation**: Comprehensive README with 3D examples and usage guides
- ✅ **Testing**: Validated all 3D functionality with runtime tests
- Vue demo: 3D solar system visualization - *Ready for Three.js integration*.

**✅ Deliverable:** Core physics engine complete - Earth can orbit Sun with configurable timesteps.


---

## Day 3 — N-body Simulation

- Extend simulation to n bodies with pairwise force summation.
- Optimize: skip self-force, precompute distances.
- Allow multiple planets with random initial positions/velocities.
- Introduce smaller timestep for stability (configurable).
- Vue demo: spawn multiple planets → watch chaotic behavior.

**✅ Deliverable:** N-body works at ~60fps with <10 bodies.


---

## Day 4 — Demo Features

### Vue controls (sliders + buttons):
- Adjust `G` (gravitational constant)
- Adjust `dt` (time step)
- Spawn planets with initial velocity vector (mouse drag)
- Add orbit trails (keep last N positions, draw path)
- Pause/resume simulation

**✅ Deliverable:** Fully interactive “Solar System Sandbox.”


---

## Day 5 — Polish & Packaging

- Refactor into `astro-physics-engine` library:
	- Core: physics, types, integrators
	- Vue demo: uses library
- Add JSDoc/TSDoc comments
- Bundle with `tsup` (smaller + tree-shakable)
- Deploy demo to Netlify/Vercel
- Write README with usage + demo link

**✅ Deliverable:** Published TS library + deployed sandbox demo.

---

## � NPM Package Deployment

### Package Configuration
- Configure `package.json` for library publishing
- Set up TypeScript build for both ESM and CommonJS
- Export main functions, classes, and types
- Add proper entry points for different module systems

### Build & Publish
- Build library with `vite build --lib`
- Generate TypeScript declaration files
- Publish to npm registry
- Version: `0.1.0` (initial release with Day 1 & 2 features)

### Library Exports
```ts
// Main exports available after npm install
export {
  Vector2D,
  CelestialBody, 
  PhysicsSimulation,
  SimulationRunner,
  CelestialBodyPresets,
  calculateGravitationalForce,
  updateBodyEuler,
  GRAVITATIONAL_CONSTANT
}
```

---

## �💡 Optional Stretch Goals

- Relativistic extension (replace momentum/energy formulas)
- 3D support (`Vector3D`)
- Presets: Sun-Earth-Moon system