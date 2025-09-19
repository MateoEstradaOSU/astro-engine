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
