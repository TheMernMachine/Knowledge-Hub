const { AuthenticationError } = require("apollo-server-express");
const { User, userResolvers, 
  Assignments, assignmentResolvers, 
  Course, courseResolvers,
  todoListSchema, todoResolvers,
  Alert, alertResolvers,
  Questions, questionResolvers,
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
        alert: async ()=>{
            return alertResolvers.getAlerts();
        },
        getTodoLists: async (parent, args) => {
            return todoResolvers.getTodoLists();
        },
        getTodoList: async (parent, {_id}, context) => {
            return todoResolvers.getTodoList(_id, context);
        },
        courses: async () => {
            return courseResolvers.getCourses();
        },
        course: async (parent, { _id }) => {
            return courseResolvers.getSingleCourse(_id);
        },
        questions: async () => {
            return questionResolvers.getQuestions();
        },
        question: async (parent, {_id }) =>{
            return questionResolvers.getSingleQuestion(_id);
        }
    },

 
        
    Mutation: {
        addQuestion: async (parent,{title, options,answer}) =>{
            return  questionResolvers.addQuestion(title, options,answer);
         },
         removeQuestion: async (parent,{ _id }) =>{
            return  questionResolvers.removeQuestion( _id );
         },
          updateQuestion: async (parent,{_id,title,optiions,answer}) =>{
            return  questionResolvers.updateQuestion({_id,title,optiions,answer});
         },
        addAlert: async (parent,args,{message, severity}) =>{
           return  alertResolvers.addAlert(message,severity);
        },
        removeAlert: async (parent,args,{ _id }) =>{
            return  alertResolvers.removeAlert( _id );
        },
         updateAlert: async (parent,{_id,message,severity}) =>{
            return  alertResolvers.updateAlert({_id,message,severity});
        },
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
            return assignmentResolvers.createAssignment({title, question, due_date, alert, assignmentResponse});
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
        addCourse: async (parent, { title, description, content, startDate, endDate}) => {
            return courseResolvers.createCourse(title, description, content, startDate, endDate);
        },
        updateCourse: async (parent, { _id, title, description, content, startDate, endDate }) => {
            return courseResolvers.updateCourse({ _id, title, description, content, startDate, endDate });
        },
        deleteCourse: async (parent, { _id }) => {
            return courseResolvers.deleteCourse({ _id });
        },
    },
};

module.exports = resolvers;
