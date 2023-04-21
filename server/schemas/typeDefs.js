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


    type Alert{
        _id: ID
        message: String
        severity: String       
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
        alert: [Alert]
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        addAssignment(title: String!, question: String!, due_date: String!, alert: String, assignmentResponse: String): Assignments
        updateAssignment(_id: ID!, title: String!, question: String!, due_date: String!, alert: String, assignmentResponse: String): Assignments
        deleteAssignment(_id: ID!): Assignments
        addAlert(message:String! ,severity:String!): Alert
        removeAlert(_id: ID!): Alert
        updateAlert(_id: ID!, message: String!, severity: String!): Alert
        
    }
`

module.exports = typeDefs;