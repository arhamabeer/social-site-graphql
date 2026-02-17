import express from "express";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import createApolloServer from "./graphql/index.js";
import { tokenCheck } from "./middlewares/auth.js";
import { Health } from "./services/health.js";

async function init() {
  const PORT = Number(process.env.PORT) || 8000;

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use(
    "/graphql",
    expressMiddleware(await createApolloServer(), {
      context: async ({ req }: any) => {
        const token = req.headers.authorization || "";
        return tokenCheck(token);
      },
    }),
  );

  app.get("/", (req, res) => {
    res.json("Hello, World!");
  });
  app.get("/health", async (req, res) => {
    const _uptimeS = Math.floor(process.uptime());
    const _uptimeM = Math.floor(_uptimeS / 60) || 0;
    const _uptimeH = Math.floor(_uptimeM / 60) || 0;
    const _uptimeD = Math.floor(_uptimeH / 24) || 0;
    const _uptime = `${_uptimeD}d ${_uptimeH}h ${_uptimeM}m ${_uptimeS}s`;
    try {
      await Health.healthCheck();

      res.status(200).json({
        server: "healthy",
        database: "connected",
        uptime: _uptime,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      res.status(500).json({
        server: "unhealthy",
        database: "disconnected",
        uptime: _uptime,
        timestamp: new Date().toLocaleString(),
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

init();
