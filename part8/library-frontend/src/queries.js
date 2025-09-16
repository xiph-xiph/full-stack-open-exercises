import { gql } from "@apollo/client";

const bookDetails = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
    id
  }
`;

const authorDetails = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

export const editAuthorMutation = gql`
  mutation editAuthor($setBornTo: Int!, $name: String!) {
    editAuthor(setBornTo: $setBornTo, name: $name) {
      ...AuthorDetails
    }
  }
  ${authorDetails}
`;

export const newBookMutation = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${bookDetails}
`;

export const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const allBooksQuery = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${bookDetails}
`;

export const booksByGenreQuery = gql`
  query booksByGenre($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${bookDetails}
`;

export const authorsQuery = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${authorDetails}
`;

export const meQuery = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`;

export const bookAddedSubscription = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${bookDetails}
`;
