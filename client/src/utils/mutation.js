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
  mutation signup($email: String, $password: String, $username: String) {
    signup(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: ID
    $title: String
    $authors: [String]
    $description: String
    $image: String
    $link: String
  ) {
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

