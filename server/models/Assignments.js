const { Schema, model } = require('mongoose');
const { questionSchema } = require('./Questions');

const assignmentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    question: [questionSchema],
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

    createAssignment: async (title, due_date, alert, assignmentResponse) => {
        const assignment = await Assignments.create({ title, due_date, alert, assignmentResponse });
        return assignment;
    },

    updateAssignment: async (args) => {
        const assignments = await Assignments.findByIdAndUpdate(args._id, args);
        return assignments;
    },

    deleteAssignment: async (args) => {
        const assignments = await Assignments.findByIdAndDelete(args);
        return assignments;
    },

    getAssignmentQuestions: async (assigmentId) => {
        const assignment = await Assignments.findById(assigmentId);
        return assignment.question;
    },

    getSingleAssignmentQuestion: async (assignmentId, questionId) => {
        const assigment = await Assignments.findOne({ _id: forumId });
        const questions = Assignments.question.filter((question) => question._id.equals(questionId));
        return questions[0];
    },

    addAssignmentQuestion: async (assignmentId, title, options, answer) => {
        return await Assignments.findOneAndUpdate(
            { _id: assignmentId },
            {
                $addToSet: {
                    question: {
                        title,
                        options,
                        answer,
                    },
                },
            },
            {
                new: true,
                runValidators: true
            }
        );
    },

    updateAssignmentQuestion: async (assignmentId, questionId, title, options, answer) => {
        return await Assignments.findOneAndUpdate(
            { _id: assignmentId },
            {
                $set: {
                    question: {
                        _id: questionId,
                        title,
                        options,
                        answer,
                    },
                },
            },
            {
                new: true,
            }
        )
    },

    deleteAssignmentQuestion: async (assignmentId, questionId) => {
        return await Assignments.findOneAndUpdate(
            { _id: assignmentId },
            {
                $pull: {
                    question: {
                        _id: questionId,
                    },
                },
            },
            {
                new: true,
            }
        );
    },

};

module.exports = { Assignments, assignmentResolvers };
