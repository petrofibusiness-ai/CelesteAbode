#!/usr/bin/env node

/**
 * Admin API Endpoint Authorization Test Suite
 * Tests all critical admin endpoints to ensure proper authentication/authorization
 * Run with: node test-auth-endpoints.js
 */

const http = require('http');
const https = require('https');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Results array to store test outcomes
const results = [];

/**
 * Make HTTP request without authentication
 */
function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const protocol = url.protocol === 'https:' ? https : http;

    const options = {
      method,
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        // NO authentication cookie
      },
      timeout: 15000, // Increased timeout
    };

    const req = protocol.request(options, (res) => {
      // Consume the response body to prevent hanging
      res.on('data', () => {});
      res.on('end', () => {
        resolve(res.statusCode || 500);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(15000, () => { // Increased timeout
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
      req.write(JSON.stringify({}));
    }

    req.end();
  });
}

/**
 * Test an endpoint
 */
async function testEndpoint(method, path, requiresAuth = true) {
  const endpoint = `${method} ${path}`;

  try {
    const statusCode = await makeRequest(method, path);

    // Expected response:
    // - Requires Auth: 401 (Unauthorized)
    // - Does NOT Require Auth: 200, 400, 404 (anything except 401)
    const isUnauthorized = statusCode === 401;
    const passed = requiresAuth ? isUnauthorized : !isUnauthorized;

    return {
      endpoint,
      method,
      requiresAuth,
      statusCode,
      passed,
      error: passed ? undefined : `Expected ${requiresAuth ? '401' : 'non-401'}, got ${statusCode}`,
    };
  } catch (error) {
    return {
      endpoint,
      method,
      requiresAuth,
      statusCode: 0,
      passed: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('🔐 Admin API Endpoint Authorization Test Suite\n');
  console.log(`Testing against: ${BASE_URL}\n`);

  // Critical Admin Endpoints - MUST require authentication
  const criticalEndpoints = [
    // Authentication
    { method: 'GET', path: '/api/admin/auth/session', requiresAuth: true },
    { method: 'POST', path: '/api/admin/auth/logout', requiresAuth: true },

    // Properties Management
    { method: 'GET', path: '/api/admin/properties', requiresAuth: true },
    { method: 'POST', path: '/api/admin/properties', requiresAuth: true },
    { method: 'GET', path: '/api/admin/properties/123', requiresAuth: true },
    { method: 'PATCH', path: '/api/admin/properties/123', requiresAuth: true },
    { method: 'DELETE', path: '/api/admin/properties/123', requiresAuth: true },
    { method: 'GET', path: '/api/admin/properties/check-slug?slug=test', requiresAuth: true },

    // Locations Management
    { method: 'GET', path: '/api/admin/locations', requiresAuth: true },
    { method: 'POST', path: '/api/admin/locations', requiresAuth: true },
    { method: 'GET', path: '/api/admin/locations/list', requiresAuth: true },
    { method: 'GET', path: '/api/admin/locations/test-slug', requiresAuth: true },
    { method: 'PUT', path: '/api/admin/locations/test-slug', requiresAuth: true },
    { method: 'DELETE', path: '/api/admin/locations/test-slug', requiresAuth: true },

    // Localities Management
    { method: 'GET', path: '/api/admin/localities/by-location/123', requiresAuth: true },

    // Leads Management
    { method: 'GET', path: '/api/admin/leads', requiresAuth: true },
    { method: 'PATCH', path: '/api/admin/leads', requiresAuth: true },

    // File Uploads
    { method: 'POST', path: '/api/admin/upload/image', requiresAuth: true },
    { method: 'POST', path: '/api/admin/upload/video', requiresAuth: true },
    { method: 'POST', path: '/api/admin/upload/pdf', requiresAuth: true },
    { method: 'POST', path: '/api/admin/upload/location-image', requiresAuth: true },

    // Stats
    { method: 'GET', path: '/api/admin/stats', requiresAuth: true },
  ];

  // Public Endpoints - should NOT require authentication
  const publicEndpoints = [
    { method: 'GET', path: '/api/properties', requiresAuth: false },
    { method: 'GET', path: '/api/properties/test-slug', requiresAuth: false },
    { method: 'GET', path: '/api/properties/all', requiresAuth: false },
    { method: 'GET', path: '/api/locations/test-slug', requiresAuth: false },
    { method: 'GET', path: '/api/health', requiresAuth: false },
  ];

  const allTests = [...criticalEndpoints, ...publicEndpoints];

  console.log(`Running ${allTests.length} tests...\n`);

  for (const test of allTests) {
    const result = await testEndpoint(test.method, test.path, test.requiresAuth);
    results.push(result);

    const status = result.passed ? '✅' : '❌';
    const authLabel = result.requiresAuth ? 'AUTH' : 'PUBLIC';
    console.log(
      `${status} [${authLabel}] ${result.endpoint.padEnd(45)} -> ${result.statusCode}${
        result.error ? ` (${result.error})` : ''
      }`
    );
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.filter((r) => !r.passed).length;

  console.log(`\n📊 Test Results:`);
  console.log(`   ✅ Passed: ${passedCount}/${results.length}`);
  console.log(`   ❌ Failed: ${failedCount}/${results.length}`);

  if (failedCount > 0) {
    console.log('\n⚠️  Failed Endpoints:');
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        console.log(
          `   - ${r.endpoint.padEnd(45)} Expected: ${r.requiresAuth ? 401 : 'non-401'}, Got: ${r.statusCode}`
        );
      });

    console.log('\n🔧 These endpoints need to be fixed!');
    process.exit(1);
  } else {
    console.log('\n✨ All endpoints are properly secured!');
    process.exit(0);
  }
}

// Run tests
runTests().catch((error) => {
  console.error('Test suite error:', error);
  process.exit(1);
});
