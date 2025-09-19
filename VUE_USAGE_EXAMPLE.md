# Using astro-physics-engine in a Vue Project

## Installation

Once published to npm, you can install it in any Vue project:

```bash
npm install astro-physics-engine
```

## Vue Component Example

Here's a simple Vue component that demonstrates the 2-body orbit:

```vue
<template>
  <div class="simulation-demo">
    <h2>Solar System Simulation</h2>
    <canvas ref="canvas" width="800" height="600"></canvas>
    <div class="controls">
      <button @click="toggleSimulation">
        {{ isRunning ? 'Pause' : 'Start' }} Simulation
      </button>
      <button @click="resetSimulation">Reset</button>
      <div>
        <label>Time Step (days): </label>
        <input v-model.number="timeStep" type="range" min="0.1" max="10" step="0.1" />
        <span>{{ timeStep }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  PhysicsSimulation, 
  SimulationRunner, 
  CelestialBodyPresets,
  Vector2D 
} from 'astro-physics-engine'

const canvas = ref<HTMLCanvasElement>()
const isRunning = ref(false)
const timeStep = ref(1.0)

let simulation: PhysicsSimulation
let runner: SimulationRunner
let ctx: CanvasRenderingContext2D

// Scale factor for rendering (1 AU = 100 pixels)
const SCALE = 100 / 1.496e11

onMounted(() => {
  if (!canvas.value) return
  
  ctx = canvas.value.getContext('2d')!
  setupSimulation()
})

onUnmounted(() => {
  if (runner) {
    runner.stop()
  }
})

function setupSimulation() {
  // Create Sun and Earth
  const sun = CelestialBodyPresets.createSun()
  const earth = CelestialBodyPresets.createEarth()
  
  simulation = new PhysicsSimulation([sun, earth])
  simulation.dt = timeStep.value * 86400 // Convert days to seconds
  
  runner = new SimulationRunner(simulation, updateVisualization)
  
  // Initial render
  updateVisualization(simulation.getState())
}

function updateVisualization(state: any) {
  if (!ctx) return
  
  // Clear canvas
  ctx.clearRect(0, 0, 800, 600)
  
  // Set origin to center
  ctx.save()
  ctx.translate(400, 300)
  
  // Draw bodies
  for (const body of state.bodies) {
    const x = body.position.x * SCALE
    const y = body.position.y * SCALE
    
    ctx.beginPath()
    ctx.arc(x, y, Math.log10(body.radius) * 2, 0, Math.PI * 2)
    ctx.fillStyle = body.color
    ctx.fill()
    
    // Label
    ctx.fillStyle = 'white'
    ctx.font = '12px Arial'
    ctx.fillText(body.name, x + 10, y - 10)
  }
  
  ctx.restore()
  
  // Display info
  ctx.fillStyle = 'white'
  ctx.font = '14px Arial'
  ctx.fillText(`Time: ${(state.time / 86400).toFixed(1)} days`, 10, 20)
  ctx.fillText(`Frame Time: ${state.frameTime?.toFixed(2)}ms`, 10, 40)
}

function toggleSimulation() {
  if (isRunning.value) {
    runner.stop()
  } else {
    runner.start()
  }
  isRunning.value = !isRunning.value
}

function resetSimulation() {
  runner.stop()
  isRunning.value = false
  setupSimulation()
}

// Watch timeStep changes
watch(() => timeStep.value, (newValue) => {
  if (simulation) {
    simulation.dt = newValue * 86400
  }
})
</script>

<style scoped>
.simulation-demo {
  padding: 20px;
  background: #000;
  color: white;
}

canvas {
  border: 1px solid #333;
  background: #001;
}

.controls {
  margin-top: 10px;
  display: flex;
  gap: 20px;
  align-items: center;
}

button {
  padding: 8px 16px;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0088ff;
}

input[type="range"] {
  width: 100px;
}
</style>
```

## Usage in a regular JavaScript/TypeScript file:

```typescript
import { 
  PhysicsSimulation, 
  CelestialBodyPresets, 
  createCelestialBody,
  Vector2D 
} from 'astro-physics-engine'

// Create a simple 2-body system
const sun = CelestialBodyPresets.createSun()
const earth = CelestialBodyPresets.createEarth()

const simulation = new PhysicsSimulation([sun, earth])
simulation.dt = 86400 // 1 day timesteps

// Run simulation for 1 year
simulation.simulate(365)

console.log(`After 1 year:`)
console.log(`Earth position: ${earth.position.magnitude() / 1.496e11} AU from Sun`)
console.log(`Earth velocity: ${earth.velocity.magnitude() / 1000} km/s`)
```

## Installation Instructions for Vue Project:

1. Create a new Vue project or use existing one
2. Install the physics engine: `npm install astro-physics-engine`
3. Copy the Vue component above into your project
4. Import and use the component in your app

The library provides full TypeScript support with proper type definitions!
