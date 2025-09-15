import { GraphQLError } from "graphql";

import Book from "../models/Book.js";
import Author from "../models/Author.js";

const bookResolvers = {
  Query: {
    bookCount: async () => (await Book.find({})).length,
    allBooks: async (root, args) => {
      const queryArgs = {};
      if (args.author) {
        queryArgs.author = (await Author.findOne({ name: args.author }))._id;
      }
      if (args.genre) {
        queryArgs.genres = args.genre;
      }
      const queryResult = await Book.find(queryArgs).populate("author");
      return queryResult;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          author = await newAuthor.save();
        }
        const newBook = new Book({ ...args, author: author._id });
        const savedBook = await newBook.save();
        await savedBook.populate("author");
        return savedBook;
      } catch (error) {
        throw new GraphQLError("Could not add book", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
  },
};

export default bookResolvers;
