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

## Run

### Frontend

Set up .env in the frontened directory from example with port http://localhost:5000 as API path

```
npm i
npm start
```

### Backend

Download and unpack prediction models https://github.com/Nester44/IASA-Champ-24/releases/tag/v1.0.0-models. Set up .env file in backend folder with CITIES variable copied from the example.

```flask run```