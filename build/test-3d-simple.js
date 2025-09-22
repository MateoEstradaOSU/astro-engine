"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Simplified 3D functionality test
var main_js_1 = require("./main.js");
console.log('=== 3D Physics Engine - Core Tests ===');
// Test 1: Vector3D Operations
console.log('\n--- Test 1: Vector3D Operations ---');
var v1 = new main_js_1.Vector3D(3, 4, 5);
var v2 = new main_js_1.Vector3D(1, 2, 3);
console.log("v1: ".concat(v1.toString()));
console.log("v2: ".concat(v2.toString()));
console.log("v1 + v2: ".concat(v1.add(v2).toString()));
console.log("v1 - v2: ".concat(v1.sub(v2).toString()));
console.log("v1 * 2: ".concat(v1.mul(2).toString()));
console.log("v1 magnitude: ".concat(v1.magnitude()));
console.log("v1 normalized: ".concat(v1.normalize().toString()));
console.log("v1 \u2022 v2 (dot): ".concat(v1.dot(v2)));
console.log("v1 \u00D7 v2 (cross): ".concat(v1.cross(v2).toString()));
// Test 2: 3D Celestial Body Presets
console.log('\n--- Test 2: 3D Celestial Body Presets ---');
var sun3D = main_js_1.CelestialBodyPresets3D.createSun();
var earth3D = main_js_1.CelestialBodyPresets3D.createEarth();
var mars3D = main_js_1.CelestialBodyPresets3D.createMars();
console.log("Sun 3D: mass=".concat(sun3D.mass.toExponential(), ", position=").concat(sun3D.position.toString()));
console.log("Earth 3D: mass=".concat(earth3D.mass.toExponential(), ", position=").concat(earth3D.position.toString()));
console.log("Mars 3D: mass=".concat(mars3D.mass.toExponential(), ", position=").concat(mars3D.position.toString()));
// Test 3: 3D Physics Simulation
console.log('\n--- Test 3: 3D Physics Simulation ---');
var simulation = new main_js_1.PhysicsSimulation3D([sun3D, earth3D, mars3D]);
console.log("Initial total energy: ".concat(simulation.getTotalEnergy().toExponential(), " J"));
console.log("Initial angular momentum: ".concat(simulation.getTotalAngularMomentum().magnitude().toExponential(), " kg\u22C5m\u00B2/s"));
// Run a few simulation steps
for (var i = 0; i < 5; i++) {
    simulation.step(); // Advance one step
    console.log("Step ".concat(i + 1, " - Energy: ").concat(simulation.getTotalEnergy().toExponential(), " J"));
}
console.log('\n✅ All 3D tests completed successfully!');
