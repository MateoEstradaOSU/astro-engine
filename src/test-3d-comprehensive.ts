// Comprehensive 3D Vector and Physics Engine Tests
import { 
    Vector3D, 
    CelestialBody3D, 
    CelestialBodyPresets3D, 
    PhysicsSimulation3D,
    createCelestialBody3D,
    calculateGravitationalForceBetweenBodies3D,
    areColliding3D
} from './main.js'

console.log('=== Comprehensive 3D Physics Engine Tests ===')

// Test 1: Vector3D Basic Operations
console.log('\n--- Test 1: Vector3D Basic Operations ---')
const v1 = new Vector3D(3, 4, 5)
const v2 = new Vector3D(1, 2, 3)
const v3 = new Vector3D(2, -1, 1)

console.log(`v1: ${v1.toString()}`)
console.log(`v2: ${v2.toString()}`)
console.log(`v3: ${v3.toString()}`)

console.log(`v1 + v2: ${v1.add(v2).toString()}`)
console.log(`v1 - v2: ${v1.sub(v2).toString()}`)
console.log(`v1 * 2.5: ${v1.mul(2.5).toString()}`)
console.log(`v1 / 2: ${v1.div(2).toString()}`)

// Test 2: Vector3D Advanced Operations
console.log('\n--- Test 2: Vector3D Advanced Operations ---')
console.log(`v1 magnitude: ${v1.magnitude()}`)
console.log(`v1 normalized: ${v1.normalize().toString()}`)
console.log(`v1 • v2 (dot product): ${v1.dot(v2)}`)
console.log(`v1 × v2 (cross product): ${v1.cross(v2).toString()}`)
console.log(`v2 × v1 (cross product): ${v2.cross(v1).toString()}`)
console.log(`Distance v1 to v2: ${v1.distanceTo(v2)}`)

// Test 3: Vector3D Special Properties
console.log('\n--- Test 3: Vector3D Special Properties ---')
const orthogonal1 = new Vector3D(1, 0, 0)
const orthogonal2 = new Vector3D(0, 1, 0)
const orthogonal3 = new Vector3D(0, 0, 1)

console.log(`Orthogonal vectors dot products:`)
console.log(`  i • j = ${orthogonal1.dot(orthogonal2)} (should be 0)`)
console.log(`  i • k = ${orthogonal1.dot(orthogonal3)} (should be 0)`)
console.log(`  j • k = ${orthogonal2.dot(orthogonal3)} (should be 0)`)

console.log(`Cross products of basis vectors:`)
console.log(`  i × j = ${orthogonal1.cross(orthogonal2).toString()} (should be k)`)
console.log(`  j × k = ${orthogonal2.cross(orthogonal3).toString()} (should be i)`)
console.log(`  k × i = ${orthogonal3.cross(orthogonal1).toString()} (should be j)`)

// Test 4: 3D Celestial Body Creation
console.log('\n--- Test 4: 3D Celestial Body Creation ---')
const customBody = createCelestialBody3D({
    id: 'test-body',
    name: 'Test Body',
    mass: 1e24,
    position: new Vector3D(1000, 2000, 3000),
    velocity: new Vector3D(10, 20, 30),
    radius: 5000,
    color: '#FF5733'
})

console.log(`Custom 3D Body:`)
console.log(`  ID: ${customBody.id}`)
console.log(`  Name: ${customBody.name}`)
console.log(`  Mass: ${customBody.mass.toExponential()} kg`)
console.log(`  Position: ${customBody.position.toString()}`)
console.log(`  Velocity: ${customBody.velocity.toString()}`)
console.log(`  Radius: ${customBody.radius} m`)

// Test 5: 3D Celestial Body Presets
console.log('\n--- Test 5: 3D Celestial Body Presets ---')
const sun3D = CelestialBodyPresets3D.createSun()
const earth3D = CelestialBodyPresets3D.createEarth()
const mars3D = CelestialBodyPresets3D.createMars()

