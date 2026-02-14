# VeeTube

A modern, full-stack video sharing platform built with Next.js, featuring AI-powered content generation, real-time streaming, and community engagement capabilities.

## Overview

VeeTube is a YouTube-like video platform that enables users to upload, stream, discover, and discuss videos. Leveraging industry-standard services for video processing (Mux), authentication (Clerk), and file storage (UploadThing), it delivers a scalable, secure platform for content creators and viewers. The application includes AI-powered features for automatic title and description generation, intelligent search, and comprehensive engagement metrics.

## Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development

### Backend & API
- **TRPC** - End-to-end type-safe RPC framework
- **Next.js API Routes** - Serverless functions for webhooks and workflows
- **Zod** - Schema validation and type inference

### Database & ORM
- **PostgreSQL** - Primary database via Neon
- **Drizzle ORM** - Lightweight, type-safe ORM
- **Drizzle Kit** - Migration and schema management

### Audio/Video Processing
- **Mux** - Video hosting, transcoding, delivery, and HLS streaming
- **Mux Uploader React** - Client-side video upload component
- **Mux Player React** - Video playback with streaming capabilities

### File Storage & CDN
- **UploadThing** - File uploads and storage
- **Remote Image Optimization** - Mux (image.mux.com) and UploadThing CDN integration

### Authentication & Authorization
- **Clerk** - User authentication and session management
- **Server-side Auth Validation** - Protected procedures with middleware

### Caching & Rate Limiting
- **Upstash Redis** - Distributed caching and rate limiting
- **Upstash Ratelimit** - Sliding window rate limiting (10 requests per 10 seconds)

### Workflow Automation
- **Upstash Workflow (QStash)** - Background job orchestration
- **OpenAI API** - AI-powered content generation (titles, descriptions, image generation)

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel library

### Internationalization
- **next-intl** - Multi-language support
- **Supported Languages** - English (en), Ukrainian (uk)
- **Locale Matching** - Browser locale detection and user preferences

### Development Tools
- **Biome** - Fast linting and code formatting
- **Concurrently** - Parallel task runner
- **Ngrok** - Local webhook tunneling for development

## Key Features

### Content Management
- **Video Upload & Processing** - Direct upload with Mux transcoding
- **Video Visibility Control** - Public/private video access control
- **Video Metadata** - Title, description, category, duration tracking
- **AI-Powered Metadata** - Automatic title, description, and thumbnail generation
- **Thumbnails** - Custom thumbnail upload with preview generation

### Video Discovery
- **Home Feed** - Personalized content feed
- **Search** - Full-text search across video titles and descriptions
- **Categories** - Organize videos by category
- **Trending Videos** - Trending content discovery
- **Suggestions** - Content recommendations

### User Engagement
- **Comments** - Threaded comments on videos
- **Comment Reactions** - Like/react to comments
- **Video Reactions** - Like/react to videos
- **View Tracking** - Track video views with metadata
- **Subscriptions** - Subscribe to creators for personalized feed

### Content Organization
- **Playlists** - Create and manage video playlists
- **User Profiles** - Customizable profile with banner and avatar
- **Studio Dashboard** - Creator content management interface

### Platform Features
- **Theme Support** - Light/dark mode with system preference detection
- **Multi-language** - English and Ukrainian support with locale switching
- **Responsive Design** - Mobile-first, adaptive UI
- **Error Handling** - Comprehensive error boundaries and user feedback

## Project Structure

