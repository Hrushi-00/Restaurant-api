import assert from "node:assert/strict";
import { createServer } from "node:http";

process.env.NODE_ENV = "test";
process.env.DISABLE_DOTENV = "true";
delete process.env.REDIS_URL;

const { default: app } = await import("../src/app.js");

const startServer = async () =>
  new Promise((resolve) => {
    const server = createServer(app);

    server.listen(0, () => resolve(server));
  });

const stopServer = async (server) =>
  new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

const server = await startServer();

try {
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.message, "RestroFlow API is Running");

  console.log("Smoke test passed");
} finally {
  await stopServer(server);
}
