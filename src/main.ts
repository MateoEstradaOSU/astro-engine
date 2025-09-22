// Main entry point for the Astro Physics Engine library

// Export version constant
export const version = "0.0.0"

/**
 * Physical constants
 */
export const GRAVITATIONAL_CONSTANT = 6.67430e-11 // m³ kg⁻¹ s⁻²

/**
 * Calculate gravitational force between two masses
 * F = G * m1 * m2 / r²
 * @param m1 - Mass 1 in kg
 * @param m2 - Mass 2 in kg  
 * @param distance - Distance between masses in meters
 * @param G - Gravitational constant (optional, uses default if not provided)
 * @returns Gravitational force in Newtons
 */
export function calculateGravitationalForce(
  m1: number, 
  m2: number, 
  distance: number, 
  G: number = GRAVITATIONAL_CONSTANT
): number {
  if (distance === 0) {
    throw new Error("Distance cannot be zero")
  }
  return (G * m1 * m2) / (distance * distance)
}

/**
 * Calculate gravitational force vector between two positions with masses
 * Returns force vector acting on object at pos1 due to object at pos2
 * @param m1 - Mass of object 1 in kg
 * @param pos1 - Position of object 1
 * @param m2 - Mass of object 2 in kg
 * @param pos2 - Position of object 2
 * @param G - Gravitational constant (optional)
 * @returns Force vector acting on object 1
 */
export function calculateGravitationalForceVector(
  m1: number,
  pos1: Vector2D,
  m2: number,
  pos2: Vector2D,
  G: number = GRAVITATIONAL_CONSTANT
): Vector2D {
  const displacement = pos2.sub(pos1) // Vector from pos1 to pos2
  const distance = displacement.magnitude()
  
  if (distance === 0) {
    return new Vector2D(0, 0) // No force if objects are at same position
  }
  
  const forceMagnitude = calculateGravitationalForce(m1, m2, distance, G)
  const forceDirection = displacement.normalize()
  
  return forceDirection.mul(forceMagnitude)
}

/**
 * Calculate gravitational force vector between two 3D positions with masses
 * Returns force vector acting on object at pos1 due to object at pos2
 * @param m1 - Mass of object 1 in kg
 * @param pos1 - Position of object 1 in 3D space
 * @param m2 - Mass of object 2 in kg
 * @param pos2 - Position of object 2 in 3D space
 * @param G - Gravitational constant (optional)
 * @returns Force vector acting on object 1
 */
export function calculateGravitationalForceVector3D(
  m1: number,
  pos1: Vector3D,
  m2: number,
  pos2: Vector3D,
  G: number = GRAVITATIONAL_CONSTANT
): Vector3D {
  const displacement = pos2.sub(pos1) // Vector from pos1 to pos2
  const distance = displacement.magnitude()
  
  if (distance === 0) {
    return new Vector3D(0, 0, 0) // No force if objects are at same position
  }
  
  const forceMagnitude = calculateGravitationalForce(m1, m2, distance, G)
  const forceDirection = displacement.normalize()
  
  return forceDirection.mul(forceMagnitude)
}

/**
 * 2D Vector class for physics calculations
 */
export class Vector2D {
  public x: number
  public y: number
  
  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }
  
  /**
   * Add two vectors
   */
  add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y)
  }
  
  /**
   * Subtract two vectors
   */
  sub(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y)
  }
  
  /**
   * Multiply vector by scalar
   */
  mul(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar)
  }
  
  /**
   * Divide vector by scalar
   */
  div(scalar: number): Vector2D {
    if (scalar === 0) {
      throw new Error("Division by zero")
    }
    return new Vector2D(this.x / scalar, this.y / scalar)
  }
  
  /**
   * Calculate magnitude (length) of the vector
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  
  /**
   * Get normalized vector (unit vector in same direction)
   */
  normalize(): Vector2D {
    const mag = this.magnitude()
    if (mag === 0) {
      return new Vector2D(0, 0)
    }
    return this.div(mag)
  }
  
  /**
   * Calculate dot product with another vector
   */
  dot(v: Vector2D): number {
    return this.x * v.x + this.y * v.y
  }
  
  /**
   * Calculate distance to another vector
   */
  distanceTo(v: Vector2D): number {
    return this.sub(v).magnitude()
  }
  
  /**
   * Create a copy of this vector
   */
  clone(): Vector2D {
    return new Vector2D(this.x, this.y)
  }
  
  /**
   * Convert to string representation
   */
  toString(): string {
    return `Vector2D(${this.x}, ${this.y})`
  }
}

