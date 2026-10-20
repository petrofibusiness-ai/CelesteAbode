# Copy-Paste Configuration Snippets

## File 1: Update `next.config.mjs`

**Find this section in the file:**
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        // existing headers...
      ],
    },
    // ... more headers ...
  ];
}
```

**Add this before the closing `];` of the return statement:**

```javascript
// ===== ADD THIS ENTIRE SECTION =====

// API Caching Headers
{
  source: '/api/admin/leads',
  headers: [
    {
      key: 'Cache-Control',
      value: 'private, max-age=30, s-maxage=30',
    },
  ],
},
{
  source: '/api/admin/stats',
  headers: [
    {
      key: 'Cache-Control',
      value: 'private, max-age=60, s-maxage=60',
    },
  ],
},
{
  source: '/api/admin/properties',
  headers: [
    {
      key: 'Cache-Control',
      value: 'private, max-age=120, s-maxage=120',
    },
  ],
},
{
  source: '/api/admin/locations',
  headers: [
    {
      key: 'Cache-Control',
      value: 'private, max-age=300, s-maxage=300',
    },
  ],
},

// Immutable Asset Caching
{
  source: '/_next/static/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
},
{
  source: '/fonts/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
},
{
  source: '/images/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
},

// ===== END OF ADD =====
```

---

## File 2: Create `vercel.json` (New File)

**Create new file at project root: `vercel.json`**

```json
{
  "headers": [
    {
      "source": "/api/admin/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "private, max-age=30"
        },
        {
          "key": "X-Cache-Type",
          "value": "admin"
        }
      ]
    },
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=60, s-maxage=60, stale-while-revalidate=300"
        }
      ]
    },
    {
      "source": "/:path*",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/admin/stats",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

---

## File 3: Update `.env.local`

**Add these lines to your `.env.local` file:**

```env
# ===== CACHING CONFIGURATION =====
# Cache TTL values in seconds for admin APIs

# Admin Panel Cache TTLs
NEXT_PUBLIC_CACHE_TTL_LEADS=30
NEXT_PUBLIC_CACHE_TTL_STATS=60
NEXT_PUBLIC_CACHE_TTL_PROPERTIES=120
NEXT_PUBLIC_CACHE_TTL_LOCATIONS=300

# R2/CDN Cache TTLs
NEXT_PUBLIC_CACHE_TTL_IMAGES=31536000
NEXT_PUBLIC_CACHE_TTL_BROCHURES=604800

# Enable/Disable caching globally
NEXT_PUBLIC_ENABLE_RESPONSE_CACHING=true

# Cache invalidation webhook (optional, for advanced use)
# WEBHOOK_SECRET_CACHE_INVALIDATION=your_secret_here

# ===== END CACHING CONFIG =====
```

---

## Complete File: `vercel.json` (Full Reference)

If you want a more comprehensive `vercel.json` with all options:

```json
{
  "env": {
    "NEXT_PUBLIC_ENABLE_RESPONSE_CACHING": "@cache_enabled",
    "NEXT_PUBLIC_CACHE_TTL_LEADS": "@cache_ttl_leads",
    "NEXT_PUBLIC_CACHE_TTL_STATS": "@cache_ttl_stats"
  },
  "headers": [
    {
      "source": "/api/admin/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "private, max-age=30, must-revalidate"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    },
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=60, s-maxage=60, stale-while-revalidate=300"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/_next/static/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/fonts/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/:path*",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/admin/stats",
      "schedule": "*/5 * * * *"
    }
  ],
  "regions": ["fra1"],
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

---

## File: Complete `next.config.mjs` Headers Section

If you need to replace the entire headers section:

```javascript
async headers() {
  return [
    // ===== SECURITY & GENERAL HEADERS =====
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
      ],
    },

    // ===== STATIC ASSET CACHING =====
    {
      source: '/propertyhero.avif',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/logoceleste.avif',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },

    // ===== API CACHING (NEW - ADD THIS) =====
    {
      source: '/api/admin/leads',
      headers: [
        {
          key: 'Cache-Control',
          value: 'private, max-age=30, s-maxage=30',
        },
      ],
    },
    {
      source: '/api/admin/stats',
      headers: [
        {
          key: 'Cache-Control',
          value: 'private, max-age=60, s-maxage=60',
        },
      ],
    },
    {
      source: '/api/admin/properties',
      headers: [
        {
          key: 'Cache-Control',
          value: 'private, max-age=120, s-maxage=120',
        },
      ],
    },
    {
      source: '/api/admin/locations',
      headers: [
        {
          key: 'Cache-Control',
          value: 'private, max-age=300, s-maxage=300',
        },
      ],
    },

    // ===== IMMUTABLE ASSET CACHING (NEW - ADD THIS) =====
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
},
```

---

## Quick Verification Script

**Run this in browser console after deployment:**

```javascript
// Check if caching is working

async function verifyCaching() {
  const endpoints = [
    '/api/admin/leads',
    '/api/admin/stats',
  ];

  for (const endpoint of endpoints) {
    const response = await fetch(endpoint);
    const cacheControl = response.headers.get('cache-control');
    
    console.log(`✓ ${endpoint}`);
    console.log(`  Cache-Control: ${cacheControl}`);
    console.log(`  Status: ${response.status}`);
  }
}

verifyCaching();
```

Expected output:
```
✓ /api/admin/leads
  Cache-Control: private, max-age=30, s-maxage=30
  Status: 200

✓ /api/admin/stats
  Cache-Control: private, max-age=60, s-maxage=60
  Status: 200
```

---

## Performance Test Script

**Run this to measure improvement:**

```javascript
async function measurePerformance() {
  const iterations = 5;
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const response = await fetch('/api/admin/leads');
    const end = performance.now();
    
    times.push(end - start);
    console.log(`Request ${i + 1}: ${(end - start).toFixed(0)}ms`);
    
    if (i < iterations - 1) {
      await new Promise(r => setTimeout(r, 100)); // 100ms delay between requests
    }
  }

  const avg = times.reduce((a, b) => a + b) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);

  console.log(`\nAverage: ${avg.toFixed(0)}ms`);
  console.log(`Min: ${min.toFixed(0)}ms (cached)`);
  console.log(`Max: ${max.toFixed(0)}ms (fresh)`);
  console.log(`Speedup: ${(max / min).toFixed(1)}x faster when cached`);
}

