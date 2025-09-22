"use strict";
// Main entry point for the Astro Physics Engine library
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CelestialBodyPresets3D = exports.CelestialBodyPresets = exports.SimulationRunner = exports.PhysicsSimulation3D = exports.PhysicsSimulation = exports.Vector3D = exports.Vector2D = exports.GRAVITATIONAL_CONSTANT = exports.version = void 0;
exports.calculateGravitationalForce = calculateGravitationalForce;
exports.calculateGravitationalForceVector = calculateGravitationalForceVector;
exports.calculateGravitationalForceVector3D = calculateGravitationalForceVector3D;
exports.createCelestialBody = createCelestialBody;
exports.createCelestialBody3D = createCelestialBody3D;
exports.calculateGravitationalForceBetweenBodies = calculateGravitationalForceBetweenBodies;
exports.calculateTotalGravitationalForce = calculateTotalGravitationalForce;
exports.calculateGravitationalForceBetweenBodies3D = calculateGravitationalForceBetweenBodies3D;
exports.calculateTotalGravitationalForce3D = calculateTotalGravitationalForce3D;
exports.areColliding = areColliding;
exports.areColliding3D = areColliding3D;
exports.updateBodyEuler = updateBodyEuler;
exports.updateBodyEuler3D = updateBodyEuler3D;
// Export version constant
exports.version = "0.0.0";
/**
 * Physical constants
 */
exports.GRAVITATIONAL_CONSTANT = 6.67430e-11; // m³ kg⁻¹ s⁻²
/**
 * Calculate gravitational force between two masses
 * F = G * m1 * m2 / r²
 * @param m1 - Mass 1 in kg
 * @param m2 - Mass 2 in kg
 * @param distance - Distance between masses in meters
 * @param G - Gravitational constant (optional, uses default if not provided)
 * @returns Gravitational force in Newtons
 */
function calculateGravitationalForce(m1, m2, distance, G) {
    if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
    if (distance === 0) {
        throw new Error("Distance cannot be zero");
    }
    return (G * m1 * m2) / (distance * distance);
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
function calculateGravitationalForceVector(m1, pos1, m2, pos2, G) {
    if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
    var displacement = pos2.sub(pos1); // Vector from pos1 to pos2
    var distance = displacement.magnitude();
    if (distance === 0) {
        return new Vector2D(0, 0); // No force if objects are at same position
    }
    var forceMagnitude = calculateGravitationalForce(m1, m2, distance, G);
    var forceDirection = displacement.normalize();
    return forceDirection.mul(forceMagnitude);
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
function calculateGravitationalForceVector3D(m1, pos1, m2, pos2, G) {
    if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
    var displacement = pos2.sub(pos1); // Vector from pos1 to pos2
    var distance = displacement.magnitude();
    if (distance === 0) {
        return new Vector3D(0, 0, 0); // No force if objects are at same position
    }
    var forceMagnitude = calculateGravitationalForce(m1, m2, distance, G);
    var forceDirection = displacement.normalize();
    return forceDirection.mul(forceMagnitude);
}
/**
 * 2D Vector class for physics calculations
 */
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    /**
     * Add two vectors
     */
    Vector2D.prototype.add = function (v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    };
    /**
     * Subtract two vectors
     */
    Vector2D.prototype.sub = function (v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    };
    /**
     * Multiply vector by scalar
     */
    Vector2D.prototype.mul = function (scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    };
    /**
     * Divide vector by scalar
     */
    Vector2D.prototype.div = function (scalar) {
        if (scalar === 0) {
            throw new Error("Division by zero");
        }
        return new Vector2D(this.x / scalar, this.y / scalar);
    };
    /**
     * Calculate magnitude (length) of the vector
     */
    Vector2D.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    /**
     * Get normalized vector (unit vector in same direction)
     */
    Vector2D.prototype.normalize = function () {
        var mag = this.magnitude();
        if (mag === 0) {
            return new Vector2D(0, 0);
        }
        return this.div(mag);
    };
    /**
     * Calculate dot product with another vector
     */
    Vector2D.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    /**
     * Calculate distance to another vector
     */
    Vector2D.prototype.distanceTo = function (v) {
        return this.sub(v).magnitude();
    };
    /**
     * Create a copy of this vector
     */
    Vector2D.prototype.clone = function () {
        return new Vector2D(this.x, this.y);
    };
    /**
     * Convert to string representation
     */
    Vector2D.prototype.toString = function () {
        return "Vector2D(".concat(this.x, ", ").concat(this.y, ")");
    };
    return Vector2D;
}());
exports.Vector2D = Vector2D;
/**
 * 3D Vector class for physics calculations
 */
