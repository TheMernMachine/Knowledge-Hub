const { Schema, model } = require('mongoose');

const assignmentSchema = new Schema({
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
        default: Date.now,
    },
    alert: {
        type: Schema.Types.ObjectId,
        ref: 'alert',
    },
    assignmentResponse: [
        {
            type: String,
            required: true,
            studentID: {
                type: Schema.Types.ObjectId,
                ref: 'User',
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
const Assignments = model('assigment', assignmentSchema);


const assignmentResolvers = {
    getAssignments: async () => {
        const assignments = await Assignments.find({});
        return assignments;
    },

    getSingleAssignment: async (args) => {
        const assignment = await Assignments.findById(args);
        return assignment;
    },

    createAssignment: async (title, question, due_date) => {
        const assignment = await Assignments.create({ title, question, due_date });
        return assignment;
    },

    updateAssignment: async (args) => {
        const assignments = await Assignments.findByIdAndUpdate(args._id, args);
        return assignments;
    },

    deleteAssignment: async (args) => {
        const assignments = await Assignments.findByIdAndDelete(args);
        return assignments;
    }

};

module.exports = { Assignments, assignmentResolvers };
