# IASA-Champ-24

## Deploying with Docker

### Development

Copy .env.example as .env and edit the necessary variables.

``docker compose up --build``

Frontend part of the application is available on port $FRONTEND_PORT (default: 3000).
Backend part of the application is available on port $BACKEND_PORT (default: 8000).

### Production

Copy .env.prod.example as .env.prod and ./frontend/.env.example as ./frontend/.env and edit the necessary variables.

``docker compose -f docker-compose.prod.yml --env-file .env.prod up --build``

The application is available on port 8080. Accessing backend is possible on the /api root.