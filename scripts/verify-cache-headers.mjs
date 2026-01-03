#!/usr/bin/env node

/**
 * Cache Header Verification Script
 * Run after deployment to verify cache headers are working
 * 
 * Usage: node scripts/verify-cache-headers.mjs <domain>
 * Example: node scripts/verify-cache-headers.mjs https://yoursite.com
 */

const domain = process.argv[2] || 'http://localhost:3000';

const endpoints = [
  { path: '/api/admin/leads', expectedTTL: 30, name: 'Admin Leads' },
  { path: '/api/admin/stats', expectedTTL: 60, name: 'Admin Stats' },
  { path: '/api/admin/properties', expectedTTL: 120, name: 'Admin Properties' },
  { path: '/api/admin/locations', expectedTTL: 300, name: 'Admin Locations' },
  { path: '/_next/static/test.js', expectedTTL: 31536000, name: 'Static Assets' },
];

async function verifyCacheHeaders() {
  console.log(`\n📊 Verifying Cache Headers at: ${domain}\n`);
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${domain}${endpoint.path}`, {
        method: 'HEAD',
      });
      
      const cacheControl = response.headers.get('cache-control');
      const age = response.headers.get('age');
      const xCacheType = response.headers.get('x-cache-type');
      
      console.log(`✅ ${endpoint.name}`);
      console.log(`   Path: ${endpoint.path}`);
      console.log(`   Cache-Control: ${cacheControl || 'Not set'}`);
      console.log(`   Age: ${age || 'Not set'}`);
      if (xCacheType) console.log(`   X-Cache-Type: ${xCacheType}`);
      console.log();
    } catch (error) {
      console.log(`❌ ${endpoint.name}`);
      console.log(`   Error: ${error.message}\n`);
    }
  }
  
  console.log('\n📈 Expected Results:');
  console.log('  • Admin Leads: max-age=30');
  console.log('  • Admin Stats: max-age=60');
  console.log('  • Admin Properties: max-age=120');
  console.log('  • Admin Locations: max-age=300');
  console.log('  • Static Assets: max-age=31536000 (1 year)\n');
}

verifyCacheHeaders();
