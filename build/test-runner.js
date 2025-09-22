// Test Runner - Runs all test files in sequence
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tests = [
    'test-math.js',
    'test-celestial-bodies.js',
    'test-simulation.js',
    'test-3d-comprehensive.js'
];
console.log('🚀 Running Astro Physics Engine Test Suite');
console.log('='.repeat(50));
let passedTests = 0;
let totalTests = tests.length;
for (let i = 0; i < tests.length; i++) {
    const testFile = tests[i];
    console.log(`\n📋 Test ${i + 1}/${totalTests}: ${testFile}`);
    console.log('-'.repeat(30));
    try {
        execSync(`node ${join(__dirname, testFile)}`, {
            stdio: 'inherit',
            cwd: process.cwd()
        });
        console.log(`✅ ${testFile} - PASSED`);
        passedTests++;
    }
    catch (error) {
        console.error(`❌ ${testFile} - FAILED`);
        console.error(error.message);
    }
}
console.log('\n' + '='.repeat(50));
console.log(`📊 Test Results: ${passedTests}/${totalTests} passed`);
if (passedTests === totalTests) {
    console.log('🎉 All tests passed!');
}
else {
    console.log(`⚠️  ${totalTests - passedTests} test(s) failed`);
    process.exit(1);
}
