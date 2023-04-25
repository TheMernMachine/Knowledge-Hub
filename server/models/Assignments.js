const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { alertResolvers } = require('./Alerts');
const { Course } = require('./Course');

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
    dueDate: {
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

    createAssignment: async (title, question, dueDate, courseId) => {
        // Updated this to create an alert when a new assignment is created
        const message = `Assignment Notice: ${title} is due on ${dueDate}`;
        const newAlert = await alertResolvers.addAlert(message, 'high');
        const alert = newAlert._id;
        const assignment = await Assignments.create({ title, question, dueDate, alert });

        await Course.findOneAndUpdate(
            { _id: courseId },
            { $push: { assignment: assignment._id } },
            { new: true }
        );

        return assignment;
    },

    updateAssignment: async (args) => {
        const assignments = await Assignments.findByIdAndUpdate(args._id, args);
        return assignments;
    },

    deleteAssignment: async ({ id, courseId }) => {
        const assignments = await Assignments.findByIdAndDelete({ _id: id });
        await Course.findOneAndUpdate(
            { _id: id },
            { $pull: { assignment: courseId } }
        );
        return assignments;
    },

};

module.exports = { Assignments, assignmentResolvers };
