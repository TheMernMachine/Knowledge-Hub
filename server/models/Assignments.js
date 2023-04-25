const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { alertResolvers } = require('./Alerts');

const assignmentSchema = new Schema({
    // Update to required field once we have the context working
    examiner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true,
        get: (timestamp) => dateFormat(timestamp),
    },
    alert: {
        type: Schema.Types.ObjectId,
        ref: 'alert',
    },
    assignmentResponse: [
        {
            responseText: {
                type: String,
            },
            studentID: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
            rawScore: {
                type: Number
            },
            grade: {
                type: String
            },
        },
    ],

});

const Assignments = model('assignment', assignmentSchema);


const assignmentResolvers = {
    getAssignments: async () => {
        const assignments = await Assignments.find({}).populate('alert');
        return assignments;
    },

    getSingleAssignment: async (args) => {
        const assignment = await Assignments.findById(args).populate('alert');
        return assignment;
    },

    createAssignment: async (title, question, due_date) => {
        // Updated this to create an alert when a new assignment is created
        const message = `Assignment Notice: ${title} is due on ${due_date}`;
        const newAlert = await alertResolvers.addAlert(message, 'high');
        const alert = newAlert._id;
        return await Assignments.create({ title, question, due_date, alert });
    },

    updateAssignment: async (args) => {
        const assignments = await Assignments.findByIdAndUpdate(args._id, args);
        return assignments;
    },

    deleteAssignment: async (args) => {
        const assignments = await Assignments.findByIdAndDelete(args);
        return assignments;
    },

};

module.exports = { Assignments, assignmentResolvers };
