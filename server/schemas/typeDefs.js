const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
    }

    type Assignments {
        _id: ID
        title: String
        question: String
        due_date: String
        alert: String
        assignmentResponse: String
    }

    type Course {
        _id: ID
        title: String
        description: String
        price: Float
        content: [String]
        startDate: String
        endDate: String
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
        courses: [Course]
        course(_id: ID!): Course
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        addAssignment(title: String!, question: String!, due_date: String!, alert: String, assignmentResponse: String): Assignments
        updateAssignment(_id: ID!, title: String!, question: String!, due_date: String!, alert: String, assignmentResponse: String): Assignments
        deleteAssignment(_id: ID!): Assignments
        addCourse(title: String!, description: String!, content: [String], startDate: String!, endDate: String!): Course
        updateCourse(_id: ID!, title: String!, description: String!, content: [String], startDate: String!, endDate: String!): Course
        deleteCourse(_id: ID!): Course
    }
`

module.exports = typeDefs;