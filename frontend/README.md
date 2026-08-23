# Multi Disease Prediction Frontend

React + Vite user interface for the existing FastAPI prediction API. The backend is intentionally unchanged.

## Run it locally

1. Install the current Node.js LTS release from https://nodejs.org if `node --version` does not work.
2. In this `frontend` folder, run `npm install` once.
3. Start the backend from the project root with `fastapi dev backend/main.py`.
4. In a second terminal, run `npm run dev` from `frontend`.
5. Open the shown localhost address (normally `http://localhost:5173`).

The Vite development proxy forwards `/prediction/*` requests to `http://127.0.0.1:8000`, so no backend CORS change is needed during development.

## Included routes

- `/prediction/diabetes` — 8 numeric inputs
- `/prediction/heart` — 13 numeric inputs
- `/prediction/parkinsons` — 22 numeric inputs

Brain Tumor is intentionally only shown as a future dashboard card; image upload and CNN work belong to Phase 2.
