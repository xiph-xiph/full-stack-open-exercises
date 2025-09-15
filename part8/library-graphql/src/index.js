import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { GraphQLError } from "graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import Book from "./models/Book.js";
import Author from "./models/Author.js";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => (await Book.find({})).length,
    authorCount: async () => (await Author.find({})).length,
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
    editAuthor: async (root, args) => {
      try {
        const newAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
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
        throw new GraphQLError("Could not edit author", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.info("Succesfully connected to MongoDB");
  })
  .catch((error) => {
    console.error(`Could not connect to MongoDB: ${error}`);
  });