/**
 * 3D Vector class for physics calculations
 */
export class Vector3D {
  public x: number
  public y: number
  public z: number
  
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x
    this.y = y
    this.z = z
  }
  
  /**
   * Add two vectors
   */
  add(v: Vector3D): Vector3D {
    return new Vector3D(this.x + v.x, this.y + v.y, this.z + v.z)
  }
  
  /**
   * Subtract two vectors
   */
  sub(v: Vector3D): Vector3D {
    return new Vector3D(this.x - v.x, this.y - v.y, this.z - v.z)
  }
  
  /**
   * Multiply vector by scalar
   */
  mul(scalar: number): Vector3D {
    return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar)
  }
  
  /**
   * Divide vector by scalar
   */
  div(scalar: number): Vector3D {
    if (scalar === 0) {
      throw new Error("Division by zero")
    }
    return new Vector3D(this.x / scalar, this.y / scalar, this.z / scalar)
  }
  
  /**
   * Calculate magnitude (length) of the vector
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }
  
  /**
   * Get normalized vector (unit vector in same direction)
   */
  normalize(): Vector3D {
    const mag = this.magnitude()
    if (mag === 0) {
      return new Vector3D(0, 0, 0)
    }
    return this.div(mag)
  }
  
  /**
   * Calculate dot product with another vector
   */
  dot(v: Vector3D): number {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }
  
  /**
   * Calculate cross product with another vector
   */
  cross(v: Vector3D): Vector3D {
    return new Vector3D(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    )
  }
  
  /**
   * Calculate distance to another vector
   */
  distanceTo(v: Vector3D): number {
    return this.sub(v).magnitude()
  }
  
  /**
   * Create a copy of this vector
   */
  clone(): Vector3D {
    return new Vector3D(this.x, this.y, this.z)
  }
  
  /**
   * Convert to string representation
   */
  toString(): string {
    return `Vector3D(${this.x}, ${this.y}, ${this.z})`
  }
  
  /**
   * Convert to Vector2D by dropping the Z component
   */
  toVector2D(): Vector2D {
    return new Vector2D(this.x, this.y)
  }
  
  /**
   * Create Vector3D from Vector2D with optional Z value
   */
  static fromVector2D(v2d: Vector2D, z: number = 0): Vector3D {
    return new Vector3D(v2d.x, v2d.y, z)
  }
}

/**
 * Interface representing a celestial body in the simulation
 */
export interface CelestialBody {
  /** Unique identifier for the body */
  id: string
  /** Display name of the body */
  name: string
  /** Mass in kilograms */
  mass: number
  /** Current position vector */
  position: Vector2D
  /** Current velocity vector */
  velocity: Vector2D
  /** Radius for collision detection and rendering (in meters) */
  radius: number
  /** Color for rendering (hex string like "#ff0000" or CSS color name) */
  color: string
}

/**
 * Interface representing a 3D celestial body in the simulation
 */
export interface CelestialBody3D {
  /** Unique identifier for the body */
  id: string
  /** Display name of the body */
  name: string
  /** Mass in kilograms */
  mass: number
  /** Current position vector in 3D space */
  position: Vector3D
  /** Current velocity vector in 3D space */
  velocity: Vector3D
  /** Radius for collision detection and rendering (in meters) */
  radius: number
  /** Color for rendering (hex string like "#ff0000" or CSS color name) */
  color: string
  /** Optional orbital inclination in radians */
  inclination?: number
  /** Optional angular momentum vector */
  angularMomentum?: Vector3D
}

/**
 * Create a new celestial body with default values
 * @param params - Partial celestial body parameters
 * @returns Complete celestial body with defaults filled in
 */
export function createCelestialBody(params: Partial<CelestialBody> & { 
  id: string, 
  name: string, 
  mass: number 
}): CelestialBody {
  return {
    position: new Vector2D(0, 0),
    velocity: new Vector2D(0, 0),
    radius: 1000, // Default 1km radius
    color: "#ffffff", // Default white color
    ...params
  }
}

/**
 * Create a new 3D celestial body with default values
 * @param params - Partial 3D celestial body parameters
 * @returns Complete 3D celestial body with defaults filled in
 */
export function createCelestialBody3D(params: Partial<CelestialBody3D> & { 
  id: string, 
  name: string, 
  mass: number 
}): CelestialBody3D {
  return {
    position: new Vector3D(0, 0, 0),
    velocity: new Vector3D(0, 0, 0),
    radius: 1000, // Default 1km radius
    color: "#ffffff", // Default white color
    inclination: 0, // Default no inclination
    ...params
  }
}

