// Test file for Day 2 - Gravity & Motion simulation
import { 
  Vector2D, 
  PhysicsSimulation,
  SimulationRunner,
  CelestialBodyPresets,
  createCelestialBody,
  calculateGravitationalForceBetweenBodies,
  updateBodyEuler
} from './main.js'

console.log('=== Day 2: Gravity & Motion Tests ===')

// Test 1: Basic gravity function between Sun and Earth
console.log('\n--- Test 1: Gravity Force Calculation ---')
const sun = CelestialBodyPresets.createSun()
const earth = CelestialBodyPresets.createEarth()

const force = calculateGravitationalForceBetweenBodies(earth, sun)
console.log(`Sun position: ${sun.position.toString()}`)
console.log(`Earth position: ${earth.position.toString()}`)
console.log(`Gravitational force on Earth: ${force.toString()}`)
console.log(`Force magnitude: ${force.magnitude().toExponential()} N`)

// Test 2: Euler integration step
console.log('\n--- Test 2: Euler Integration ---')
const testPlanet = createCelestialBody({
  id: "test-planet",
  name: "Test Planet", 
  mass: 1e24,
  position: new Vector2D(1e11, 0), // 100 million km from origin
  velocity: new Vector2D(0, 1e4), // 10 km/s initial velocity
  radius: 6e6
})

console.log(`Before integration:`)
console.log(`  Position: ${testPlanet.position.toString()}`)
console.log(`  Velocity: ${testPlanet.velocity.toString()}`)

// Apply a test force for one step
const testForce = new Vector2D(-1e22, 0) // Force pulling toward origin
updateBodyEuler(testPlanet, testForce, 1000) // 1000 second timestep

console.log(`After one Euler step (dt=1000s, F=${testForce.toString()}):`)
console.log(`  Position: ${testPlanet.position.toString()}`)
console.log(`  Velocity: ${testPlanet.velocity.toString()}`)

// Test 3: Simple 2-body simulation (Sun-Earth)
console.log('\n--- Test 3: 2-Body Simulation ---')

// Create a scaled-down system for faster simulation
const centralStar = createCelestialBody({
  id: "star",
  name: "Central Star",
  mass: 2e30, // Solar mass
  position: new Vector2D(0, 0),
  velocity: new Vector2D(0, 0),
  radius: 7e8,
  color: "#FDB813"
})

const orbitingPlanet = createCelestialBody({
  id: "planet",
  name: "Orbiting Planet", 
  mass: 6e24, // Earth mass
  position: new Vector2D(1.5e11, 0), // 1 AU
  velocity: new Vector2D(0, 29780), // Approximate orbital velocity
  radius: 6e6,
  color: "#6B93D6"
})

// Create simulation
const simulation = new PhysicsSimulation([centralStar, orbitingPlanet])
simulation.dt = 86400 // 1 day timestep

console.log('Initial state:')
console.log(`Star: ${centralStar.position.toString()}`)
console.log(`Planet: ${orbitingPlanet.position.toString()}, velocity: ${orbitingPlanet.velocity.toString()}`)

// Run simulation for 10 steps (10 days)
console.log('\nRunning simulation for 10 days...')
for (let i = 0; i < 10; i++) {
  const dayBefore = i + 1
  simulation.step()
  const distance = orbitingPlanet.position.magnitude()
  const speed = orbitingPlanet.velocity.magnitude()
  console.log(`Day ${dayBefore}: distance=${(distance/1e11).toFixed(3)} AU, speed=${(speed/1000).toFixed(1)} km/s`)
}

// Test 4: Demonstrate conservation of energy concepts
console.log('\n--- Test 4: Energy Tracking ---')
function calculateKineticEnergy(body: any): number {
  return 0.5 * body.mass * body.velocity.magnitude() ** 2
}

function calculatePotentialEnergy(body1: any, body2: any, G: number = 6.67430e-11): number {
  const distance = body1.position.distanceTo(body2.position)
  return -G * body1.mass * body2.mass / distance
}

// Reset to initial conditions for energy test
orbitingPlanet.position = new Vector2D(1.5e11, 0)
orbitingPlanet.velocity = new Vector2D(0, 29780)
simulation.time = 0

const initialKE = calculateKineticEnergy(orbitingPlanet)
const initialPE = calculatePotentialEnergy(orbitingPlanet, centralStar)
const initialTotalEnergy = initialKE + initialPE

console.log(`Initial kinetic energy: ${(initialKE/1e32).toFixed(3)} × 10³² J`)
console.log(`Initial potential energy: ${(initialPE/1e32).toFixed(3)} × 10³² J`)
console.log(`Initial total energy: ${(initialTotalEnergy/1e32).toFixed(3)} × 10³² J`)

// Run for a longer period and check energy
simulation.simulate(100) // 100 days
const finalKE = calculateKineticEnergy(orbitingPlanet)
const finalPE = calculatePotentialEnergy(orbitingPlanet, centralStar)
const finalTotalEnergy = finalKE + finalPE

console.log(`Final kinetic energy: ${(finalKE/1e32).toFixed(3)} × 10³² J`)
console.log(`Final potential energy: ${(finalPE/1e32).toFixed(3)} × 10³² J`)
console.log(`Final total energy: ${(finalTotalEnergy/1e32).toFixed(3)} × 10³² J`)

const energyChange = Math.abs((finalTotalEnergy - initialTotalEnergy) / initialTotalEnergy) * 100
console.log(`Energy change: ${energyChange.toFixed(2)}% (should be small for stable orbit)`)

console.log('\n=== Day 2 Implementation Complete! ===')
console.log('✅ Gravity function implemented')
console.log('✅ Euler integration implemented') 
console.log('✅ Simulation loop created')
console.log('✅ 2-body orbit demonstrated')
