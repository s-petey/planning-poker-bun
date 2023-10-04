# planning-poker-bun

## Table of Contents

- [Running Locally](#running-locally)
- [Docker](#docker-configuration)
- [App Descriptions](#app-descriptions)
  - [Api](#api)
  - [Web](#web)

---

## A bun workspace application for your own planning poker application for scrum or agile meetings!

It is easy to host and run locally, however setting it up for separate deployments may be a bit more involved.
My deployment uses [Caprover](https://caprover.com/), however you can deploy your own version simply updating the `Dockerfile.*`s. There may be some improvements around env variables which would help simplify this in future.

### Running locally

To install dependencies:

```bash
bun install
```

---

To run open two terminals:

API

First make an `.env.local` file (rename `.env.local.example`) update to whichever values you may want.

```bash
cd apps/planning-poker-api && bun run dev
```

WEB

First make an `.env.local` file (rename `.env.local.example`) update to whichever values you may want. Note this port and URL should match the API env.

```bash
cd apps/planning-poker-web && bun run dev
```

### Docker Configuration

Both docker files will require the same or more environment variables as defined in the `.env.local.example` files. These may need to be configured in the docker window or through the CLI.

API:

```bash
VITE_API_PORT = 3001
VITE_API_URL = 0.0.0.0
```

WEB:

```bash
VITE_API_PORT = 3001
VITE_API_URL = host.docker.internal
ORIGIN = http://localhost:3000
```

### App descriptions

#### API

An [ElysiaJS](https://elysiajs.com/) api leveraging [Bun](https://bun.sh/) and its incredible run time. This makes it an easy to use and deploy server as Bun can easily run typescript files!

#### WEB

A [SvelteKit](https://kit.svelte.dev/) application with [Skeleton](https://www.skeleton.dev/) styling and theming applied.
