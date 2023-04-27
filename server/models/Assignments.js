const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { alertResolvers } = require('./Alerts');
const { Course } = require('./Course');
const { Response } = require('./Response');
const { getGrade } = require('../utils/helpers');

const assignmentSchema = new Schema({
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
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    alert: {
        type: Schema.Types.ObjectId,
        ref: 'alert',
    },
    assignmentResponse: [Response.schema]

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

    createAssignment: async ({ title, question, dueDate, courseId }) => {
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
        const assignments = await Assignments.findByIdAndUpdate(args._id, args, { new: true });
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

    addAssignmentResponse: async ({ assignmentId, responseText, student }) => {
        const response = new Response({ responseText, student });

        const updateAssignment = await Assignments.findByIdAndUpdate(assignmentId, { $push: { assignmentResponse: response } }, { new: true }).populate('alert');

        return updateAssignment;
    },

    gradeAssignmentResponse: async ({ assignmentId, responseId, rawScore }) => {
        const assignment = await Assignments.findOne({ _id: assignmentId });
        const response = assignment.assignmentResponse.id(responseId);
        const updatedResponse = {
            _id: responseId,
            responseText: response.responseText,
            student: response.student,
            rawScore: rawScore,
            grade: getGrade(rawScore)
        };

        response.set(updatedResponse);
        return await assignment.save();
    },

    getSingleAssignmentResponse: async (_id, assignmentId) => {
        const assignment = await Assignments.findOne({ _id: assignmentId }).populate('alert');
        return assignment.assignmentResponse.id(_id);
    },

    getAllAssignmentResponse: async (assignmentId) => {
        const assignment = await Assignments.findOne({ _id: assignmentId }).populate('alert');
        return assignment.assignmentResponse;
    }

};

module.exports = { Assignments, assignmentResolvers };
