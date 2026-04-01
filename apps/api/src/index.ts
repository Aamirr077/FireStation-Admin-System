import { env } from "./config/env.js";
import { makeServer } from "./server.js";


const app = makeServer();

app.listen(env.API_PORT, "0.0.0.0", () => {
  console.log(`[api] listening on :${env.API_PORT}`);
});