/**
 * Calculate the gravitational force vector that body2 exerts on body1
 * @param body1 - The body experiencing the force
 * @param body2 - The body exerting the force
 * @param G - Gravitational constant (optional)
 * @returns Force vector acting on body1
 */
export function calculateGravitationalForceBetweenBodies(
  body1: CelestialBody,
  body2: CelestialBody,
  G: number = GRAVITATIONAL_CONSTANT
): Vector2D {
  return calculateGravitationalForceVector(
    body1.mass,
    body1.position,
    body2.mass,
    body2.position,
    G
  )
}

/**
 * Calculate the total gravitational force acting on a body from all other bodies
 * @param targetBody - The body to calculate forces for
 * @param otherBodies - Array of other bodies in the system
 * @param G - Gravitational constant (optional)
 * @returns Total force vector acting on the target body
 */
export function calculateTotalGravitationalForce(
  targetBody: CelestialBody,
  otherBodies: CelestialBody[],
  G: number = GRAVITATIONAL_CONSTANT
): Vector2D {
  let totalForce = new Vector2D(0, 0)
  
  for (const otherBody of otherBodies) {
    // Skip self-interaction
    if (otherBody.id === targetBody.id) {
      continue
    }
    
    const force = calculateGravitationalForceBetweenBodies(targetBody, otherBody, G)
    totalForce = totalForce.add(force)
  }
  
  return totalForce
}

/**
 * Calculate the gravitational force vector that body2 exerts on body1 (3D version)
 * @param body1 - The body experiencing the force
 * @param body2 - The body exerting the force
 * @param G - Gravitational constant (optional)
 * @returns Force vector acting on body1
 */
export function calculateGravitationalForceBetweenBodies3D(
  body1: CelestialBody3D,
  body2: CelestialBody3D,
  G: number = GRAVITATIONAL_CONSTANT
): Vector3D {
  return calculateGravitationalForceVector3D(
    body1.mass,
    body1.position,
    body2.mass,
    body2.position,
    G
  )
}

/**
 * Calculate the total gravitational force acting on a 3D body from all other bodies
 * @param targetBody - The body to calculate forces for
 * @param otherBodies - Array of other bodies in the system
 * @param G - Gravitational constant (optional)
 * @returns Total force vector acting on the target body
 */
export function calculateTotalGravitationalForce3D(
  targetBody: CelestialBody3D,
  otherBodies: CelestialBody3D[],
  G: number = GRAVITATIONAL_CONSTANT
): Vector3D {
  let totalForce = new Vector3D(0, 0, 0)
  
  for (const otherBody of otherBodies) {
    // Skip self-interaction
    if (otherBody.id === targetBody.id) {
      continue
    }
    
    const force = calculateGravitationalForceBetweenBodies3D(targetBody, otherBody, G)
    totalForce = totalForce.add(force)
  }
  
  return totalForce
}

/**
 * Check if two celestial bodies are colliding based on their radii
 * @param body1 - First body
 * @param body2 - Second body
 * @returns True if the bodies are colliding
 */
export function areColliding(body1: CelestialBody, body2: CelestialBody): boolean {
  const distance = body1.position.distanceTo(body2.position)
  return distance <= (body1.radius + body2.radius)
}

/**
 * Check if two 3D celestial bodies are colliding based on their radii
 * @param body1 - First body
 * @param body2 - Second body
 * @returns True if the bodies are colliding
 */
export function areColliding3D(body1: CelestialBody3D, body2: CelestialBody3D): boolean {
  const distance = body1.position.distanceTo(body2.position)
  return distance <= (body1.radius + body2.radius)
}

/**
 * Update a celestial body's position and velocity using Euler integration
 * @param body - The body to update (modified in place)
 * @param force - Total force acting on the body
 * @param dt - Time step in seconds
 */
export function updateBodyEuler(body: CelestialBody, force: Vector2D, dt: number): void {
  // Calculate acceleration: F = ma => a = F/m
  const acceleration = force.div(body.mass)
  
  // Update velocity: v = v0 + a*dt
  body.velocity = body.velocity.add(acceleration.mul(dt))
  
  // Update position: x = x0 + v*dt
  body.position = body.position.add(body.velocity.mul(dt))
}

