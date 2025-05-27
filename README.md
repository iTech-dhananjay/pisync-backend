# PiSync Event Processing Backend

A lightweight Node.js + Express service to ingest, store, and query sync‐events from offline PiBook/PiBox devices. Built on PostgreSQL with Sequelize, it provides:

- **POST** `/api/v1/sync/event` – record a sync event
- **GET** `/api/v1/sync/device/:id/history` – fetch history for one device
- **GET** `/api/v1/sync/devices/repeated-failures` – list devices with >3 failures in last 24 h
- **Bonus**: console-log when a device fails 3 times in a row

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation & Setup](#installation--setup)
    - [Local (Postgres)](#local-postgres)
    - [Docker Compose](#docker-compose)
3. [Environment Variables](#environment-variables)
4. [Database Migrations](#database-migrations)
5. [Available Scripts](#available-scripts)

---

## Prerequisites

- **Node.js** v18+ & **npm**
- **PostgreSQL** 12+ (or Docker via Compose)
- (Optional) **Docker** & **docker-compose**

---

## Installation & Setup

### Local (Postgres)

1. **Clone & install**
   ```bash
   git clone <your-repo-url> pisync-backend
   cd pisync-backend
   npm install

	2.	Configure

cp .env.example .env
# Edit .env → set DATABASE_URL to your Postgres instance
# e.g. postgres://postgres:postgres@localhost:5432/pisync_db


	3.	Ensure database exists

psql -U postgres -c "CREATE DATABASE pisync_db;"


	4.	Run migrations

npm run migrate


	5.	Start the server

npm run dev

The API listens on http://localhost:4000/api/v1.

Docker Compose
1.	Bring up services

docker-compose up -d


	2.	Install & migrate inside the container

docker-compose exec api bash -lc "npm install && npm run migrate"


	3.	View logs

docker-compose logs -f api


	4.	Shut down

docker-compose down



⸻

Environment Variables

Copy .env.example to .env and fill in:

PORT=4000
DATABASE_URL=postgres://USER:PASS@HOST:PORT/pisync_db


⸻

Database Migrations
•	Config file: sequelize.config.js (reads your .env)
•	Migrations folder: src/database/migrations
•	Model definitions: src/database/models/syncEvent.js

Run migrations:

npm run migrate

Undo last migration:

npm run migrate:undo


⸻

Available Scripts

Command	Description
npm run dev	Start in dev mode with auto-reload
npm start	Start in production mode
npm run migrate	Run DB migrations
npm run migrate:undo	Roll back last migration
npm run lint	ESLint check
npm run test	Run Jest tests