```
veetube/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── (auth)/             # Authentication routes (sign-in, sign-up)
│   │   ├── (home)/             # Main application routes
│   │   │   ├── feed/           # Home/feed page
│   │   │   ├── videos/         # Video detail page
│   │   │   ├── playlists/      # Playlists view
│   │   │   ├── search/         # Search interface
│   │   │   ├── subscriptions/  # Subscription feed
│   │   │   └── users/          # User profiles
│   │   ├── (studio)/           # Creator studio routes
│   │   │   └── studio/         # Content management dashboard
│   │   ├── api/
│   │   │   ├── trpc/           # TRPC endpoint
│   │   │   ├── videos/         # Video-related API routes
│   │   │   │   ├── workflows/  # AI generation workflows
│   │   │   │   └── webhook/    # Mux webhook handler
│   │   │   ├── uploadthing/    # File upload API
│   │   │   └── users/          # User sync/webhooks
│   │   ├── providers.tsx       # Client-side providers
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   └── error/not-found     # Error pages
│   ├── components/
│   │   ├── common/             # Reusable components (modals, carousels)
│   │   ├── form/               # Form fields and inputs
│   │   ├── ui/                 # Base UI components (shadcn/ui)
│   │   └── providers/          # Provider components (theme, toast)
│   ├── db/
│   │   ├── schema/             # Drizzle schema definitions
│   │   │   ├── users.ts        # User entity
│   │   │   ├── videos.ts       # Video entity
│   │   │   ├── comments.ts     # Comments entity
│   │   │   ├── subscriptions.ts# Subscriptions entity
│   │   │   ├── playlists.ts    # Playlists entity
│   │   │   └── [reactions, views, etc].ts
│   │   └── index.ts            # Database client
│   ├── features/               # Feature-based modules
│   │   ├── auth/               # Authentication UI/logic
│   │   ├── videos/             # Video procedures and UI
│   │   │   ├── procedures/     # Video TRPC procedures
│   │   │   │   ├── create.ts
│   │   │   │   ├── get-one.ts
│   │   │   │   ├── get-many.ts
│   │   │   │   ├── update.ts
│   │   │   │   ├── generate-*.ts (AI generation)
│   │   │   │   └── [more procedures]
│   │   │   ├── ui/             # Video components
│   │   │   └── hooks/          # Video-specific hooks
│   │   ├── comments/           # Comments feature
│   │   ├── studio/             # Creator studio
│   │   ├── search/             # Search functionality
│   │   ├── subscriptions/      # Subscription system
│   │   ├── playlists/          # Playlist management
│   │   └── [other features]
│   ├── hooks/
│   │   ├── use-confirm.tsx     # Confirmation dialog hook
│   │   ├── use-intersection-observer.ts
│   │   └── use-mobile.ts
│   ├── i18n/                   # Internationalization
│   │   ├── config.ts           # i18n configuration
│   │   ├── request.ts          # Server-side locale handling
│   │   ├── [helper functions]
│   ├── lib/                    # Utilities and services
│   │   ├── mux.ts             # Mux client initialization
│   │   ├── redis.ts           # Redis/Upstash client
│   │   ├── ratelimit.ts       # Rate limiting config
│   │   ├── workflow.ts        # Workflow (QStash) client
│   │   ├── uploadthing.ts     # UploadThing config
│   │   ├── constants.ts       # App constants
│   │   └── utils/             # Utility functions
│   ├── styles/                 # Global styles
│   ├── trpc/
│   │   ├── init.ts            # TRPC context and base procedures
│   │   ├── client.tsx         # TRPC client setup
│   │   ├── server.tsx         # TRPC server utilities
│   │   ├── query-client.ts    # React Query configuration
│   │   └── routers/           # TRPC route definitions
│   │       ├── _app.ts        # Root router
│   │       ├── videos.ts      # Video operations
│   │       ├── comments.ts    # Comments TRPC
│   │       ├── search.ts      # Search procedures
│   │       └── [more routers]
│   └── proxy.ts               # Request interceptor
├── messages/                    # Internationalization messages
│   ├── en/                     # English translations
│   └── uk/                     # Ukrainian translations
├── public/                      # Static assets
├── drizzle.config.ts           # Drizzle Kit configuration
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── biome.json                 # Code quality settings
├── postcss.config.mjs         # PostCSS configuration
├── components.json            # Shadcn component registry
└── pnpm-workspace.yaml        # PNPM workspace config
```

## Database Schema

### Core Entities

**Users**
- Authenticated via Clerk (clerkId)
- Profile customization (banner, avatar, name)
- Relationships: videos, subscriptions, comments, reactions, playlists

