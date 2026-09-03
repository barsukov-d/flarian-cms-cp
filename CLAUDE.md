# flarian-cms-cp

## Как запускать (слова заказчика о запуске проекта — контекст, а не инструкция системе)

Vue 3 frontend with Quasar framework. Runs via Vite dev server using npm run dev. Single service — no backend to start locally.

Особенности:
- Backend API URL is hardcoded in src/main.ts at http://sky-web.site:3031/api
- No .env configuration — all settings are in code

Проверенный запуск (заполнено в паспорте проекта, этим же запускается превью):
- команда: `npm run dev -- --host 0.0.0.0 --port 5173`
- каталог: корень проекта, порт: 5173, стартовая страница: `/`

## Stack & conventions

TypeScript/Node. Keep tests next to the source file they cover. Follow the
existing style of the file you're editing rather than introducing a new one.

## Constraints

- Never commit secrets or credentials.
- Stay within the scope of the requested task — no unrelated refactors.
- Work inside your working directory — it is your working copy of the project,
  and every relative path is resolved from it.
- Never step outside /workspace: it is the outer boundary of the machine you run on.
