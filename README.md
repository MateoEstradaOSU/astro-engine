# Astro Physics Engine

A TypeScript library for N-body gravitational physics simulation with 2D vector math and celestial mechanics.

## Features

- **N-body Gravitational Simulation**: Simulate multiple celestial bodies with realistic gravitational interactions
- **2D Vector Mathematics**: Complete Vector2D class with all essential operations
- **Celestial Body System**: Pre-built celestial body types with realistic mass/radius presets
- **Euler Integration**: Numerical integration for position and velocity updates
- **Real-time Simulation**: Built-in animation loop support with `requestAnimationFrame`
- **Energy Tracking**: Utilities for monitoring kinetic and potential energy conservation
- **TypeScript**: Full type safety and excellent IDE support

## Installation

```bash
npm install astro-physics-engine
```

## Quick Start

```typescript
import { 
  PhysicsSimulation, 
  CelestialBodyPresets, 
  SimulationRunner 
} from 'astro-physics-engine'

// Create celestial bodies
const sun = CelestialBodyPresets.createSun()
const earth = CelestialBodyPresets.createEarth()

// Set up simulation
const simulation = new PhysicsSimulation([sun, earth])
simulation.dt = 86400 // 1 day timestep

// Run simulation
const runner = new SimulationRunner(simulation, (state) => {
  console.log(`Day ${state.time/86400}: Earth at distance ${earth.position.magnitude()/1e11} AU`)
})

runner.start() // Begin real-time simulation
```

## API Reference

### Core Classes

#### `Vector2D`
2D vector with mathematical operations:
```typescript
const v1 = new Vector2D(10, 20)
const v2 = new Vector2D(5, 15)
const sum = v1.add(v2) // Vector2D(15, 35)
const magnitude = v1.magnitude() // 22.36
```

#### `PhysicsSimulation` 
Manages N-body gravitational simulation:
```typescript
const sim = new PhysicsSimulation(bodies, G, dt)
sim.step() // Advance one timestep
sim.simulate(100) // Run 100 steps
```

#### `CelestialBody`
Represents a physical body in space:
```typescript
interface CelestialBody {
  id: string
  name: string
  mass: number        // kg
  position: Vector2D  // meters
  velocity: Vector2D  // m/s
  radius: number      // meters
  color: string       // hex color
}
```

### Presets

```typescript
const sun = CelestialBodyPresets.createSun()     // 1.989×10³⁰ kg
const earth = CelestialBodyPresets.createEarth() // 5.972×10²⁴ kg  
const moon = CelestialBodyPresets.createMoon()   // 7.342×10²² kg
```

### Functions

```typescript
// Calculate gravitational force between bodies
calculateGravitationalForceBetweenBodies(body1, body2, G?)

// Update body using Euler integration  
updateBodyEuler(body, force, dt)

// Calculate total force on body from all others
calculateTotalGravitationalForce(targetBody, otherBodies, G?)
```

## Examples

### 2-Body Orbit
```typescript
import { PhysicsSimulation, CelestialBodyPresets } from 'astro-physics-engine'

const sun = CelestialBodyPresets.createSun()
const earth = CelestialBodyPresets.createEarth() 

const simulation = new PhysicsSimulation([sun, earth])
simulation.simulate(365) // Simulate 1 year
```

### Custom Solar System
```typescript
import { createCelestialBody, Vector2D, PhysicsSimulation } from 'astro-physics-engine'

const star = createCelestialBody({
  id: "custom-star",
  name: "Alpha Centauri", 
  mass: 2.2e30,
  position: new Vector2D(0, 0),
  velocity: new Vector2D(0, 0),
  radius: 8.5e8,
  color: "#FFA500"
})

const planet = createCelestialBody({
  id: "exoplanet",
  name: "Kepler-442b",
  mass: 2.3e25,
  position: new Vector2D(1.8e11, 0),
  velocity: new Vector2D(0, 25000),
  radius: 8.1e6, 
  color: "#4169E1"
})

const simulation = new PhysicsSimulation([star, planet])
```

## Development Status

- ✅ **Day 1**: Vector math, gravitational forces, celestial body types
- ✅ **Day 2**: Euler integration, simulation loops, 2-body orbits
- 🚧 **Day 3**: N-body optimization, stability improvements  
- 📋 **Day 4**: Interactive controls, orbit trails
- 📋 **Day 5**: Library packaging, deployment

## License

MIT License - see LICENSE file for details.