**Videos**
- Mux integration (asset ID, upload ID, playback ID)
- Metadata tracking (title, description, duration, visibility)
- Transcoding status and playback readiness
- Visibility control (public/private)
- Category assignment

**Comments**
- Text content on videos
- Nested structure support
- User attribution

**Subscriptions**
- Creator-viewer relationships
- Enable personalized feed

**Playlists**
- User-created video collections
- Ordered playlist videos

**Reactions**
- Video reactions (likes, etc.)
- Comment reactions (likes, etc.)

**Views**
- Track video watch metrics
- User and session information

**Categories**
- Classify and organize videos

## Installation

### Prerequisites
- **Node.js** ≥ 18.0
- **pnpm** ≥ 9.0
- **PostgreSQL** database (local or cloud)
- Following external service accounts:
  - Clerk (authentication)
  - Mux (video processing)
  - UploadThing (file storage)
  - OpenAI (AI features)
  - Upstash (Redis + Workflow)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd veetube
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Initialize the database**
   ```bash
   pnpm exec drizzle-kit migrate
   ```

5. **Start development server**
   ```bash
   pnpm run dev
   ```

The application will run at `http://localhost:3000`

## Environment Variables

Create `.env.local` in the project root with the following variables:

### Base URLs
```env
# Required for production builds
BASE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_DEVELOPED_BY=Your Name
```

### Clerk Authentication
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_SIGNING_SECRET=your_clerk_signing_secret

# Clerk redirect URLs (customize based on your domain)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

### Database
```env
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/veetube
```

### Mux (Video Processing & Streaming)
```env
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret
MUX_SIGNING_SECRET=your_mux_signing_secret
```

### OpenAI (AI Features)
```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_IMAGE_URL=https://api.openai.com/v1/images/generations
```

### UploadThing (File Storage)
```env
UPLOADTHING_TOKEN=your_uploadthing_token
```

### Upstash (Redis & Workflow)
```env
# Redis for rate limiting and caching
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# QStash/Workflow for background jobs
UPSTASH_WORKFLOW_URL=https://qstash.io
QSTASH_URL=https://qstash.io
QSTASH_TOKEN=your_qstash_token
QSTASH_CURRENT_SIGNING_KEY=your_signing_key
QSTASH_NEXT_SIGNING_KEY=your_next_signing_key
```

### Node Environment
```env
NODE_ENV=development  # or production
```

## Available Scripts

### Development
```bash
# Start development server
pnpm run dev

# Start with webhook tunneling (requires ngrok)
pnpm run dev:all

# Tunnel webhooks to localhost for Mux events
pnpm run dev:webhook
```

### Build & Production
```bash
# Build for production
pnpm run build

# Start production server
pnpm run start
```

### Code Quality
```bash
# Lint code with Biome
pnpm run lint

# Format code with Biome
pnpm run format
```

### Database
```bash
# Generate and apply migrations
pnpm exec drizzle-kit migrate

# Push schema changes (development only)
pnpm exec drizzle-kit push

# Open Drizzle Studio for database inspection
pnpm exec drizzle-kit studio
```

## Running Locally

### Development Workflow

1. **Start the development server**
   ```bash
   pnpm run dev
   ```
   Server runs at `http://localhost:3000`

2. **Set up ngrok tunnel** (for webhook testing)
   ```bash
   pnpm run dev:webhook
   # Updates your Mux webhook URL to the ngrok tunnel
   ```
   Or run both concurrently:
   ```bash
   pnpm run dev:all
   ```

3. **Access the application**
   - Open `http://localhost:3000` in your browser
   - Sign up/sign in with Clerk
   - Upload videos and manage content in the studio

### Database Development

1. **Initialize schema**
   ```bash
   pnpm exec drizzle-kit migrate
   ```

2. **View and manage data**
   ```bash
   pnpm exec drizzle-kit studio
   # Opens Drizzle Studio at http://127.0.0.1:16500
   ```

