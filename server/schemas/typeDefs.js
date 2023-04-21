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


    type Alert{
        _id: ID
        message: String
        severity: String       
}
    type Question{
        _id: ID
        title: String
        options: [String]
        answer:String
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
        alert: [Alert]
        getTodoLists: [TodoList]
        getTodoList(_id: ID!): TodoList
        courses: [Course]
        course(_id: ID!): Course
        question(_id: ID!): Question
        questions:[Question]
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
        addTodoList(title: String!, todos: [String]): TodoList
        updateTodoList(_id: ID!, title: String!, todos: [String]): TodoList
        deleteTodoList(_id: ID!): TodoList
        addCourse(title: String!, description: String!, content: [String], startDate: String!, endDate: String!): Course
        updateCourse(_id: ID!, title: String!, description: String!, content: [String], startDate: String!, endDate: String!): Course
        deleteCourse(_id: ID!): Course
        updateQuestion(_id: ID!, title: String!, options: String!, answer: String!): Question
        removeQuestion(_id: ID!): Question
        addQuestion(title:String!,options: String!, answer: String!): Question
    }
`

module.exports = typeDefs;