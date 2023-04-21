const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type TodoList {
      _id: ID
      title: String
      todo: [String]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
        todolists: [TodoList]
    }

    type Assignments {
        _id: ID
        title: String
        question: String
        due_date: String
        alert: String
        assignmentResponse: String
    }

     type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        me: User
        assignments: [Assignments]
        assignment(_id: ID!): Assignments
        getTodoLists: [TodoList]
        getTodoList(_id: ID!): TodoList
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        addAssignment(title: String!, question: String!, due_date: String!, alert: String, assignmentResponse: String): Assignments
        updateAssignment(_id: ID!, title: String!, question: String!, due_date: String!, alert: String, assignmentResponse: String): Assignments
        deleteAssignment(_id: ID!): Assignments
        addTodoList(title: String!, todos: [String]): TodoList
        updateTodoList(_id: ID!, title: String!, todos: [String]): TodoList
        deleteTodoList(_id: ID!): TodoList
    }
`

module.exports = typeDefs;