import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { prismaClient } from "./lib/db.js";

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
      type Mutation {
        createUser(firstName: String!, email: String!, password: String!) : Boolean
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello, GraphQL!",
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            email,
            password,
          }: { firstName: string; email: string; password: string },
        ) => {
          console.log("mutation => ", firstName, email, typeof password);
          await prismaClient.user.create({
            data: {
              email,
              firstName,
              password,
              salt: "12asd3r4freg54gh76n7mim98kk90ljh",
            },
          });
          return true;
        },
      },
    },
  });

  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));
  app.get("/", (req, res) => {
    res.json("Hello, World!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

init();