measurePerformance();
```

Expected output:
```
Request 1: 245ms (fresh from database)
Request 2: 15ms  (cached)
Request 3: 18ms  (cached)
Request 4: 20ms  (cached)
Request 5: 240ms (cache expired after 30s)

Average: 107ms
Min: 15ms (cached)
Max: 245ms (fresh)
Speedup: 16.3x faster when cached
```

---

## Environment Variables (.env.local) - Production

For production, you might want:

```env
# Production Caching Config
NEXT_PUBLIC_CACHE_TTL_LEADS=30
NEXT_PUBLIC_CACHE_TTL_STATS=60
NEXT_PUBLIC_CACHE_TTL_PROPERTIES=120
NEXT_PUBLIC_CACHE_TTL_LOCATIONS=300
NEXT_PUBLIC_ENABLE_RESPONSE_CACHING=true

# Staging - More aggressive caching
# NEXT_PUBLIC_CACHE_TTL_LEADS=60
# NEXT_PUBLIC_CACHE_TTL_STATS=120

# Development - Minimal caching
# NEXT_PUBLIC_CACHE_TTL_LEADS=10
# NEXT_PUBLIC_CACHE_TTL_STATS=10
# NEXT_PUBLIC_ENABLE_RESPONSE_CACHING=false
```

---

## Deployment Checklist

- [ ] Updated `next.config.mjs` with cache headers
- [ ] Created new `vercel.json` file
- [ ] Added cache variables to `.env.local`
- [ ] Verified JSON syntax (no typos)
- [ ] Tested locally: `npm run build && npm run start`
- [ ] Committed changes: `git add . && git commit -m "Add caching configuration"`
- [ ] Pushed to git: `git push`
- [ ] Verified deployment on Vercel
- [ ] Tested in browser DevTools
- [ ] Checked cache headers in Network tab

---

## Support

If you have questions:
1. Check CACHING_QUICK_START.md for common issues
2. Review CACHING_ARCHITECTURE.md for data flows
3. Read CACHING_IMPLEMENTATION.md for detailed steps
