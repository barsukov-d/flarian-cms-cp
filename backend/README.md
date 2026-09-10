# flarian-cms-backend

A local, Dockerized backend for the Posts feature of the CMS: Effect-TS HTTP server +
Drizzle ORM + SQLite. It serves `GET/POST /api/posts`, `GET/PATCH/DELETE /api/posts/:id`,
`GET /api/categories`, `GET /api/tags` and a `GET /api/files/all-webp` stub, in the same
JSON shape the frontend's fetch mock (`src/mocks/*`) already produces.

Auth/Users/Register/Pages, and Category/Tag/File management, are out of scope for this
backend and keep using the existing fetch mock.

## Run with Docker

```sh
cd backend
docker compose up -d
```

This builds the image, starts the API on `http://localhost:3031`, and persists the
SQLite database file in a named Docker volume (`backend-data`) mounted at `/app/data`,
so data survives `docker compose restart` / container recreation.

On first start the database is created, migrated and seeded with the same sample
categories/tags/posts as `src/mocks/store.ts`.

Verify it's up:

```sh
curl http://localhost:3031/api/posts
```

## Run locally without Docker (for development)

```sh
cd backend
npm install
npm run dev
```

This runs the server with `tsx watch` on port 3031, storing the SQLite file at
`backend/data/db.sqlite` by default (override with the `DATABASE_URL` env var).

## Tests

```sh
cd backend
npm test
```

Runs the vitest suite (Posts CRUD, Categories/Tags/Files-stub), each test using an
isolated in-memory SQLite database.

## Pointing the frontend at this backend

The frontend has `OpenAPI.BASE` hardcoded to `http://sky-web.site:3031/api`
(`src/main.ts`) and this is intentionally not changed. To run the frontend against this
local backend instead of the in-browser fetch mock:

1. Start this backend (see above), so it's listening on port 3031.
2. Add a manual hosts-file entry mapping `sky-web.site` to `127.0.0.1`:
   - Linux/macOS: add `127.0.0.1 sky-web.site` to `/etc/hosts`.
   - Windows: add `127.0.0.1 sky-web.site` to `C:\Windows\System32\drivers\etc\hosts`.
3. Run the frontend dev server with `VITE_MOCK_API=false` (or unset) so it does not
   install the fetch mock and talks to `http://sky-web.site:3031/api` directly.

With that in place, `/posts`, `/posts/create` and editing/deleting a post work against
this backend's real SQLite-backed data.
