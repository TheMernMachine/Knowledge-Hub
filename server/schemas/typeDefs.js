const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type TodoList {
        _id: ID
        title: String
        todo: String
        priority: String
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
        username: String
        email: String
        password: String
        dateJoined: String
        status: String
        role: Role
        todoLists: [TodoList]
        students: [User]
        teacher: [User]
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: ID
        createdAt: String
        updatedAt: String
    }

    type Response {
        _id: ID
        responseText: String
        student: ID
        rawScore: Int
        grade: String
    }

    type QuizResponse {
        _id: ID
        responses: [String]
        student: ID
        rawScore: Float
        grade: String
    }

    type Alert {
        _id: ID
        message: String
        severity: String
    }

    type Assignments {
        _id: ID
        title: String
        question: String
        dueDate: String
        alert: Alert
        assignmentResponse: [Response]
    }

    type Course {
        _id: ID
        title: String
        description: String
        price: Float
        quiz: [Quiz]
        assignment: [Assignments]
        lessonNotes: [LessonNotes]
        startDate: String
        endDate: String
        teacher: User
        students: [User]
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

    type Quiz {
        _id: ID
        title: String
        questions: [Questions]
        dueDate: String
        quizResponse: [QuizResponse]
    }

    type Questions {
        _id: ID
        title: String
        options: [String]
        answer: String
    }

    type Question {
        title: String
        options: [String]
        answer: String
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
        getAllAssignmentResponse(assignmentId: ID!): [Response]
        getSingleAssignmentResponse(_id: ID!, assignmentId: ID!): Response

        alert: [Alert]

        getAllTodoLists: [TodoList]
        getUserTodoLists(_id: ID!): [TodoList]
        getSingleTodoList(_id: ID!): TodoList

        courses: [Course]
        course(_id: ID!): Course
        userCourses: [Course]

        roles: [Role]
        role(_id: ID!): Role
        findRoleByName(name: String!): Role

        lessonNotes: [LessonNotes]
        lessonNote(_id: ID!): LessonNotes

        getLessonComments(_id: ID!): [Comment]
        getSingleLessonComment(_id: ID!, commentId: ID!): Comment

        getForum: [Forum]
        getSingleForum(_id: ID!): Forum
        getForumComments(_id: ID!): [Comment]
        getSingleForumComment(_id: ID!, commentId: ID): Comment

        getQuiz: [Quiz]
        getSingleQuiz(_id: ID!): Quiz
        getQuizQuestions(_id: ID!): [Questions]
        getSingleQuizResponse(_id: ID!, quizId: ID!): QuizResponse
        getAllQuizResponses(quizId: ID!): [QuizResponse]
        getStudentQuizResponse(quizId: ID!, studentId: ID!): QuizResponse
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, role: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String, profilePic: String): User
        setUserStatus(_id: ID!, userId: ID!, status: String!): User

        addAssignment(title: String!, question: String!, dueDate: String!, courseId: ID!): Assignments
        updateAssignment(_id: ID!, title: String, question: String, dueDate: String): Assignments
        deleteAssignment(_id: ID!, courseId: ID!): Assignments
        addAssignmentResponse(assignmentId: ID!, responseText: String!, student: ID!): Assignments
        gradeAssignmentResponse(assignmentId: ID!, responseId: ID!, rawScore: Int!): Assignments

        addAlert(message:String! ,severity:String!): Alert
        removeAlert(_id: ID!): Alert
        updateAlert(_id: ID!, message: String, severity: String): Alert

        addTodoList(userId: ID!, title: String!, todo: String!, priority: String!): TodoList
        updateTodoList(_id: ID!, title: String, todo: String, priority: String): TodoList
        deleteTodoList(_id: ID!): TodoList
        
        addCourse(title: String!, description: String!, startDate: String!, endDate: String!, price: Float!, teacher: ID!): Course
        updateCourse(_id: ID!, title: String, description: String, price: Float, startDate: String, endDate: String): Course
        addStudentToCourse(courseId: ID!, studentId: ID!): Course
        deleteCourse(_id: ID!): Course

        addRole(name: String!, permissions: [String]!): Role
        updateRole(_id: ID!, name: String, permissions: [String]): Role
        deleteRole(_id: ID!): Role

        addLessonNotes(title: String!, content: String!, courseId: ID!): LessonNotes
        updateLessonNotes(_id: ID!, title: String, content: String): LessonNotes
        deleteLessonNotes(_id: ID!): LessonNotes

        addLessonComment(_id: ID!, commentText: String!, commentAuthor: ID!): LessonNotes
        updateLessonComment(_id: ID!, commentId: ID!, commentText: String!): LessonNotes
        deleteLessonComment(_id: ID!, commentId: ID!): LessonNotes

        addForum(title: String!, postQuestion: String!, postAuthor: ID!): Forum
        updateForum(_id: ID!, title: String, postQuestion: String, postAuthor: ID!): Forum
        deleteForum(_id: ID!): Forum

        addForumComment(_id: ID!, commentText: String!, commentAuthor: ID!): Forum
        updateForumComment(_id: ID!, commentId: ID!, commentText: String!): Forum
        deleteForumComment(_id: ID!, commentId: ID!): Forum

        addQuiz(title: String!, dueDate: String!, courseId: ID!): Quiz
        updateQuiz(_id: ID!, title: String, dueDate: String): Quiz
        deleteQuiz(_id: ID!, courseId: ID!): Quiz
        addQuizResponse(quizId: ID!, responses: [String]!, student: ID!, rawScore: Float!): QuizResponse

        addQuizQuestion(_id: ID!, title: String!, options: [String]!, answer: String!): Quiz
        updateQuizQuestion(_id: ID!, questionId: ID!, title: String, options: [String], answer: String): Quiz
        deleteQuizQuestion(_id: ID!, questionId: ID!): Quiz
        addQuizAndQuestions(title: String!, dueDate: String!, courseId: ID!, questionTitle: String!, questionOptions: [String]!, questionAnswer: String!): Quiz
    }
`

module.exports = typeDefs;