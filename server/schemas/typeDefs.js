// structure the data and where you write your mutation and queries in the backend 

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        bookId: ID
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBook: [Book]
    }

    type Query {
        user: User
    }

    type Auth {
        token: ID
        user: User
    }

    type Mutation {
        createUser(username: String, email: String, password: String): Auth
        saveBook(bookId: ID, title: String, authors: [String], description: String, image: String, link: String): User 
        login(username: String, password: String): Auth
        deleteBook(bookId: ID): User 
    }
`;

module.exports = typeDefs;