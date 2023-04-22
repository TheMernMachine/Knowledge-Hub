const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type TodoList {
      _id: ID
      title: String
      todo: [String]
    }

    type Role {
        _id: ID
        name: String
        permissions: [String]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        fullName: String
        email: String
        password: String
        dateJoined: String
        status: String
        role: Role
        todoLists: [TodoList]
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: ID
        createdAt: String
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

    type Course {
        _id: ID
        title: String
        description: String
        price: Float
        content: [String]
        startDate: String
        endDate: String
    }

    type LessonNotes {
        _id: ID
        title: String
        content: String
        createdAt: String
        updatedAt: String
        comments: [Comment]
    }

    type Forum {
        _id: ID
        title: String
        postQuestion: String
        postAuthor: ID
        comments: [Comment]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(email: String!): User
        me: User
        getUser(_id: ID!): User

        assignments: [Assignments]
        assignment(_id: ID!): Assignments

        alert: [Alert]

        getTodoLists: [TodoList]
        getTodoList(_id: ID!): TodoList

        courses: [Course]
        course(_id: ID!): Course

        roles: [Role]
        role(_id: ID!): Role
        findRoleByName(name: String!): Role

        lessonNotes: [LessonNotes]
        lessonNote(_id: ID!): LessonNotes

        getLessonComments(_id: ID!): [Comment]
        getSingleLessonComment(_id: ID!, commentId: ID): Comment

        getForum: [Forum]
        getSingleForum(_id: ID!): Forum
        getForumComments(_id: ID!): [Comment]
        getSingleForumComment(_id: ID!, commentId: ID): Comment

    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, role: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String): User
        setUserStatus(_id: ID!, userId: ID!, status: String!): User

        addAssignment(title: String!, question: String!, due_date: String!, alert: String, assignmentResponse: String): Assignments
        updateAssignment(_id: ID!, title: String!, question: String!, due_date: String!, alert: String, assignmentResponse: String): Assignments
        deleteAssignment(_id: ID!): Assignments

        addAlert(message:String! ,severity:String!): Alert
        removeAlert(_id: ID!): Alert
        updateAlert(_id: ID!, message: String, severity: String): Alert

        addTodoList(title: String!, todos: String): TodoList
        updateTodoList(_id: ID!, title: String, todos: String): TodoList
        deleteTodoList(_id: ID!): TodoList
        
        addCourse(title: String!, description: String!, content: [String], startDate: String!, endDate: String!): Course
        updateCourse(_id: ID!, title: String!, description: String!, content: [String], startDate: String, endDate: String!): Course
        deleteCourse(_id: ID!): Course
        addRole(name: String!, permissions: [String]!): Role
        updateRole(_id: ID!, name: String, permissions: [String]): Role
        deleteRole(_id: ID!): Role
        addLessonNotes(title: String!, content: String!): LessonNotes
        updateLessonNotes(_id: ID!, title: String, content: String): LessonNotes
        deleteLessonNotes(_id: ID!): LessonNotes

        addLessonComment(_id: ID!, commentText: String!, commentAuthor: ID!): LessonNotes
        updateLessonComment(_id: ID!, commentId: ID!, commentText: String!, commentAuthor: ID!): Comment
        deleteLessonComment(_id: ID!, commentId: ID!): LessonNotes

        addForum(title: String!, postQuestion: String!, postAuthor: ID!): Forum
        updateForum(_id: ID!, title: String, postQuestion: String, postAuthor: ID!): Forum
        deleteForum(_id: ID!): Forum

        addForumComment(_id: ID!, commentText: String!, commentAuthor: ID!): Forum
        updateForumComment(_id: ID!, commentId: ID!, commentText: String!, commentAuthor: ID!): Comment
        deleteForumComment(_id: ID!, commentId: ID!): Forum
    }
`

module.exports = typeDefs;