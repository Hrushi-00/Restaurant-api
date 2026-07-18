# Production Deployment on Render

## CI Overview

- GitHub Actions runs `npm ci` and `npm test` on every pull request and push to `main`.
- Render handles deployment from the linked GitHub branch.

## Render Setup

1. Push this repo to GitHub.
2. In Render, create a new **Web Service** and connect the repo.
3. Use the blueprint in [render.yaml](/f:/restroflow-backend/render.yaml:1) or let Render read it from the repo root.
4. Set the service type to Node.
5. Use these commands if you configure the service manually:
   - Build Command: `npm ci`
   - Start Command: `npm start`
6. Add environment variables in the Render dashboard.

## Required Environment Variables

Set these on Render:

- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CLIENT_URL`

Optional, only if you use them:

- `REDIS_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `SENTRY_DSN`

## Notes

- Render provides `PORT` automatically for web services, and the app should read it from `process.env.PORT`.
- Render web services must bind to `0.0.0.0` and Render recommends using the `PORT` environment variable.
- After the first deploy, pushes to the linked branch can auto-deploy by default unless you turn auto-deploy off in Render.
- `npm test` is a smoke test that checks the HTTP root route.
