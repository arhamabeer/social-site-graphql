import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

async function init() {
  const PORT = Number(process.env.PORT) || 8000;

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello, GraphQL!",
      },
    },
  });

  await gqlServer.start();

  app.get("/graphql", expressMiddleware(gqlServer));
  app.get("/", (req, res) => {
    res.json("Hello, World!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

init();
