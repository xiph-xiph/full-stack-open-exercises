import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import Book from "./models/Book.js";
import Author from "./models/Author.js";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

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
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let queryResult = [...books];
      if (args.author) {
        queryResult = queryResult.filter((book) => book.author === args.author);
      }
      if (args.genre) {
        queryResult = queryResult.filter((book) =>
          book.genres.includes(args.genre)
        );
      }
      return queryResult;
    },
    allAuthors: () =>
      authors.map((author) => {
        return {
          ...author,
          bookCount: books.reduce(
            (total, book) => (book.author === author.name ? total + 1 : total),
            0
          ),
        };
      }),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });
        author = await newAuthor.save();
      }
      console.log(author);
      const newBook = new Book({ ...args, author: author._id });
      const savedBook = await newBook.save();

      return savedBook;
    },
    editAuthor: (root, args) => {
      const foundAuthor = authors.find((author) => author.name === args.name);
      if (!foundAuthor) return null;
      foundAuthor.born = args.setBornTo;
      return {
        ...foundAuthor,
        bookCount: books.reduce(
          (total, book) =>
            book.author === foundAuthor.name ? total + 1 : total,
          0
        ),
      };
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
