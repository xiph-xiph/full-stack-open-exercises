import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import User from "./models/User.js";
import typeDefs from "./schema.js";
import bookResolvers from "./resolvers/bookResolvers.js";
import authorResolvers from "./resolvers/authorResolvers.js";
import userResolvers from "./resolvers/userResolvers.js";
import "dotenv/config";

const resolvers = {
  Query: {
    ...bookResolvers.Query,
    ...authorResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...bookResolvers.Mutation,
    ...authorResolvers.Mutation,
    ...userResolvers.Mutation,
  },
  Subscription: {
    ...bookResolvers.Subscription,
  },
};

console.log("Connecting to MongoDB...");
await mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
console.log("Succesfully connected to MongoDB");

const app = express();

const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/",
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth?.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        );
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
  })
);

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