var Vector3D = /** @class */ (function () {
    function Vector3D(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * Add two vectors
     */
    Vector3D.prototype.add = function (v) {
        return new Vector3D(this.x + v.x, this.y + v.y, this.z + v.z);
    };
    /**
     * Subtract two vectors
     */
    Vector3D.prototype.sub = function (v) {
        return new Vector3D(this.x - v.x, this.y - v.y, this.z - v.z);
    };
    /**
     * Multiply vector by scalar
     */
    Vector3D.prototype.mul = function (scalar) {
        return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar);
    };
    /**
     * Divide vector by scalar
     */
    Vector3D.prototype.div = function (scalar) {
        if (scalar === 0) {
            throw new Error("Division by zero");
        }
        return new Vector3D(this.x / scalar, this.y / scalar, this.z / scalar);
    };
    /**
     * Calculate magnitude (length) of the vector
     */
    Vector3D.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    /**
     * Get normalized vector (unit vector in same direction)
     */
    Vector3D.prototype.normalize = function () {
        var mag = this.magnitude();
        if (mag === 0) {
            return new Vector3D(0, 0, 0);
        }
        return this.div(mag);
    };
    /**
     * Calculate dot product with another vector
     */
    Vector3D.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
    /**
     * Calculate cross product with another vector
     */
    Vector3D.prototype.cross = function (v) {
        return new Vector3D(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    };
    /**
     * Calculate distance to another vector
     */
    Vector3D.prototype.distanceTo = function (v) {
        return this.sub(v).magnitude();
    };
    /**
     * Create a copy of this vector
     */
    Vector3D.prototype.clone = function () {
        return new Vector3D(this.x, this.y, this.z);
    };
    /**
     * Convert to string representation
     */
    Vector3D.prototype.toString = function () {
        return "Vector3D(".concat(this.x, ", ").concat(this.y, ", ").concat(this.z, ")");
    };
    /**
     * Convert to Vector2D by dropping the Z component
     */
    Vector3D.prototype.toVector2D = function () {
        return new Vector2D(this.x, this.y);
    };
    /**
     * Create Vector3D from Vector2D with optional Z value
     */
    Vector3D.fromVector2D = function (v2d, z) {
        if (z === void 0) { z = 0; }
        return new Vector3D(v2d.x, v2d.y, z);
    };
    return Vector3D;
}());
exports.Vector3D = Vector3D;
/**
 * Create a new celestial body with default values
 * @param params - Partial celestial body parameters
 * @returns Complete celestial body with defaults filled in
 */
function createCelestialBody(params) {
    return __assign({ position: new Vector2D(0, 0), velocity: new Vector2D(0, 0), radius: 1000, color: "#ffffff" }, params);
}
/**
 * Create a new 3D celestial body with default values
 * @param params - Partial 3D celestial body parameters
 * @returns Complete 3D celestial body with defaults filled in
 */
function createCelestialBody3D(params) {
    return __assign({ position: new Vector3D(0, 0, 0), velocity: new Vector3D(0, 0, 0), radius: 1000, color: "#ffffff", inclination: 0 }, params);
}
/**
 * Calculate the gravitational force vector that body2 exerts on body1
 * @param body1 - The body experiencing the force
 * @param body2 - The body exerting the force
 * @param G - Gravitational constant (optional)
 * @returns Force vector acting on body1
 */
function calculateGravitationalForceBetweenBodies(body1, body2, G) {
    if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
    return calculateGravitationalForceVector(body1.mass, body1.position, body2.mass, body2.position, G);
}
/**
 * Calculate the total gravitational force acting on a body from all other bodies
 * @param targetBody - The body to calculate forces for
 * @param otherBodies - Array of other bodies in the system
 * @param G - Gravitational constant (optional)
 * @returns Total force vector acting on the target body
 */
function calculateTotalGravitationalForce(targetBody, otherBodies, G) {
    if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
    var totalForce = new Vector2D(0, 0);
    for (var _i = 0, otherBodies_1 = otherBodies; _i < otherBodies_1.length; _i++) {
        var otherBody = otherBodies_1[_i];
        // Skip self-interaction
        if (otherBody.id === targetBody.id) {
            continue;
        }
        var force = calculateGravitationalForceBetweenBodies(targetBody, otherBody, G);
        totalForce = totalForce.add(force);
    }
    return totalForce;
}
/**
 * Calculate the gravitational force vector that body2 exerts on body1 (3D version)
 * @param body1 - The body experiencing the force
 * @param body2 - The body exerting the force
 * @param G - Gravitational constant (optional)
 * @returns Force vector acting on body1
 */
function calculateGravitationalForceBetweenBodies3D(body1, body2, G) {
    if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
    return calculateGravitationalForceVector3D(body1.mass, body1.position, body2.mass, body2.position, G);
}
/**
 * Calculate the total gravitational force acting on a 3D body from all other bodies
 * @param targetBody - The body to calculate forces for
 * @param otherBodies - Array of other bodies in the system
 * @param G - Gravitational constant (optional)
 * @returns Total force vector acting on the target body
 */
function calculateTotalGravitationalForce3D(targetBody, otherBodies, G) {
    if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
    var totalForce = new Vector3D(0, 0, 0);
    for (var _i = 0, otherBodies_2 = otherBodies; _i < otherBodies_2.length; _i++) {
        var otherBody = otherBodies_2[_i];
        // Skip self-interaction
        if (otherBody.id === targetBody.id) {
            continue;
        }
        var force = calculateGravitationalForceBetweenBodies3D(targetBody, otherBody, G);
        totalForce = totalForce.add(force);
    }
    return totalForce;
}
/**
 * Check if two celestial bodies are colliding based on their radii
 * @param body1 - First body
 * @param body2 - Second body
 * @returns True if the bodies are colliding
 */
function areColliding(body1, body2) {
    var distance = body1.position.distanceTo(body2.position);
    return distance <= (body1.radius + body2.radius);
}
/**
 * Check if two 3D celestial bodies are colliding based on their radii
 * @param body1 - First body
 * @param body2 - Second body
 * @returns True if the bodies are colliding
 */
function areColliding3D(body1, body2) {
    var distance = body1.position.distanceTo(body2.position);
    return distance <= (body1.radius + body2.radius);
}
/**
 * Update a celestial body's position and velocity using Euler integration
 * @param body - The body to update (modified in place)
 * @param force - Total force acting on the body
 * @param dt - Time step in seconds
 */
function updateBodyEuler(body, force, dt) {
    // Calculate acceleration: F = ma => a = F/m
    var acceleration = force.div(body.mass);
    // Update velocity: v = v0 + a*dt
    body.velocity = body.velocity.add(acceleration.mul(dt));
    // Update position: x = x0 + v*dt
    body.position = body.position.add(body.velocity.mul(dt));
}
/**
 * Update a 3D celestial body's position and velocity using Euler integration
 * @param body - The body to update (modified in place)
 * @param force - Total force acting on the body
 * @param dt - Time step in seconds
 */
function updateBodyEuler3D(body, force, dt) {
    // Calculate acceleration: F = ma => a = F/m
    var acceleration = force.div(body.mass);
    // Update velocity: v = v0 + a*dt
    body.velocity = body.velocity.add(acceleration.mul(dt));
    // Update position: x = x0 + v*dt
    body.position = body.position.add(body.velocity.mul(dt));
}
/**
 * Physics simulation class for N-body gravitational systems
 */
var PhysicsSimulation = /** @class */ (function () {
    function PhysicsSimulation(bodies, G, dt) {
        if (bodies === void 0) { bodies = []; }
        if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
        if (dt === void 0) { dt = 1000; }
        this.bodies = bodies;
        this.G = G;
        this.dt = dt; // Default 1000 seconds (16.67 minutes)
        this.time = 0;
        this.isRunning = false;
    }
    /**
     * Add a celestial body to the simulation
     */
    PhysicsSimulation.prototype.addBody = function (body) {
        this.bodies.push(body);
    };
    /**
     * Remove a celestial body from the simulation
     */
    PhysicsSimulation.prototype.removeBody = function (id) {
        var index = this.bodies.findIndex(function (body) { return body.id === id; });
        if (index !== -1) {
            this.bodies.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * Perform one simulation step using Euler integration
     */
    PhysicsSimulation.prototype.step = function () {
        // Calculate forces for all bodies
        var forces = new Map();
        for (var _i = 0, _a = this.bodies; _i < _a.length; _i++) {
            var body = _a[_i];
            var totalForce = calculateTotalGravitationalForce(body, this.bodies, this.G);
            forces.set(body.id, totalForce);
        }
        // Update all bodies using calculated forces
        for (var _b = 0, _c = this.bodies; _b < _c.length; _b++) {
            var body = _c[_b];
            var force = forces.get(body.id) || new Vector2D(0, 0);
            updateBodyEuler(body, force, this.dt);
        }
        this.time += this.dt;
    };
    /**
     * Run simulation for a specified number of steps
     */
    PhysicsSimulation.prototype.simulate = function (steps) {
        for (var i = 0; i < steps; i++) {
            this.step();
        }
    };
    /**
     * Get simulation state as a snapshot
     */
    PhysicsSimulation.prototype.getState = function () {
        return {
            bodies: this.bodies.map(function (body) { return (__assign(__assign({}, body), { position: body.position.clone(), velocity: body.velocity.clone() })); }),
            time: this.time,
            G: this.G,
            dt: this.dt
        };
    };
    /**
     * Reset simulation to initial state
     */
    PhysicsSimulation.prototype.reset = function () {
        this.time = 0;
        this.isRunning = false;
        // Note: This doesn't reset body positions - user should recreate bodies for full reset
    };
    return PhysicsSimulation;
}());
exports.PhysicsSimulation = PhysicsSimulation;
/**
 * Physics simulation class for 3D N-body gravitational systems
 */
var PhysicsSimulation3D = /** @class */ (function () {
    function PhysicsSimulation3D(bodies, G, dt) {
        if (bodies === void 0) { bodies = []; }
        if (G === void 0) { G = exports.GRAVITATIONAL_CONSTANT; }
        if (dt === void 0) { dt = 1000; }
        this.bodies = bodies;
        this.G = G;
        this.dt = dt; // Default 1000 seconds (16.67 minutes)
        this.time = 0;
        this.isRunning = false;
    }
    /**
     * Add a celestial body to the simulation
     */
    PhysicsSimulation3D.prototype.addBody = function (body) {
        this.bodies.push(body);
    };
    /**
     * Remove a celestial body from the simulation
     */
    PhysicsSimulation3D.prototype.removeBody = function (id) {
        var index = this.bodies.findIndex(function (body) { return body.id === id; });
        if (index !== -1) {
            this.bodies.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * Perform one simulation step using Euler integration
     */
    PhysicsSimulation3D.prototype.step = function () {
        // Calculate forces for all bodies
        var forces = new Map();
        for (var _i = 0, _a = this.bodies; _i < _a.length; _i++) {
            var body = _a[_i];
            var totalForce = calculateTotalGravitationalForce3D(body, this.bodies, this.G);
            forces.set(body.id, totalForce);
        }
        // Update all bodies using calculated forces
        for (var _b = 0, _c = this.bodies; _b < _c.length; _b++) {
            var body = _c[_b];
            var force = forces.get(body.id) || new Vector3D(0, 0, 0);
            updateBodyEuler3D(body, force, this.dt);
        }
        this.time += this.dt;
    };
    /**
     * Run simulation for a specified number of steps
     */
    PhysicsSimulation3D.prototype.simulate = function (steps) {
        for (var i = 0; i < steps; i++) {
            this.step();
        }
    };
    /**
     * Get simulation state as a snapshot
     */
    PhysicsSimulation3D.prototype.getState = function () {
        return {
            bodies: this.bodies.map(function (body) {
                var _a;
                return (__assign(__assign({}, body), { position: body.position.clone(), velocity: body.velocity.clone(), angularMomentum: (_a = body.angularMomentum) === null || _a === void 0 ? void 0 : _a.clone() }));
            }),
            time: this.time,
            G: this.G,
            dt: this.dt
        };
    };
    /**
     * Reset simulation to initial state
     */
    PhysicsSimulation3D.prototype.reset = function () {
        this.time = 0;
        this.isRunning = false;
        // Note: This doesn't reset body positions - user should recreate bodies for full reset
    };
    /**
     * Calculate total angular momentum of the system
     */
    PhysicsSimulation3D.prototype.getTotalAngularMomentum = function () {
        var totalAngularMomentum = new Vector3D(0, 0, 0);
        for (var _i = 0, _a = this.bodies; _i < _a.length; _i++) {
            var body = _a[_i];
            // L = r × p (where p = mv)
            var momentum = body.velocity.mul(body.mass);
            var angularMomentum = body.position.cross(momentum);
            totalAngularMomentum = totalAngularMomentum.add(angularMomentum);
        }
        return totalAngularMomentum;
    };
    /**
     * Calculate total energy of the system (kinetic + potential)
     */
    PhysicsSimulation3D.prototype.getTotalEnergy = function () {
        var kineticEnergy = 0;
        var potentialEnergy = 0;
        // Calculate kinetic energy
        for (var _i = 0, _a = this.bodies; _i < _a.length; _i++) {
            var body = _a[_i];
            kineticEnergy += 0.5 * body.mass * Math.pow(body.velocity.magnitude(), 2);
        }
        // Calculate potential energy (sum over all pairs)
        for (var i = 0; i < this.bodies.length; i++) {
            for (var j = i + 1; j < this.bodies.length; j++) {
                var body1 = this.bodies[i];
                var body2 = this.bodies[j];
                var distance = body1.position.distanceTo(body2.position);
                potentialEnergy -= (this.G * body1.mass * body2.mass) / distance;
            }
        }
        return kineticEnergy + potentialEnergy;
    };
    return PhysicsSimulation3D;
}());
exports.PhysicsSimulation3D = PhysicsSimulation3D;
/**
 * Animation loop helper for real-time simulation
 */
var SimulationRunner = /** @class */ (function () {
    function SimulationRunner(simulation, onUpdate) {
        var _this = this;
        this.animationId = null;
        this.lastTime = 0;
        this.animate = function () {
            var currentTime = performance.now();
            var deltaTime = (currentTime - _this.lastTime) / 1000; // Convert to seconds
            // Run simulation step
            _this.simulation.step();
            // Call update callback if provided
            if (_this.onUpdate) {
                var state = _this.simulation.getState();
                _this.onUpdate(__assign(__assign({}, state), { frameTime: deltaTime }));
            }
            _this.lastTime = currentTime;
            _this.animationId = requestAnimationFrame(_this.animate);
        };
        this.simulation = simulation;
        this.onUpdate = onUpdate;
    }
    /**
     * Start the animation loop
     */
    SimulationRunner.prototype.start = function () {
        if (this.animationId !== null)
            return; // Already running
        this.simulation.isRunning = true;
        this.lastTime = performance.now();
        this.animate();
    };
    /**
     * Stop the animation loop
     */
    SimulationRunner.prototype.stop = function () {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.simulation.isRunning = false;
    };
    /**
     * Toggle between start and stop
     */
    SimulationRunner.prototype.toggle = function () {
        if (this.simulation.isRunning) {
            this.stop();
        }
        else {
            this.start();
        }
    };
    return SimulationRunner;
}());
exports.SimulationRunner = SimulationRunner;
/**
 * Create predefined celestial bodies for common scenarios
 */
exports.CelestialBodyPresets = {
    /**
     * Create a Sun-like star
     */
    createSun: function (id, position) {
        if (id === void 0) { id = "sun"; }
        if (position === void 0) { position = new Vector2D(0, 0); }
        return createCelestialBody({
            id: id,
            name: "Sun",
            mass: 1.989e30, // kg
            position: position,
            velocity: new Vector2D(0, 0),
            radius: 6.96e8, // meters
            color: "#FDB813" // Golden yellow
        });
    },
    /**
     * Create an Earth-like planet
     */
    createEarth: function (id, position) {
        if (id === void 0) { id = "earth"; }
        if (position === void 0) { position = new Vector2D(1.496e11, 0); }
        return createCelestialBody({
            id: id,
            name: "Earth",
            mass: 5.972e24, // kg
            position: position,
            velocity: new Vector2D(0, 29780), // Approximate orbital velocity m/s
            radius: 6.371e6, // meters
            color: "#6B93D6" // Earth blue
        });
    },
    /**
     * Create a Moon-like satellite
     */
    createMoon: function (id, earthPosition) {
        if (id === void 0) { id = "moon"; }
        if (earthPosition === void 0) { earthPosition = new Vector2D(1.496e11, 0); }
        return createCelestialBody({
            id: id,
            name: "Moon",
            mass: 7.342e22, // kg
            position: earthPosition.add(new Vector2D(3.844e8, 0)), // 384,400 km from Earth
            velocity: new Vector2D(0, 29780 + 1022), // Earth velocity + lunar orbital velocity
            radius: 1.737e6, // meters
            color: "#C0C0C0" // Silver
        });
    }
};
/**
 * Create predefined 3D celestial bodies for common scenarios
 */
exports.CelestialBodyPresets3D = {
    /**
     * Create a Sun-like star in 3D
     */
    createSun: function (id, position) {
        if (id === void 0) { id = "sun"; }
        if (position === void 0) { position = new Vector3D(0, 0, 0); }
        return createCelestialBody3D({
            id: id,
            name: "Sun",
            mass: 1.989e30, // kg
            position: position,
            velocity: new Vector3D(0, 0, 0),
            radius: 6.96e8, // meters
            color: "#FDB813", // Golden yellow
            inclination: 0
        });
    },
    /**
     * Create an Earth-like planet in 3D with proper orbital inclination
     */
    createEarth: function (id, position) {
        if (id === void 0) { id = "earth"; }
        if (position === void 0) { position = new Vector3D(1.496e11, 0, 0); }
        return createCelestialBody3D({
            id: id,
            name: "Earth",
            mass: 5.972e24, // kg
            position: position,
            velocity: new Vector3D(0, 29780, 0), // Approximate orbital velocity m/s in Y direction
            radius: 6.371e6, // meters
            color: "#6B93D6", // Earth blue
            inclination: 0.0 // Earth's orbital inclination is essentially 0 (by definition)
        });
    },
    /**
     * Create a Moon-like satellite in 3D
     */
    createMoon: function (id, earthPosition) {
        if (id === void 0) { id = "moon"; }
        if (earthPosition === void 0) { earthPosition = new Vector3D(1.496e11, 0, 0); }
        return createCelestialBody3D({
            id: id,
            name: "Moon",
            mass: 7.342e22, // kg
            position: earthPosition.add(new Vector3D(3.844e8, 0, 0)), // 384,400 km from Earth
            velocity: new Vector3D(0, 29780 + 1022, 0), // Earth velocity + lunar orbital velocity
            radius: 1.737e6, // meters
            color: "#C0C0C0", // Silver
            inclination: 0.089 // Moon's orbital inclination ~5.1° in radians
        });
    },
    /**
     * Create Mars with its characteristic orbital inclination
     */
    createMars: function (id, position) {
        if (id === void 0) { id = "mars"; }
        var defaultPos = new Vector3D(2.279e11, 0, 0); // 1.52 AU
        return createCelestialBody3D({
            id: id,
            name: "Mars",
            mass: 6.39e23, // kg
            position: position || defaultPos,
            velocity: new Vector3D(0, 24077, 0), // Mars orbital velocity
            radius: 3.39e6, // meters
            color: "#CD5C5C", // Mars red
            inclination: 0.0323 // Mars orbital inclination ~1.85° in radians
        });
    },
    /**
     * Create Jupiter with its massive presence
     */
    createJupiter: function (id, position) {
        if (id === void 0) { id = "jupiter"; }
        var defaultPos = new Vector3D(7.786e11, 0, 0); // 5.2 AU
        return createCelestialBody3D({
            id: id,
            name: "Jupiter",
            mass: 1.898e27, // kg
            position: position || defaultPos,
            velocity: new Vector3D(0, 13070, 0), // Jupiter orbital velocity
            radius: 6.99e7, // meters
            color: "#D2691E", // Orange/brown
            inclination: 0.0227 // Jupiter orbital inclination ~1.3° in radians
        });
    },
    /**
     * Create a comet with highly eccentric orbit and inclination
     */
    createComet: function (id, position) {
        if (id === void 0) { id = "comet"; }
        var defaultPos = new Vector3D(5e11, 0, 2e11); // Inclined orbit
        return createCelestialBody3D({
            id: id,
            name: "Comet",
            mass: 1e13, // kg (small mass)
            position: position || defaultPos,
            velocity: new Vector3D(-10000, 20000, 5000), // Complex 3D velocity
            radius: 5e3, // meters (small radius)
            color: "#87CEEB", // Sky blue
            inclination: 0.785 // 45° inclination
        });
    },
    /**
     * Create a complete solar system with proper 3D positioning
     */
    createSolarSystem: function () {
        return [
            exports.CelestialBodyPresets3D.createSun(),
            exports.CelestialBodyPresets3D.createEarth(),
            exports.CelestialBodyPresets3D.createMars(),
            exports.CelestialBodyPresets3D.createJupiter()
        ];
    }
};
