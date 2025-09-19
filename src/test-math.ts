// Test file for the math utilities
import { 
  Vector2D, 
  calculateGravitationalForce, 
  calculateGravitationalForceVector
} from './main.js'

// Test Vector2D operations
console.log('=== Vector2D Tests ===')
const v1 = new Vector2D(3, 4)
const v2 = new Vector2D(1, 2)

console.log(`v1: ${v1.toString()}`)
console.log(`v2: ${v2.toString()}`)
console.log(`v1 + v2: ${v1.add(v2).toString()}`)
console.log(`v1 - v2: ${v1.sub(v2).toString()}`)
console.log(`v1 * 2: ${v1.mul(2).toString()}`)
console.log(`v1 / 2: ${v1.div(2).toString()}`)
console.log(`v1 magnitude: ${v1.magnitude()}`)
console.log(`v1 normalized: ${v1.normalize().toString()}`)
console.log(`v1 dot v2: ${v1.dot(v2)}`)
console.log(`distance v1 to v2: ${v1.distanceTo(v2)}`)

console.log('\n=== Gravitational Force Tests ===')
// Test with simplified masses for demonstration
const mass1 = 1000 // kg
const mass2 = 2000 // kg
const distance = 100 // m

const force = calculateGravitationalForce(mass1, mass2, distance)
console.log(`Force between ${mass1}kg and ${mass2}kg at ${distance}m: ${force.toExponential()} N`)

// Test force vector calculation
const pos1 = new Vector2D(0, 0)
const pos2 = new Vector2D(distance, 0)
const forceVector = calculateGravitationalForceVector(mass1, pos1, mass2, pos2)
console.log(`Force vector on mass1: ${forceVector.toString()}`)
console.log(`Force magnitude: ${forceVector.magnitude().toExponential()} N`)

// Test with Earth-like scenario (scaled down for easier numbers)
console.log('\n=== Earth-Moon Like System (Scaled) ===')
const earthMassScaled = 5.972e6 // Much smaller for demo
const moonMassScaled = 7.342e4 
const earthMoonDistanceScaled = 3.844e5 // meters

const earthPos = new Vector2D(0, 0)
const moonPos = new Vector2D(earthMoonDistanceScaled, 0)
const earthMoonForce = calculateGravitationalForceVector(
  earthMassScaled, 
  earthPos, 
  moonMassScaled, 
  moonPos
)

console.log(`Earth position: ${earthPos.toString()}`)
console.log(`Moon position: ${moonPos.toString()}`)
console.log(`Force on Earth from Moon: ${earthMoonForce.toString()}`)
console.log(`Force magnitude: ${earthMoonForce.magnitude().toExponential()} N`)