/**
 * Update a 3D celestial body's position and velocity using Euler integration
 * @param body - The body to update (modified in place)
 * @param force - Total force acting on the body
 * @param dt - Time step in seconds
 */
export function updateBodyEuler3D(body: CelestialBody3D, force: Vector3D, dt: number): void {
  // Calculate acceleration: F = ma => a = F/m
  const acceleration = force.div(body.mass)
  
  // Update velocity: v = v0 + a*dt
  body.velocity = body.velocity.add(acceleration.mul(dt))
  
  // Update position: x = x0 + v*dt
  body.position = body.position.add(body.velocity.mul(dt))
}

/**
 * Physics simulation class for N-body gravitational systems
 */
export class PhysicsSimulation {
  public bodies: CelestialBody[]
  public G: number
  public dt: number
  public time: number
  public isRunning: boolean
  
  constructor(bodies: CelestialBody[] = [], G: number = GRAVITATIONAL_CONSTANT, dt: number = 1000) {
    this.bodies = bodies
    this.G = G
    this.dt = dt // Default 1000 seconds (16.67 minutes)
    this.time = 0
    this.isRunning = false
  }
  
  /**
   * Add a celestial body to the simulation
   */
  addBody(body: CelestialBody): void {
    this.bodies.push(body)
  }
  
  /**
   * Remove a celestial body from the simulation
   */
  removeBody(id: string): boolean {
    const index = this.bodies.findIndex(body => body.id === id)
    if (index !== -1) {
      this.bodies.splice(index, 1)
      return true
    }
    return false
  }
  
  /**
   * Perform one simulation step using Euler integration
   */
  step(): void {
    // Calculate forces for all bodies
    const forces: Map<string, Vector2D> = new Map()
    
    for (const body of this.bodies) {
      const totalForce = calculateTotalGravitationalForce(body, this.bodies, this.G)
      forces.set(body.id, totalForce)
    }
    
    // Update all bodies using calculated forces
    for (const body of this.bodies) {
      const force = forces.get(body.id) || new Vector2D(0, 0)
      updateBodyEuler(body, force, this.dt)
    }
    
    this.time += this.dt
  }
  
  /**
   * Run simulation for a specified number of steps
   */
  simulate(steps: number): void {
    for (let i = 0; i < steps; i++) {
      this.step()
    }
  }
  
  /**
   * Get simulation state as a snapshot
   */
  getState(): {
    bodies: CelestialBody[]
    time: number
    G: number
    dt: number
  } {
    return {
      bodies: this.bodies.map(body => ({
        ...body,
        position: body.position.clone(),
        velocity: body.velocity.clone()
      })),
      time: this.time,
      G: this.G,
      dt: this.dt
    }
  }
  
  /**
   * Reset simulation to initial state
   */
  reset(): void {
    this.time = 0
    this.isRunning = false
    // Note: This doesn't reset body positions - user should recreate bodies for full reset
  }
}

/**
 * Physics simulation class for 3D N-body gravitational systems
 */
export class PhysicsSimulation3D {
  public bodies: CelestialBody3D[]
  public G: number
  public dt: number
  public time: number
  public isRunning: boolean
  
  constructor(bodies: CelestialBody3D[] = [], G: number = GRAVITATIONAL_CONSTANT, dt: number = 1000) {
    this.bodies = bodies
    this.G = G
    this.dt = dt // Default 1000 seconds (16.67 minutes)
    this.time = 0
    this.isRunning = false
  }
  
  /**
   * Add a celestial body to the simulation
   */
  addBody(body: CelestialBody3D): void {
    this.bodies.push(body)
  }
  
  /**
   * Remove a celestial body from the simulation
   */
  removeBody(id: string): boolean {
    const index = this.bodies.findIndex(body => body.id === id)
    if (index !== -1) {
      this.bodies.splice(index, 1)
      return true
    }
    return false
  }
  
  /**
   * Perform one simulation step using Euler integration
   */
  step(): void {
    // Calculate forces for all bodies
    const forces: Map<string, Vector3D> = new Map()
    
    for (const body of this.bodies) {
      const totalForce = calculateTotalGravitationalForce3D(body, this.bodies, this.G)
      forces.set(body.id, totalForce)
    }
    
    // Update all bodies using calculated forces
    for (const body of this.bodies) {
      const force = forces.get(body.id) || new Vector3D(0, 0, 0)
      updateBodyEuler3D(body, force, this.dt)
    }
    
    this.time += this.dt
  }
  
