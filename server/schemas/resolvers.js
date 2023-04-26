const { AuthenticationError } = require("apollo-server-express");
const { User, userResolvers,
    Assignments, assignmentResolvers,
    Course, courseResolvers,
    todoListSchema, todoResolvers,
    Alerts, alertResolvers,
    Role, roleResolvers,
    LessonNotes, lessonNotesResolvers,
    Forum, forumResolvers,
    Quiz, quizResolvers,
} = require("../models");
const { signToken } = require("../utils/auth");


const resolvers = {

    Query: {
        users: async () => {
            return userResolvers.getAllUsers();
        },
        user: async (parent, { email }) => {
            return userResolvers.getSingleUser(email);
        },
        getUser: async (parent, { _id }) => {
            return userResolvers.getUser(_id);
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return userResolvers.getUser(context.user._id);
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        assignments: async () => {
            return assignmentResolvers.getAssignments();
        },
        assignment: async (parent, { _id }) => {
            return assignmentResolvers.getSingleAssignment({ _id });
        },
        getSingleAssignmentResponse: async (parent, { _id, assignmentId }) => {
            return assignmentResolvers.getSingleAssignmentResponse(_id, assignmentId);
        },
        getAllAssignmentResponse: async (parent, { assignmentId }) => {
            return assignmentResolvers.getAllAssignmentResponse(assignmentId);
        },
        alert: async () => {
            return alertResolvers.getAlerts();
        },

        // All Todo Lists
        getAllTodoLists: async () => {
            return todoResolvers.getAllTodoLists();
        },
        // Get all the todo lists for a specific user with the users Id
        getUserTodoLists: async (parent, { _id }) => {
            return todoResolvers.getUserTodoLists(_id);
        },
        // provide todo Id
        getSingleTodoList: async (parent, { _id }) => {
            return todoResolvers.getSingleTodoList(_id);
        },

        courses: async () => {
            return courseResolvers.getCourses();
        },
        course: async (parent, { _id }) => {
            return courseResolvers.getSingleCourse(_id);
        },

        roles: async () => {
            return roleResolvers.getRoles();
        },
        role: async (parent, { _id }) => {
            return roleResolvers.getSingleRole(_id);
        },
        findRoleByName: async (parent, { name }) => {
            return roleResolvers.findRoleByName(name);
        },

        lessonNotes: async () => {
            return lessonNotesResolvers.getLessonNotes();
        },
        lessonNote: async (parent, { _id }) => {
            return lessonNotesResolvers.getSingleLessonNote({ _id });
        },

        getLessonComments: async (parent, { _id }) => {
            return lessonNotesResolvers.getLessonComments(_id);
        },
        getSingleLessonComment: async (parent, { _id, commentId }) => {
            return lessonNotesResolvers.getSingleLessonComment(_id, commentId);
        },

        getForum: async () => {
            return forumResolvers.getAllForums();
        },
        getSingleForum: async (parent, { _id }) => {
            return forumResolvers.getSingeForum(_id);
        },
        getForumComments: async (parent, { _id }) => {
            return forumResolvers.getForumComments(_id);
        },
        getSingleForumComment: async (parent, { _id, commentId }) => {
            return forumResolvers.getSingleForumComment(_id, commentId);
        },

        getQuiz: async () => {
            return quizResolvers.getQuizzes();
        },
        getSingleQuiz: async (parent, { _id }) => {
            return quizResolvers.getSingleQuiz(_id);
        },

        getQuizQuestions: async (parent, { _id }) => {
            return quizResolvers.getQuizQuestions(_id);
        },

        getSingleQuizResponse: async (parent, { _id, quizId }) => {
            return quizResolvers.getSingleQuizResponse(_id, quizId);
        },

        getAllQuizResponses: async (parent, { quizId }) => {
            return quizResolvers.getAllQuizResponses(quizId);
        }
    },

    //queries fetch data
    //mutations change data

    Mutation: {

        addAlert: async (parent, args, { message, severity }) => {
            return alertResolvers.addAlert(message, severity);
        },
        removeAlert: async (parent, args, { _id }) => {
            return alertResolvers.removeAlert(_id);
        },
        updateAlert: async (parent, { _id, message, severity }) => {
            return alertResolvers.updateAlert({ _id, message, severity });
        },


        addUser: async (parent, { firstName, lastName, email, password, role }) => {
            return userResolvers.createUser({ firstName, lastName, email, password, role });
        },
        login: async (parent, { email, password }) => {
            return userResolvers.login({ email, password });
        },
        // Update to use context.user for front-end
        updateUser: async (parent, { _id, firstName, lastName, email, password }) => {
            return userResolvers.updateUser({ _id, firstName, lastName, email, password, profilePic });
            // if (context.user) {
            //     return userResolvers.updateUser(context.user._id, args);
            // }
            // throw new AuthenticationError('Not logged in');
        },
        setUserStatus: async (parent, { _id, userId, status }) => {
            return userResolvers.setUserStatus(_id, userId, status);
        },

        addAssignment: async (parent, { title, question, dueDate, courseId }) => {
            return assignmentResolvers.createAssignment(title, question, dueDate, courseId);
        },
        updateAssignment: async (parent, args) => {
            return assignmentResolvers.updateAssignment(args);
        },
        deleteAssignment: async (parent, { _id, courseId }) => {
            return assignmentResolvers.deleteAssignment({ _id, courseId });
        },
        addAssignmentResponse: async (parent, { assignmentId, responseText, student }) => {
            return assignmentResolvers.addAssignmentResponse({ assignmentId, responseText, student });
        },

        gradeAssignmentResponse: async (parent, { assignmentId, responseId, rawScore }) => {
            return assignmentResolvers.gradeAssignmentResponse({ assignmentId, responseId, rawScore });
        },

        addTodoList: async (parent, { _id, title, todo, priority }) => {
            return todoResolvers.addTodoList(_id, title, todo, priority);
        },
        updateTodoList: async (parent, args, context) => {
            // We can the user's information from the context
            let todoId = args._id;
            delete args._id;
            return todoResolvers.updateTodoList(todoId, args);
        },
        deleteTodoList: async (parent, { _id }) => {
            return todoResolvers.deleteTodoList(_id);
        },

        addCourse: async (parent, { title, description, startDate, endDate, price }) => {
            return courseResolvers.createCourse(title, description, startDate, endDate, price);
        },
        updateCourse: async (parent, args) => {
            return courseResolvers.updateCourse(args);
        },
        deleteCourse: async (parent, { _id }) => {
            return courseResolvers.deleteCourse({ _id });
        },

        addRole: async (parent, { name, permissions }) => {
            return roleResolvers.createRole(name, permissions);
        },
        updateRole: async (parent, { _id, name, permissions }) => {
            return roleResolvers.updateRole({ _id, name, permissions });
        },
        deleteRole: async (parent, { _id }) => {
            return roleResolvers.deleteRole({ _id });
        },

        addLessonNotes: async (parent, { title, content }) => {
            return lessonNotesResolvers.createLessonNotes(title, content);
        },
        updateLessonNotes: async (parent, { _id, title, content }) => {
            return lessonNotesResolvers.updateLessonNotes(_id, title, content);
        },
        deleteLessonNotes: async (parent, { _id }) => {
            return lessonNotesResolvers.deleteLessonNotes(_id);
        },

        addLessonComment: async (parent, { _id, commentText, commentAuthor }) => {
            return lessonNotesResolvers.addLessonComment(_id, commentText, commentAuthor);
        },
        updateLessonComment: async (parent, args, context) => {
            // We can get the user id from context when its available
            return lessonNotesResolvers.updateLessonComment(args._id, args.commentId, args.commentText);
        },
        deleteLessonComment: async (parent, { _id, commentId }) => {
            return lessonNotesResolvers.deleteLessonComment(_id, commentId);
        },

        addForum: async (parent, { title, postQuestion, postAuthor }) => {
            return forumResolvers.createForum(title, postQuestion, postAuthor);
        },
        updateForum: async (parent, { _id, title, postQuestion, postAuthor }) => {
            return forumResolvers.updateForum(_id, title, postQuestion, postAuthor);
        },
        deleteForum: async (parent, { _id }) => {
            return forumResolvers.deleteForum(_id);
        },

        addForumComment: async (parent, { _id, commentText, commentAuthor }) => {
            return forumResolvers.addForumComment(_id, commentText, commentAuthor);
        },
        updateForumComment: async (parent, args, context) => {
            return forumResolvers.updateForumComment(args._id, args.commentId, args.commentText);
        },
        deleteForumComment: async (parent, { _id, commentId }) => {
            return forumResolvers.deleteForumComment(_id, commentId);
        },

        addQuiz: async (parent, { title, dueDate, courseId }) => {
            return quizResolvers.createQuiz(title, dueDate, courseId);
        },
        updateQuiz: async (parent, { _id, title, questions }) => {
            return quizResolvers.updateQuiz({ _id, title, questions });
        },
        deleteQuiz: async (parent, { _id }) => {
            return quizResolvers.deleteQuiz(_id);
        },

        addQuizResponse: async (parent, { quizId, responses, student, rawScore }) => {
            return quizResolvers.addQuizResponse({ quizId, responses, student, rawScore });
        },

        // gradeQuizResponse: async (parent, { quizId, responseId, rawScore }) => {
        //     return quizResolvers.gradeQuizResponse({ quizId, responseId, rawScore });
        // },

        addQuizQuestion: async (parent, { _id, title, options, answer }) => {
            return quizResolvers.addQuizQuestion(_id, title, options, answer);
        },
        updateQuizQuestion: async (parent, { _id, questionId, title, options, answer }) => {
            return quizResolvers.updateQuizQuestion(_id, questionId, title, options, answer);
        },
        deleteQuizQuestion: async (parent, { _id, questionId }) => {
            return quizResolvers.deleteQuizQuestion(_id, questionId);
        },

    },
};

module.exports = resolvers;
