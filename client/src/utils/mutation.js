import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String, $password: String, $username: String) {
    createUser(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBook {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookID: ID) {
    _id
    username
    email
    savedBooks {
      bookId
      authors
      title
      link
      description
      image
    }
  }
`;