console.log(`Sun 3D: mass=${sun3D.mass.toExponential()}, pos=${sun3D.position.toString()}`)
console.log(`Earth 3D: mass=${earth3D.mass.toExponential()}, pos=${earth3D.position.toString()}`)
console.log(`Mars 3D: mass=${mars3D.mass.toExponential()}, pos=${mars3D.position.toString()}`)

// Test 6: 3D Gravitational Forces
console.log('\n--- Test 6: 3D Gravitational Forces ---')
const force_sun_earth = calculateGravitationalForceBetweenBodies3D(earth3D, sun3D)
const force_earth_mars = calculateGravitationalForceBetweenBodies3D(mars3D, earth3D)

console.log(`Gravitational force from Sun on Earth:`)
console.log(`  Force vector: ${force_sun_earth.toString()}`)
console.log(`  Force magnitude: ${force_sun_earth.magnitude().toExponential()} N`)

console.log(`Gravitational force from Earth on Mars:`)
console.log(`  Force vector: ${force_earth_mars.toString()}`)
console.log(`  Force magnitude: ${force_earth_mars.magnitude().toExponential()} N`)

// Test 7: 3D Physics Simulation Setup
console.log('\n--- Test 7: 3D Physics Simulation ---')
const bodies3D = [sun3D, earth3D, mars3D]
const simulation3D = new PhysicsSimulation3D(bodies3D)

console.log(`3D Simulation initialized with ${simulation3D.bodies.length} bodies`)
console.log(`Initial total energy: ${simulation3D.getTotalEnergy().toExponential()} J`)

// Test 8: 3D Simulation Step
console.log('\n--- Test 8: 3D Simulation Time Step ---')
console.log('Before step:')
bodies3D.forEach((body, i) => {
    console.log(`  Body ${i}: pos=${body.position.toString()}, vel=${body.velocity.toString()}`)
})

simulation3D.step()

console.log('After 1 day step:')
bodies3D.forEach((body, i) => {
    console.log(`  Body ${i}: pos=${body.position.toString()}, vel=${body.velocity.toString()}`)
})

const finalEnergy = simulation3D.getTotalEnergy()
console.log(`Final total energy: ${finalEnergy.toExponential()} J`)

// Test 9: Angular Momentum Conservation (3D specific)
console.log('\n--- Test 9: Angular Momentum Conservation ---')
const totalAngularMomentum = simulation3D.getTotalAngularMomentum()
console.log(`Total angular momentum: ${totalAngularMomentum.toString()}`)
console.log(`Angular momentum magnitude: ${totalAngularMomentum.magnitude().toExponential()} kg⋅m²/s`)

// Test 10: 3D Collision Detection
console.log('\n--- Test 10: 3D Collision Detection ---')
const asteroid1 = createCelestialBody3D({
    id: 'ast1', 
    name: 'Asteroid 1', 
    mass: 1e12, 
    position: new Vector3D(1000, 0, 0), 
    velocity: new Vector3D(0, 0, 0), 
    radius: 50
})
const asteroid2 = createCelestialBody3D({
    id: 'ast2', 
    name: 'Asteroid 2', 
    mass: 1e12, 
    position: new Vector3D(1050, 0, 0), 
    velocity: new Vector3D(0, 0, 0), 
    radius: 50
})
const asteroid3 = createCelestialBody3D({
    id: 'ast3', 
    name: 'Asteroid 3', 
    mass: 1e12, 
    position: new Vector3D(2000, 0, 0), 
    velocity: new Vector3D(0, 0, 0), 
    radius: 50
})

console.log(`Asteroid 1 and 2 distance: ${asteroid1.position.distanceTo(asteroid2.position)} m`)
console.log(`Combined radii: ${asteroid1.radius + asteroid2.radius} m`)
console.log(`Collision detected: ${areColliding3D(asteroid1, asteroid2)}`)

console.log(`Asteroid 1 and 3 distance: ${asteroid1.position.distanceTo(asteroid3.position)} m`)
console.log(`Collision detected: ${areColliding3D(asteroid1, asteroid3)}`)

console.log('\n=== All 3D Tests Complete! ===')
