#!/usr/bin/env node

// Simple endpoint testing script
const BASE_URL = 'http://localhost:2121';

async function testEndpoint(path, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }

        console.log(`\n🧪 Testing ${method} ${BASE_URL}${path}`);
        const response = await fetch(`${BASE_URL}${path}`, options);
        
        const responseText = await response.text();
        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch {
            responseData = responseText;
        }
        
        console.log(`📊 Status: ${response.status} ${response.statusText}`);
        console.log(`📦 Response:`, responseData);
        
        return { status: response.status, data: responseData };
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        return { error: error.message };
    }
}

async function runTests() {
    console.log('🚀 Starting API endpoint tests...\n');
    
    // Test health endpoint
    await testEndpoint('/health');
    
    // Test database endpoint
    await testEndpoint('/api/test-db');
    
    console.log('\n✅ Tests completed!');
}

// Check if server is running
fetch(`${BASE_URL}/health`)
    .then(() => runTests())
    .catch(() => {
        console.log('❌ Server is not running on port 2121');
        console.log('💡 Start the server with: npm run dev');
    });
