import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const userResolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    createUser: async (root, { username, favoriteGenre, password }) => {
      try {
        const passwordHash = await bcrypt.hash(password, 10);
        let newUser = new User({ username, passwordHash, favoriteGenre });
        newUser = await newUser.save();
        return {
          username: newUser.username,
          favoriteGenre: newUser.favoriteGenre,
          id: newUser._id,
        };
      } catch (error) {
        throw new GraphQLError("Could not create new user", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new GraphQLError("Could not find user", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
      const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
      if (!passwordCorrect) {
        throw new GraphQLError("Password is incorrect", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

export default userResolvers;
