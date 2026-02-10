import express from "express";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import createApolloServer from "./graphql/index.js";

async function init() {
  const PORT = Number(process.env.PORT) || 8000;

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/graphql", expressMiddleware(await createApolloServer()));

  app.get("/", (req, res) => {
    res.json("Hello, World!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

init();
