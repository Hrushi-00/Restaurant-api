# Production Deployment

## CI/CD Overview

- GitHub Actions runs `npm ci` and `npm test` on every pull request and push to `main`.
- On a successful push to `main`, the workflow connects to your server over SSH.
- The server does a `git pull`, reinstalls dependencies, runs the smoke test, and restarts the app.

## Secrets to Add in GitHub

- `SSH_HOST`
- `SSH_USER`
- `SSH_KEY`
- `SSH_PORT` optional, defaults to `22`
- `APP_DIR`

## One-Time Server Setup

Use an Ubuntu server as the example here.

```bash
sudo apt update
sudo apt install -y git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Then clone the repo into your app directory:

```bash
git clone <your-repo-url> /opt/restroflow-backend
cd /opt/restroflow-backend
cp .env.example .env
npm ci --omit=dev
```

Edit `.env` and fill in your real values, especially:

- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CLIENT_URL`

## Server Setup With PM2

1. Install Node.js 20+ on the server.
2. Clone the repository to the directory stored in `APP_DIR`.
3. Create the `.env` file in that directory.
4. Install dependencies with `npm ci --omit=dev`.
5. Start the app with:

```bash
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

6. On later deployments, the GitHub Action will reload the same PM2 process.

### Useful PM2 Commands

```bash
pm2 status
pm2 logs restroflow-backend
pm2 restart restroflow-backend
pm2 save
```

## Systemd Alternative

If you do not want PM2, use the service file in `deploy/restroflow-backend.service`.

1. Copy it to `/etc/systemd/system/restroflow-backend.service`.
2. Update `User` and `WorkingDirectory` to match your server.
3. Run:

```bash
sudo systemctl daemon-reload
sudo systemctl enable restroflow-backend
sudo systemctl start restroflow-backend
sudo systemctl status restroflow-backend
```

## GitHub Action Flow

On each push to `main`:

1. GitHub Actions installs dependencies and runs `npm test`.
2. If tests pass, it SSHs into your server.
3. The server updates the repo with `git pull`.
4. Dependencies are refreshed with `npm ci --omit=dev`.
5. The app restarts through PM2 or the fallback `node` process.

## Notes

- The app expects MongoDB and any other external services to be reachable from the server.
- `npm test` is a smoke test that checks the HTTP root route.
- If you want a more advanced health check, we can add `/health` and point CI at that route.
