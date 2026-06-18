# Installation, Development, and Deployment Guide

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env.local`.

Recommended production variables:

```bash
VITE_API_BASE_URL=https://api.kitob.market
VITE_APP_ENV=production
```

Never expose private service keys in Vite variables. Vite variables are public client-side values.

## Deployment

Recommended hosting:

- Vercel, Netlify, Cloudflare Pages, or an S3/CloudFront static deployment for frontend.
- PostgreSQL or Supabase for database.
- Node, NestJS, Fastify, or serverless functions for REST API.

Security headers to configure:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```