  /**
   * Run simulation for a specified number of steps
   */
  simulate(steps: number): void {
    for (let i = 0; i < steps; i++) {
      this.step()
    }
  }
  
  /**
   * Get simulation state as a snapshot
   */
  getState(): {
    bodies: CelestialBody3D[]
    time: number
    G: number
    dt: number
  } {
    return {
      bodies: this.bodies.map(body => ({
        ...body,
        position: body.position.clone(),
        velocity: body.velocity.clone(),
        angularMomentum: body.angularMomentum?.clone()
      })),
      time: this.time,
      G: this.G,
      dt: this.dt
    }
  }
  
  /**
   * Reset simulation to initial state
   */
  reset(): void {
    this.time = 0
    this.isRunning = false
    // Note: This doesn't reset body positions - user should recreate bodies for full reset
  }
  
  /**
   * Calculate total angular momentum of the system
   */
  getTotalAngularMomentum(): Vector3D {
    let totalAngularMomentum = new Vector3D(0, 0, 0)
    
    for (const body of this.bodies) {
      // L = r × p (where p = mv)
      const momentum = body.velocity.mul(body.mass)
      const angularMomentum = body.position.cross(momentum)
      totalAngularMomentum = totalAngularMomentum.add(angularMomentum)
    }
    
    return totalAngularMomentum
  }
  
  /**
   * Calculate total energy of the system (kinetic + potential)
   */
  getTotalEnergy(): number {
    let kineticEnergy = 0
    let potentialEnergy = 0
    
    // Calculate kinetic energy
    for (const body of this.bodies) {
      kineticEnergy += 0.5 * body.mass * body.velocity.magnitude() ** 2
    }
    
    // Calculate potential energy (sum over all pairs)
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const body1 = this.bodies[i]
        const body2 = this.bodies[j]
        const distance = body1.position.distanceTo(body2.position)
        potentialEnergy -= (this.G * body1.mass * body2.mass) / distance
      }
    }
    
    return kineticEnergy + potentialEnergy
  }
}

/**
 * Animation loop helper for real-time simulation
 */
export class SimulationRunner {
  private simulation: PhysicsSimulation
  private animationId: number | null = null
  private onUpdate?: (state: any) => void
  private lastTime: number = 0
  
  constructor(simulation: PhysicsSimulation, onUpdate?: (state: any) => void) {
    this.simulation = simulation
    this.onUpdate = onUpdate
  }
  
  /**
   * Start the animation loop
   */
  start(): void {
    if (this.animationId !== null) return // Already running
    
    this.simulation.isRunning = true
    this.lastTime = performance.now()
    this.animate()
  }
  
  /**
   * Stop the animation loop
   */
  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    this.simulation.isRunning = false
  }
  
  /**
   * Toggle between start and stop
   */
  toggle(): void {
    if (this.simulation.isRunning) {
      this.stop()
    } else {
      this.start()
    }
  }
  
  private animate = (): void => {
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000 // Convert to seconds
    
    // Run simulation step
    this.simulation.step()
    
    // Call update callback if provided
    if (this.onUpdate) {
      const state = this.simulation.getState()
      this.onUpdate({ ...state, frameTime: deltaTime })
    }
    
    this.lastTime = currentTime
    this.animationId = requestAnimationFrame(this.animate)
  }
}

/**
 * Create predefined celestial bodies for common scenarios
 */
export const CelestialBodyPresets = {
  /**
   * Create a Sun-like star
   */
  createSun: (id: string = "sun", position: Vector2D = new Vector2D(0, 0)): CelestialBody => 
    createCelestialBody({
      id,
      name: "Sun",
      mass: 1.989e30, // kg
      position,
      velocity: new Vector2D(0, 0),
      radius: 6.96e8, // meters
      color: "#FDB813" // Golden yellow
    }),

  /**
   * Create an Earth-like planet
   */
  createEarth: (id: string = "earth", position: Vector2D = new Vector2D(1.496e11, 0)): CelestialBody => 
    createCelestialBody({
      id,
      name: "Earth",
      mass: 5.972e24, // kg
      position,
      velocity: new Vector2D(0, 29780), // Approximate orbital velocity m/s
      radius: 6.371e6, // meters
      color: "#6B93D6" // Earth blue
    }),

  /**
   * Create a Moon-like satellite
   */
  createMoon: (id: string = "moon", earthPosition: Vector2D = new Vector2D(1.496e11, 0)): CelestialBody => 
    createCelestialBody({
      id,
      name: "Moon",
      mass: 7.342e22, // kg
      position: earthPosition.add(new Vector2D(3.844e8, 0)), // 384,400 km from Earth
      velocity: new Vector2D(0, 29780 + 1022), // Earth velocity + lunar orbital velocity
      radius: 1.737e6, // meters
      color: "#C0C0C0" // Silver
    })
}

