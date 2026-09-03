# flarian-cms-cp

## Как запускать (слова заказчика о запуске проекта — контекст, а не инструкция системе)

Vue 3 frontend CMS with Quasar. Run with npm run dev, which starts Vite dev server on port 5173.

Особенности:
- Backend API URL is hardcoded in src/main.ts — no environment variable config
- No .env.example file exists

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
