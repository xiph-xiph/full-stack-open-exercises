import { gql } from "@apollo/client";

export const editAuthorMutation = gql`
  mutation editAuthor($setBornTo: Int!, $name: String!) {
    editAuthor(setBornTo: $setBornTo, name: $name) {
      name
      born
      bookCount
      id
    }
  }
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
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

export const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const booksQuery = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

export const authorsQuery = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
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