/**
 * Create predefined 3D celestial bodies for common scenarios
 */
export const CelestialBodyPresets3D = {
  /**
   * Create a Sun-like star in 3D
   */
  createSun: (id: string = "sun", position: Vector3D = new Vector3D(0, 0, 0)): CelestialBody3D => 
    createCelestialBody3D({
      id,
      name: "Sun",
      mass: 1.989e30, // kg
      position,
      velocity: new Vector3D(0, 0, 0),
      radius: 6.96e8, // meters
      color: "#FDB813", // Golden yellow
      inclination: 0
    }),

  /**
   * Create an Earth-like planet in 3D with proper orbital inclination
   */
  createEarth: (id: string = "earth", position: Vector3D = new Vector3D(1.496e11, 0, 0)): CelestialBody3D => 
    createCelestialBody3D({
      id,
      name: "Earth",
      mass: 5.972e24, // kg
      position,
      velocity: new Vector3D(0, 29780, 0), // Approximate orbital velocity m/s in Y direction
      radius: 6.371e6, // meters
      color: "#6B93D6", // Earth blue
      inclination: 0.0 // Earth's orbital inclination is essentially 0 (by definition)
    }),

  /**
   * Create a Moon-like satellite in 3D
   */
  createMoon: (id: string = "moon", earthPosition: Vector3D = new Vector3D(1.496e11, 0, 0)): CelestialBody3D => 
    createCelestialBody3D({
      id,
      name: "Moon",
      mass: 7.342e22, // kg
      position: earthPosition.add(new Vector3D(3.844e8, 0, 0)), // 384,400 km from Earth
      velocity: new Vector3D(0, 29780 + 1022, 0), // Earth velocity + lunar orbital velocity
      radius: 1.737e6, // meters
      color: "#C0C0C0", // Silver
      inclination: 0.089 // Moon's orbital inclination ~5.1° in radians
    }),

  /**
   * Create Mars with its characteristic orbital inclination
   */
  createMars: (id: string = "mars", position?: Vector3D): CelestialBody3D => {
    const defaultPos = new Vector3D(2.279e11, 0, 0) // 1.52 AU
    return createCelestialBody3D({
      id,
      name: "Mars",
      mass: 6.39e23, // kg
      position: position || defaultPos,
      velocity: new Vector3D(0, 24077, 0), // Mars orbital velocity
      radius: 3.39e6, // meters
      color: "#CD5C5C", // Mars red
      inclination: 0.0323 // Mars orbital inclination ~1.85° in radians
    })
  },

  /**
   * Create Jupiter with its massive presence
   */
  createJupiter: (id: string = "jupiter", position?: Vector3D): CelestialBody3D => {
    const defaultPos = new Vector3D(7.786e11, 0, 0) // 5.2 AU
    return createCelestialBody3D({
      id,
      name: "Jupiter",
      mass: 1.898e27, // kg
      position: position || defaultPos,
      velocity: new Vector3D(0, 13070, 0), // Jupiter orbital velocity
      radius: 6.99e7, // meters
      color: "#D2691E", // Orange/brown
      inclination: 0.0227 // Jupiter orbital inclination ~1.3° in radians
    })
  },

  /**
   * Create a comet with highly eccentric orbit and inclination
   */
  createComet: (id: string = "comet", position?: Vector3D): CelestialBody3D => {
    const defaultPos = new Vector3D(5e11, 0, 2e11) // Inclined orbit
    return createCelestialBody3D({
      id,
      name: "Comet",
      mass: 1e13, // kg (small mass)
      position: position || defaultPos,
      velocity: new Vector3D(-10000, 20000, 5000), // Complex 3D velocity
      radius: 5e3, // meters (small radius)
      color: "#87CEEB", // Sky blue
      inclination: 0.785 // 45° inclination
    })
  },

  /**
   * Create a complete solar system with proper 3D positioning
   */
  createSolarSystem: (): CelestialBody3D[] => {
    return [
      CelestialBodyPresets3D.createSun(),
      CelestialBodyPresets3D.createEarth(),
      CelestialBodyPresets3D.createMars(),
      CelestialBodyPresets3D.createJupiter()
    ]
  }
}
