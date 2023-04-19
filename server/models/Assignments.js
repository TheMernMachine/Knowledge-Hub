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
            studentID: ID, //CREATES A ID FOR THE STUDENT
        },
    ]
});

const assignmentResolvers = {};

const Assignments = model('assigment', assignmentSchema);
module.exports = {Assignments, assignmentResolvers};
