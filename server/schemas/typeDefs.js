const { gql } = require('apollo-server-express');

const typeDefs = gql`
{  
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String!
  }

  type Course {
    _id: ID!
    title: String!
    description: String!
    price: Int!
    content: [ String! ]
    startDate: Date!
    teacher: User
    students: [ User ]
  }

  type Lesson {
    _id: ID!
    title: String!
    content: String!
    comments: [ Comments ]
  }

  type Assignment {
    _id: ID!
    title: String!
    question: String!
    due_date: Date!
    alert: { Alerts }
    assignmentResponse: [ String! ]
  }

  type Forum {
    _id: ID!
    title: String!
    description: String!
    comments: [ commentSchema ]
  }

  type Query {
    users: [User]
    user(_id: ID!, firstName: String!, lastName: String!): User
    courses: [Course]
    course(_id: ID!, title: String!): Course
    lessonNote(_id: ID!, title: String!): LessonNotes
    assignments(due_date: Date!): [Assignment]
    assignment(_id: ID!): Assignment
    forums: Forum
    forum(_id: ID!): Forum
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, role: String!): Auth
    updateUser(firstName: String!. lastName: String!, email: String!, password: String!, role: String!): User
    login(email: String!, password: String!): Auth
    addCourse()
  }
}
`