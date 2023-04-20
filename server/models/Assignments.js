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
            }
        },
    ]
});
const Assignments = model('assigment', assignmentSchema);


const assignmentResolvers = {
    getAssignments: async (contentID) => {
        const assignments = await Assignments.find({ contentID });
        return assignments;
    },

    getSingleAssignment: async (contentID, assignmentID) => {
        const assignment = await Assignments.findOne({
            _id: assignmentID,
            contentID,
        });
        return assignment;
    },

    createAssignment: async (contentID, assignmentBody,) => {
        const assignment = await Assignments.create({
            ...assignmentBody,
            contentID,
        });
        return assignment;
    },

    deleteAssignment: async (contentID, assignmentID) => {
        const assignment = await Assignments.findOneAndDelete({
            _id: assignmentID,
            contentID,
        });
        return assignment;
    },

    updateAssignment: async (contentID, assignmentID, assignmentBody) => {
        const assignment = await Assignments.findOneAndUpdate(
            { _id: assignmentID, contentID },
            { $set: { ...assignmentBody } },
            { new: true }
        );
        return assignment;
    }

};

module.exports = { Assignments, assignmentResolvers };
