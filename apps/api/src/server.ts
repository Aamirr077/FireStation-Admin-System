import express from "express";
import { corsMw } from "./middleware/cors.js";

import authRoutes from "./modules/auth/auth.routes.js";
import incidentsRoutes from "./modules/incidents/incidents.routes.js";
import vehiclesRoutes from "./modules/vehicles/vehicles.routes.js";
import DriverRoutes from "./modules/drivers/drivers.routes.js";
import dispatchRoutes from "./modules/dispatch/dispatch.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";

export function makeServer() {
  const app = express();

  app.use(corsMw);
  app.options("*", corsMw);

  app.use(express.json({ limit: "1mb" }));

  app.get("/", (_req, res) => {
    res.send("Firestation API OK 🔥");
  });

  app.get("/health", (_req, res) => res.json({ ok: true }));

  // ROUTES
  app.use("/auth", authRoutes);
  app.use("/incidents", incidentsRoutes);
  app.use("/vehicles", vehiclesRoutes);
  app.use("/drivers", DriverRoutes);
  app.use("/dispatch", dispatchRoutes);
  app.use("/dashboard", dashboardRoutes);

  // ERROR HANDLER
  app.use((err: any, _req: any, res: any, _next: any) => {
    const status = err?.status || 500;

    res.status(status).json({
      error: err?.message || "Server error",
      details: err?.details,
    });
  });

  return app;
}