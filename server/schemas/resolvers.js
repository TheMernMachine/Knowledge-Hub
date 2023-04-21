const { AuthenticationError } = require("apollo-server-express");
const { User, userResolvers, 
  Assignments, assignmentResolvers, 
  todoListSchema, todoResolvers,
} = require("../models");
const { signToken } = require("../utils/auth");


const resolvers = {
    
  Query: {
        users: async () => {
            return userResolvers.getAllUsers();
        },
        user: async (parent, { username }) => {
            return userResolvers.getSingleUser({ username });
        },
        me: async (parent, args, context) => {
            return userResolvers.getMe( args, context);
        },
        assignments: async () => {
            return assignmentResolvers.getAssignments();
        },
        assignment: async (parent, { _id }) => {
            return assignmentResolvers.getSingleAssignment({ _id });
        },
        getTodoLists: async (parent, args) => {
            return todoResolvers.getTodoLists();
        },
        getTodoList: async (parent, {_id}, context) => {
            return todoResolvers.getTodoList(_id, context);
        },
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, username, email, password }) => {
            return userResolvers.createUser({ firstName, lastName, username, email, password });
        },
        login: async (parent, { email, password }) => {
            return userResolvers.login({ email, password });
        },
        updateUser: async (parent, args, context) => {
            return userResolvers.updateUser(args, context);
        },
        addAssignment: async (parent, { title, question, due_date, alert, assignmentResponse }) => {
            return assignmentResolvers.createAssignment({ title, question, due_date, alert, assignmentResponse });
        },
        updateAssignment: async (parent, { _id, title, question, due_date, alert, assignmentResponse }) => {
            return assignmentResolvers.updateAssignment({ _id, title, question, due_date, alert, assignmentResponse });
        },
        deleteAssignment: async (parent, { _id }) => {
            return assignmentResolvers.deleteAssignment({ _id });
        },
        addTodoList: async (parent, {title, todos}, context) => {
            return todoResolvers.addTodoList(title, todos, context);
        },
        updateTodoList: async (parent, {id, title, todos}, context) => {
            return todoResolvers.updateTodoList(id, title, todos, context);
        },
        deleteTodoList: async (parent, {id}, context) => {
            return todoResolvers.deleteTodoList(id, title, todos, context);
        },

    },
};

module.exports = resolvers;
