# planning-poker-bun

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

### Apps descriptions

#### API

An [ElysiaJS](https://elysiajs.com/) api leveraging [Bun](https://bun.sh/) and its incredible run time. This makes it an easy to use and deploy server as Bun can easily run typescript files!

#### WEB

A [SvelteKit](https://kit.svelte.dev/) application with [Skeleton](https://www.skeleton.dev/) styling and theming applied.
