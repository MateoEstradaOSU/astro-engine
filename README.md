# Astro Physics Engine

A TypeScript library for N-body gravitational physics simulation with 2D vector math and celestial mechanics.

## Features

- **N-body Gravitational Simulation**: Simulate multiple celestial bodies with realistic gravitational interactions
- **2D & 3D Vector Mathematics**: Complete Vector2D and Vector3D classes with all essential operations
- **Celestial Body System**: Pre-built celestial body types with realistic mass/radius presets
- **3D Orbital Mechanics**: Full 3D support with orbital inclinations, angular momentum, and cross products
- **Euler Integration**: Numerical integration for position and velocity updates in 2D and 3D
- **Real-time Simulation**: Built-in animation loop support with `requestAnimationFrame`
- **Conservation Laws**: Energy and angular momentum tracking for realistic physics
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

#### 2D Presets
```typescript
const sun = CelestialBodyPresets.createSun()     // 1.989×10³⁰ kg
const earth = CelestialBodyPresets.createEarth() // 5.972×10²⁴ kg  
const moon = CelestialBodyPresets.createMoon()   // 7.342×10²² kg
```

#### 3D Presets
```typescript
const sun3D = CelestialBodyPresets3D.createSun()     // 3D solar position
const earth3D = CelestialBodyPresets3D.createEarth() // Realistic orbit
const mars3D = CelestialBodyPresets3D.createMars()   // Mars orbit with inclination
const jupiter3D = CelestialBodyPresets3D.createJupiter() // Giant planet
const comet3D = CelestialBodyPresets3D.createComet() // Highly eccentric orbit
```

### Functions

#### 2D Functions
```typescript
// Calculate gravitational force between 2D bodies
calculateGravitationalForceBetweenBodies(body1, body2, G?)

// Update body using Euler integration  
updateBodyEuler(body, force, dt)

// Calculate total force on body from all others
calculateTotalGravitationalForce(targetBody, otherBodies, G?)
```

#### 3D Functions
```typescript
// Calculate gravitational force between 3D bodies
calculateGravitationalForceVector3D(body1, body2, G?)

// Update 3D body position and velocity
updateBodyEuler3D(body, force, dt)

// Calculate total force on 3D body from all others  
calculateTotalGravitationalForce3D(targetBody, otherBodies, G?)
```

## Examples

### 2D Examples

#### Basic 2-Body Orbit
```typescript
import { PhysicsSimulation, CelestialBodyPresets } from 'astro-physics-engine'

const sun = CelestialBodyPresets.createSun()
const earth = CelestialBodyPresets.createEarth() 

const simulation = new PhysicsSimulation([sun, earth])
simulation.animate() // Start real-time animation
```

#### Custom 2D Solar System
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

### 3D Examples

#### 3D Solar System with Conservation Laws
```typescript
import { PhysicsSimulation3D, CelestialBodyPresets3D } from 'astro-physics-engine'

// Create realistic 3D solar system
const sun = CelestialBodyPresets3D.createSun()
const earth = CelestialBodyPresets3D.createEarth()
const mars = CelestialBodyPresets3D.createMars()
const jupiter = CelestialBodyPresets3D.createJupiter()

const simulation = new PhysicsSimulation3D([sun, earth, mars, jupiter])

// Monitor conservation laws
simulation.animate() // Start simulation

setInterval(() => {
  const energy = simulation.getTotalEnergy()
  const angularMomentum = simulation.getTotalAngularMomentum()
  console.log(`Energy: ${energy.toExponential(3)} J`)
  console.log(`Angular Momentum: ${angularMomentum.magnitude().toExponential(3)} kg⋅m²/s`)
}, 1000)
```

#### Custom 3D Celestial Body with Orbital Inclination
```typescript
import { Vector3D, createCelestialBody3D, PhysicsSimulation3D } from 'astro-physics-engine'

// Create a comet with high orbital inclination
const comet: CelestialBody3D = {
  id: "halley",
  name: "Halley's Comet",
  mass: 2.2e14, // kg
  radius: 5500, // meters
  position: new Vector3D(8.766e12, 0, 2.0e12), // Far out position
  velocity: new Vector3D(-2000, 25000, 5000), // Elliptical velocity
  orbitalInclination: 162.26, // degrees (retrograde)
  color: "#87CEEB"
}

const sun = CelestialBodyPresets3D.createSun()
const simulation = new PhysicsSimulation3D([sun, comet])

// Track 3D motion
simulation.update(86400) // Advance one day
console.log(comet.position) // New 3D position
```

#### Vector3D Mathematics
```typescript
import { Vector3D } from 'astro-physics-engine'

const v1 = new Vector3D(1, 2, 3)
const v2 = new Vector3D(4, 5, 6)

// Basic operations
const sum = v1.add(v2)           // Vector3D(5, 7, 9)
const cross = v1.cross(v2)       // Vector3D(-3, 6, -3)
const dot = v1.dot(v2)           // 32
const magnitude = v1.magnitude() // 3.742

// Angular momentum calculation (r × p)
const position = new Vector3D(1e11, 0, 0) // 100 million km
const momentum = new Vector3D(0, 3e4, 1e4) // kg⋅m/s
const angularMomentum = position.cross(momentum)
```

## Development Status

- ✅ **Day 1**: Vector math, gravitational forces, celestial body types
- ✅ **Day 2**: Euler integration, simulation loops, 2-body orbits
- ✅ **Day 3**: Full 3D support, Vector3D, conservation laws, angular momentum
- �  **Day 4**: Stability improvements, Library packaging, npm deployment
- 📋 **Day 5**: Integration with Front-end library + testing (Vue)
- 📋 **Day 6**: Integration with ThreeJS for simulation + testing

## 3D Physics Features

🌌 **Complete 3D Implementation**
- Vector3D class with cross products for angular momentum calculations
- PhysicsSimulation3D with energy and angular momentum conservation tracking
- CelestialBody3D interface supporting orbital inclinations
- Realistic 3D celestial body presets (Sun, Earth, Mars, Jupiter, Comets)
- 3D gravitational force calculations with proper vector mathematics

🔬 **Conservation Laws**
- Total energy tracking (kinetic + potential)
- Angular momentum conservation with Vector3D cross products
- Real-time monitoring for physics validation

🪐 **Orbital Mechanics**
- Support for orbital inclinations and 3D trajectories  
- Realistic planetary presets with proper 3D positioning
- Comet simulation with highly elliptical orbits

## License

MIT License - see LICENSE file for details.
