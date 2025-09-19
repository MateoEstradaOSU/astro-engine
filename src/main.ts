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
