# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production bundle 
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 16 corporate website for 株式会社CANVAS using the App Router architecture.

### Key Technologies
- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: TailwindCSS + CSS Modules for component-specific styles
- **CMS**: MicroCMS for content management (news, events, achievements, sponsors)
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: Supabase Auth
- **Animations**: Framer Motion

### Data Architecture

**MicroCMS Content Types:**
- `news` - News articles and announcements 
- `iroiro_events` - Event information for the "いろいろ" section
- `iroiro_sponsors` - Sponsor information
- `achievements` - Company achievements/portfolio

**Database Models (Prisma):**
- `User` - User profiles with nickname, age, city, avatar
- `Comment` - User comments linked to authors

### Key Directories

- `app/` - Next.js App Router pages and API routes
  - `_libs/` - Core integrations (microcms.ts, supabase.ts)
  - `_actions/` - Server actions for form handling
- `components/` - Reusable UI components with CSS Modules
- `public/images/` - Static images and assets

### Authentication Flow

Uses Supabase with server/client patterns:
- `createServerSupabaseClient()` - For server components and actions
- `createBrowserSupabaseClient()` - For client components  
- `getCurrentUser()` - Cached user lookup for server-side auth
- Auth can be disabled with `SUPABASE_DISABLE_AUTH=1`

### Content Management Pattern

MicroCMS integration follows a consistent pattern:
- Type definitions in `app/_libs/microcms.ts`
- Content fetching functions (e.g., `getNewsList`, `getNewsDetail`)
- Preview mode support via draft keys
- Category and tag normalization helpers

### Component Structure

Components use CSS Modules with the pattern:
- `ComponentName/index.tsx` - Component logic
- `ComponentName/index.module.css` - Component-specific styles
- Framer Motion for animations where needed

### Environment Variables Required

```
# MicroCMS
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# Supabase  
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://...

# Optional
NEXT_PUBLIC_SITE_URL=https://e-canvas.co.jp/
SUPABASE_DISABLE_AUTH=1 # To disable auth during development
```

### ISR Configuration

Home page uses `export const revalidate = 60` for 60-second ISR to balance content freshness with performance.