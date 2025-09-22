#!/bin/bash

echo "🚀 Running Astro Physics Engine Test Suite"
echo "=================================================="

tests=("test-math.js" "test-celestial-bodies.js" "test-simulation.js" "test-3d-comprehensive.js")
passed=0
total=${#tests[@]}

for i in "${!tests[@]}"; do
    test_file="${tests[$i]}"
    test_num=$((i + 1))
    
    echo ""
    echo "📋 Test $test_num/$total: $test_file"
    echo "------------------------------"
    
    if cd "$(dirname "$0")/.." && node "build/$test_file"; then
        echo "✅ $test_file - PASSED"
        ((passed++))
    else
        echo "❌ $test_file - FAILED"
    fi
done

echo ""
echo "=================================================="
echo "📊 Test Results: $passed/$total passed"

if [ "$passed" -eq "$total" ]; then
    echo "🎉 All tests passed!"
    exit 0
else
    failed=$((total - passed))
    echo "⚠️  $failed test(s) failed"
    exit 1
fi
