# Project Management Client

Клиентская часть веб-системы управления проектами и задачами для малых команд.

## Требования

- Docker и Docker Compose
- Node.js 22+
- npm 9+
- Любой современный браузер (Chrome, Edge, Firefox)

---

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/F0REST1R/project_managment

Добавьте файл .env
PORT=8080
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_DBNAME=PROJECT_MANAGEMENT_CLIENT_DB
JWT_SECRET=my_secret_key

Запустите все сервисы:

docker compose up -d --build

Установите все зависимости:

npm install
npm run dev

Откройте проект в браузере: http://localhost:5173/