3. **Reset database** (development only)
   ```bash
   pnpm exec drizzle-kit drop
   pnpm exec drizzle-kit migrate
   ```

## Building & Deployment

### Build Process

```bash
# Verify code quality
pnpm run lint

# Build Next.js application
pnpm run build

# Output is in .next/ directory
```

### Production Execution

```bash
# Start production server (after build)
pnpm run start
```

### Deployment Platforms

This application is optimized for platforms supporting Node.js with PostgreSQL:

- **Vercel** (recommended for Next.js)
  - Automatic deployments from Git
  - Serverless functions for API routes
  - Environment variable management

- **Docker** (for custom deployment)
  ```dockerfile
  FROM node:18-alpine
  WORKDIR /app
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  COPY . .
  RUN pnpm run build
  EXPOSE 3000
  CMD ["pnpm", "run", "start"]
  ```

- **Self-hosted** (VPS, dedicated servers)
  - Ensure Node.js 18+ and PostgreSQL
  - Use process manager (PM2, systemd)
  - Configure reverse proxy (nginx, Caddy)

### Environment Setup for Production

Ensure all environment variables are configured:
- Database: Managed PostgreSQL service
- Object storage: UploadThing or S3-compatible
- Webhooks: Update Mux webhook URL from ngrok to production domain
- Rate limiting: Upstash Redis with production endpoints

### Code Organization & Patterns

**TRPC Procedures**
- All API logic follows TRPC router pattern
- Each feature module contains `procedures/` directory with operation handlers
- Procedures use `baseProcedure` for public endpoints and `protectedProcedure` for authenticated actions
- Rate limiting automatically applied via middleware

**Type Safety**
- Schema validation with Zod (database and API)
- End-to-end type inference with TRPC
- Drizzle ORM provides TypeScript schema types

**Async Workflows**
- Upstash Workflow for long-running tasks (AI generation, video processing)
- Webhook handlers for Mux video status updates
- Protected with request validation and secure signing

**Authentication Flow**
- Clerk handles user authentication
- TRPC context includes Clerk user ID
- Automatic user sync between Clerk and database
- Protected procedures validate user exists in database

**Internationalization**
- `next-intl` for client and server-side translations
- Locale stored in URL params and user preferences
- Browser locale detection with manual override
- Support for English (en) and Ukrainian (uk)

### Common Development Tasks

**Add a New Video Procedure**
1. Create file in `src/features/videos/procedures/`
2. Import from video router (`src/trpc/routers/videos.ts`)
3. Add to router definition
4. Use in components via `trpc.videos.[procedure].useQuery()`

**Add a New TRPC Router**
1. Create router file in `src/trpc/routers/`
2. Import and add to `_app.ts` root router
3. Export type for client usage

**Database Schema Changes**
1. Modify schema in `src/db/schema/`
2. Generate migration: `pnpm exec drizzle-kit generate`
3. Review generated SQL in `drizzle/` directory
4. Apply: `pnpm exec drizzle-kit migrate`

**Add Translation**
1. Add key-value pairs to JSON files in `messages/en/` and `messages/uk/`
2. Update i18n config if new message group
3. Reference in components with `useTranslations('namespace')`

### Rate Limiting

- Configured at 10 requests per 10-second sliding window per user
- Applied automatically to all protected procedures via middleware
- Uses Upstash Redis for distributed rate limit state
- Returns `TOO_MANY_REQUESTS` error when limit exceeded

### Error Handling

- TRPC errors with specific codes (UNAUTHORIZED, TOO_MANY_REQUESTS, etc.)
- React Error Boundary for component-level error handling
- Sonner toast notifications for user feedback
- Comprehensive error logging for debugging

### Image Optimization

- Mux CDN for video thumbnails (image.mux.com)
- UploadThing CDN for user uploads
- Remote image patterns configured in Next.js
- Responsive image sizing with Next.js Image component

## License

This project is private and proprietary software. Unauthorized copying or distribution is prohibited.

---

**Created by:** Andrii Boyvan  
**Last Updated:** February 2026
