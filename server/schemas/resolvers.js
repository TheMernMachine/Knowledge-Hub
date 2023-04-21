const { AuthenticationError } = require("apollo-server-express");
const { User, userResolvers, Assignments, assignmentResolvers,Alert, alertResolvers } = require("../models");
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

      
    },

    //queries fetch data
    //mutations change data
        
    Mutation: {

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
            return assignmentResolvers.createAssignment({ title, question, due_date, alert, assignmentResponse });
        },
        updateAssignment: async (parent, { _id, title, question, due_date, alert, assignmentResponse }) => {
            return assignmentResolvers.updateAssignment({ _id, title, question, due_date, alert, assignmentResponse });
        },
        deleteAssignment: async (parent, { _id }) => {
            return assignmentResolvers.deleteAssignment({ _id });
        }

    },
};

module.exports = resolvers;
