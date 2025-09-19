// Test file for CelestialBody types and utilities
import { 
  Vector2D, 
  CelestialBody,
  createCelestialBody,
  calculateGravitationalForceBetweenBodies,
  calculateTotalGravitationalForce,
  areColliding,
  CelestialBodyPresets,
  GRAVITATIONAL_CONSTANT
} from './main.js'

console.log('=== CelestialBody Type Tests ===')

// Test creating a custom celestial body
const customPlanet = createCelestialBody({
  id: "custom-planet",
  name: "Custom Planet",
  mass: 1e24,
  position: new Vector2D(1000, 2000),
  velocity: new Vector2D(100, 50),
  radius: 5000,
  color: "#FF5733"
})

console.log('Custom Planet:')
console.log(`  ID: ${customPlanet.id}`)
console.log(`  Name: ${customPlanet.name}`)
console.log(`  Mass: ${customPlanet.mass} kg`)
console.log(`  Position: ${customPlanet.position.toString()}`)
console.log(`  Velocity: ${customPlanet.velocity.toString()}`)
console.log(`  Radius: ${customPlanet.radius} m`)
console.log(`  Color: ${customPlanet.color}`)

console.log('\n=== Celestial Body Presets Tests ===')

// Test preset bodies
const sun = CelestialBodyPresets.createSun()
const earth = CelestialBodyPresets.createEarth()
const moon = CelestialBodyPresets.createMoon()

console.log('Sun:', sun.name, 'Mass:', sun.mass.toExponential(), 'kg')
console.log('Earth:', earth.name, 'Mass:', earth.mass.toExponential(), 'kg')
console.log('Moon:', moon.name, 'Mass:', moon.mass.toExponential(), 'kg')

console.log('\n=== Gravitational Force Between Bodies Tests ===')

// Test gravitational force between Earth and Sun
const earthSunForce = calculateGravitationalForceBetweenBodies(earth, sun)
console.log(`Force on Earth from Sun: ${earthSunForce.toString()}`)
console.log(`Force magnitude: ${earthSunForce.magnitude().toExponential()} N`)

// Test gravitational force between Earth and Moon
const earthMoonForce = calculateGravitationalForceBetweenBodies(earth, moon)
console.log(`Force on Earth from Moon: ${earthMoonForce.toString()}`)
console.log(`Force magnitude: ${earthMoonForce.magnitude().toExponential()} N`)

console.log('\n=== Total Gravitational Force Tests ===')

// Create a simple 3-body system
const bodies = [sun, earth, moon]

// Calculate total force on Earth from Sun and Moon
const totalForceOnEarth = calculateTotalGravitationalForce(earth, bodies)
console.log(`Total force on Earth: ${totalForceOnEarth.toString()}`)
console.log(`Total force magnitude: ${totalForceOnEarth.magnitude().toExponential()} N`)

// Calculate total force on Moon from Sun and Earth
const totalForceOnMoon = calculateTotalGravitationalForce(moon, bodies)
console.log(`Total force on Moon: ${totalForceOnMoon.toString()}`)
console.log(`Total force magnitude: ${totalForceOnMoon.magnitude().toExponential()} N`)

console.log('\n=== Collision Detection Tests ===')

// Test collision detection
const asteroid1 = createCelestialBody({
  id: "asteroid1",
  name: "Asteroid 1",
  mass: 1e12,
  position: new Vector2D(0, 0),
  radius: 100
})

const asteroid2 = createCelestialBody({
  id: "asteroid2", 
  name: "Asteroid 2",
  mass: 2e12,
  position: new Vector2D(150, 0), // 150m away
  radius: 100
})

const asteroid3 = createCelestialBody({
  id: "asteroid3",
  name: "Asteroid 3", 
  mass: 3e12,
  position: new Vector2D(300, 0), // 300m away
  radius: 100
})

console.log(`Asteroid 1 and 2 colliding: ${areColliding(asteroid1, asteroid2)}`) // Should be true (distance 150, combined radius 200)
console.log(`Asteroid 1 and 3 colliding: ${areColliding(asteroid1, asteroid3)}`) // Should be false (distance 300, combined radius 200)

console.log('\n=== Scaled Solar System Demo ===')

// Create a scaled-down solar system for easier visualization
const scaleFactor = 1e-9 // Scale down distances by a billion
const massScale = 1e-20   // Scale down masses

const scaledSun = createCelestialBody({
  id: "scaled-sun",
  name: "Scaled Sun",
  mass: sun.mass * massScale,
  position: new Vector2D(0, 0),
  radius: 696000, // Still large for visibility 
  color: "#FDB813"
})

const scaledEarth = createCelestialBody({
  id: "scaled-earth",
  name: "Scaled Earth", 
  mass: earth.mass * massScale,
  position: new Vector2D(earth.position.x * scaleFactor, 0),
  velocity: new Vector2D(0, earth.velocity.y * scaleFactor),
  radius: 6371,
  color: "#6B93D6"
})

console.log(`Scaled Sun position: ${scaledSun.position.toString()}`)
console.log(`Scaled Earth position: ${scaledEarth.position.toString()}`)
console.log(`Distance: ${scaledSun.position.distanceTo(scaledEarth.position)} (scaled units)`)

const scaledForce = calculateGravitationalForceBetweenBodies(scaledEarth, scaledSun)
console.log(`Scaled gravitational force: ${scaledForce.toString()}`)
console.log(`Scaled force magnitude: ${scaledForce.magnitude().toExponential()} N`)

console.log('\n=== Multi-body System Test ===')

// Create a small planetary system
const centralStar = createCelestialBody({
  id: "star",
  name: "Central Star",
  mass: 2e30,
  position: new Vector2D(0, 0),
  radius: 1e6,
  color: "#FFD700"
})

const planet1 = createCelestialBody({
  id: "planet1",
  name: "Inner Planet",
  mass: 6e24,
  position: new Vector2D(1e8, 0),
  velocity: new Vector2D(0, 50000),
  radius: 5e5,
  color: "#FF4500"
})

const planet2 = createCelestialBody({
  id: "planet2", 
  name: "Outer Planet",
  mass: 1e25,
  position: new Vector2D(2e8, 0),
  velocity: new Vector2D(0, 35000),
  radius: 8e5,
  color: "#4169E1"
})

const system = [centralStar, planet1, planet2]

// Calculate forces in the system
for (const body of system) {
  const totalForce = calculateTotalGravitationalForce(body, system)
  console.log(`${body.name} total force: magnitude ${totalForce.magnitude().toExponential()} N`)
}
