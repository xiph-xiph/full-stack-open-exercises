import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./models/User.js";
import typeDefs from "./typeDefs.js";
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.info("Succesfully connected to MongoDB");
  })
  .catch((error) => {
    console.error(`Could not connect to MongoDB: ${error}`);
  });
