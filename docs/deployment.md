# Docker CI/CD

## Pipeline Overview

- GitHub Actions runs `npm ci` and `npm test` on every pull request and push to `main`.
- The Docker image is built from `docker/Dockerfile` on every run.
- On pushes to `main`, the image is published to GitHub Container Registry as `ghcr.io/<owner>/<repo>:latest` and `ghcr.io/<owner>/<repo>:<sha>`.
- On pushes to `main`, GitHub Actions also SSHes into EC2 and restarts the container with the newest image.

## Local Development

Use Docker Compose to run the API with MongoDB and Redis:

```bash
docker compose up --build
```

The API will be available on `http://localhost:5000`.

## Production Deployment

1. Push the repo to GitHub.
2. Let GitHub Actions publish the image to GHCR on `main`.
3. On your server, pull the image and run it with the required environment variables.

Example:

```bash
docker pull ghcr.io/<owner>/<repo>:latest
docker run -d \
  --name restroflow-backend \
  -p 5000:5000 \
  -e NODE_ENV=production \
  -e PORT=5000 \
  -e MONGO_URI="mongodb://your-mongo-host:27017/restroflow" \
  -e JWT_ACCESS_SECRET="..." \
  -e JWT_REFRESH_SECRET="..." \
  -e CLIENT_URL="https://your-frontend.example" \
  ghcr.io/<owner>/<repo>:latest
```

If you prefer Docker Compose on the server, use the same image in your `docker-compose.yml` and keep the env vars in an `.env` file.

## GitHub Actions Secrets

For the EC2 auto-deploy job, add these repository secrets:

- `SSH_HOST`
- `SSH_USER`
- `SSH_KEY`
- `DEPLOY_PATH`
- `GHCR_PAT`

The app runtime secrets can stay in repository secrets too:

- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CLIENT_URL`
- `REDIS_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

## Required Environment Variables

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

## Notes

- The app reads `PORT` from the environment and binds to `0.0.0.0`.
- The container image includes a healthcheck against `/`.
- `npm test` is a smoke test that checks the HTTP root route.
- The deploy job writes an `.env` file into `DEPLOY_PATH` on the EC2 host before restarting the container.
