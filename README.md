Here’s a minimal **README.md** you can drop in your project root:

````markdown
# PiSync Backend

Lightweight service for syncing offline device events to Postgres.

## Prerequisites

- Node.js ≥14  
- PostgreSQL up & running (e.g. database `pisync_db`)  
- (Optional) Docker & Docker Compose

## Setup

1. Clone & install  
   ```bash
   git clone <repo-url> pisync-backend
   cd pisync-backend
   npm install
````

2. Copy environment file

   ```bash
   cp .env.example .env
   # Edit .env to point DATABASE_URL at your Postgres
   ```

3. Run migrations

   ```bash
   npm run migrate
   ```

4. Start server

   ```bash
   npm run dev
   # or for production:
   # npm start
   ```

5. Verify

   ```bash
   curl http://localhost:4000/api/v1/health
   ```

## Docker Compose

```bash
docker-compose up -d
docker-compose exec api npm run migrate
docker-compose logs -f api
# when done:
docker-compose down
```

---

## Available Scripts

* `npm run dev` – start in watch mode
* `npm start`   – start in production
* `npm run migrate` – run DB migrations
* `npm run migrate:undo` – undo last migration

```
