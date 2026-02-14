<div align="center">
<img src="docs/media/logo.png" width="96" height="96" />
<h1 style="font-size: 72px;">VeeTube</h1>
</div>

<p align="center">
  <b>A modern, full-stack video sharing platform built with Next.js, featuring AI-powered content generation, real-time streaming, and community engagement capabilities.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-App_Router-black?style=flat&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript" />
  <img src="https://img.shields.io/badge/tRPC-End--to--End_Typesafe-green" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-blue" />
  <img src="https://img.shields.io/badge/Mux-Streaming-purple" />
  <img src="https://img.shields.io/badge/OpenAI-AI-orange" />
</p>

---

## Table of Contents

- [Why VeeTube Exists](#why-veetube-exists)
- [Core Capabilities](#core-capabilities)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Development](#development)
- [About this project](#about-this-project)
- [Documentation](#documentation)


---

## Why VeeTube Exists

VeeTube is designed to demonstrate how to build a production-ready, AI-enhanced video platform architecture with:
- Integrate external SaaS services (video, auth, storage, AI) cleanly
- Maintain end-to-end type safety across the stack
- Handle video lifecycle events via webhooks
- Structure a feature-based Next.js App Router project
- Implement scalable async job processing
- Build engagement systems around user-generated content

---

## Core Capabilities

- Video Management
- Direct video uploads
- Automatic transcoding & HLS streaming
- Visibility control
- Category assignment
- Thumbnail management
- AI Features
- Automatic title generation 
- Description generation
- Thumbnail generation
- Background AI workflows


---

## Screenshots

<!-- <div align="center">
<p>Projects list</p>
<img src="docs/media/projects.png" width="900" />
</div>

<div align="center">
<p>Editor</p>
<img src="docs/media/editor.png" width="900" />
</div>

<div align="center">
<p>Preview</p>
<img src="docs/media/preview.png" width="900" />
</div> -->


---

## Tech Stack

- **Next.js (App Router)** + React + TypeScript
- **tRPC** + Zod for end-to-end type safety
- **PostgreSQL (Neon)** + Drizzle ORM for data management
- **Mux** for video processing and streaming
- **UploadThing** for secure file uploads
- **OpenAI** for AI-powered content generation
- **Clerk** for authentication and user management
- **Upstash** for distributed rate limiting and caching
- **QStash** for background job orchestration


---

## Quick Start

```bash
git clone https://github.com/AnBoyvan/veetube.git
cd veetube
npm install
npm run dev:all
```

### Requirements

-   Node.js ≥ 18
-   PostgreSQL
-   Clerk account
-   Mux account
-   OpenAI API key
-   UploadThing
-   Upstash
-   ngrok (for local webhook testing)

---

## Environment Variables

Create a `.env.local` file:

```
  DATABASE_URL=

  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=
  CLERK_SIGNING_SECRET=

  MUX_TOKEN_ID=
  MUX_TOKEN_SECRET=
  MUX_SIGNING_SECRET=

  OPENAI_API_KEY=

  UPLOADTHING_TOKEN=

  UPSTASH_REDIS_REST_URL=
  UPSTASH_REDIS_REST_TOKEN=

  QSTASH_TOKEN=
  QSTASH_CURRENT_SIGNING_KEY=
  QSTASH_NEXT_SIGNING_KEY=
```

---

## How It Works

1.  User authenticates via Clerk.
2.  Video uploads to Mux.
3.  Mux webhook updates DB state.
4.  AI metadata generation runs as async job.
5.  tRPC handles typed client-server communication.
6.  Redis enforces rate limiting.
7.  Engagement data persists via Drizzle ORM.

The system is built for extensibility and scale.

Formatting and linting via **Biome**.

For deep technical details see: `docs/architecture.md`

---

## About this project

This repository is a portfolio demonstration.

See: `docs/description.md`

## Documentation

Full technical documentation and architecture breakdown:  
`docs/architecture.md`