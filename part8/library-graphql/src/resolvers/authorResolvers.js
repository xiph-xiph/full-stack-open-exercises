import { GraphQLError } from "graphql";

import Author from "../models/Author.js";
import Book from "../models/Book.js";

const authorResolvers = {
  Query: {
    authorCount: async () => (await Author.find({})).length,
    // Fetch all authors and all books in two queries, then count books per author in-memory.
    // Avoids N+1 by not querying the DB for each author's bookCount.
    allAuthors: async () => {
      const bookList = await Book.find({});
      let authorList = await Author.find({});
      authorList = authorList.map((author) => {
        const plainAuthor = author.toObject();
        return {
          ...plainAuthor,
          bookCount: bookList.reduce(
            (acc, book) =>
              book.author.toString() === author._id.toString() ? acc + 1 : acc,
            0
          ),
          id: plainAuthor._id,
        };
      });
      return authorList;
    },
  },
  Mutation: {
    editAuthor: async (root, { name, setBornTo }, context) => {
      try {
        if (!context.currentUser) {
          throw new Error("User is not logged in");
        }
        const newAuthor = await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true }
        );
        const bookList = await Book.find({});

        newAuthor.bookCount = bookList.reduce(
          (acc, book) =>
            book.author.toString() === newAuthor._id.toString() ? acc + 1 : acc,
          0
        );
        return newAuthor;
      } catch (error) {
        throw new GraphQLError(`Could not edit author: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
  },
};

export default authorResolvers;
