const { Schema, model } = require('mongoose');
const { questionSchema } = require('./Questions');
const dateFormat = require('../utils/dateFormat');
const { Course } = require('./Course');
const { QuizResponse } = require('./QuizResponse');
const { getGrade } = require('../utils/helpers');

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [questionSchema],
    dueDate: {
        type: Date,
        required: true,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    quizResponse: [QuizResponse.schema]
});

const Quiz = model('quiz', quizSchema);


const quizResolvers = {
    getQuizzes: async () => {
        const quiz = await Quiz.find({});
        return quiz;
    },

    getSingleQuiz: async (quizId) => {
        const quiz = await Quiz.findById(quizId);
        return quiz;
    },

    createQuiz: async ({ title, dueDate, courseId }) => {
        const quiz = await Quiz.create({ title, dueDate });
        await Course.findOneAndUpdate(
            { _id: courseId },
            { $push: { quiz: quiz._id } },
            { new: true }
        );
        return quiz;
    },

    updateQuiz: async (args) => {
        const quiz = await Quiz.findByIdAndUpdate(args._id, args);
        return quiz;
    },

    deleteQuiz: async (quizId, courseId) => {
        const quiz = await Quiz.findByIdAndDelete(quizId);
        await Course.findOneAndUpdate(
            { quiz: courseId },
            { $pull: { quiz: quizId } }
        );
        return quiz;
    },

    addQuizQuestion: async ({ quizId, title, options, answer }) => {
        return await Quiz.findOneAndUpdate(
            { _id: quizId },
            {
                $addToSet: {
                    questions: {
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

    updateQuizQuestion: async (quizId, questionId, title, options, answer) => {
        return await Quiz.findOneAndUpdate(
            { _id: quizId },
            {
                $set: {
                    questions: {
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

    deleteQuizQuestion: async (quizId, questionId) => {
        return await Quiz.findOneAndUpdate(
            { _id: quizId },
            {
                $pull: {
                    questions: {
                        _id: questionId,
                    },
                },
            },
            {
                new: true,
            }
        );
    },

    addQuizResponse: async ({ quizId, responses, student, rawScore }) => {
        const grade = getGrade(rawScore);
        const response = new QuizResponse({ responses, student, rawScore, grade });
        await Quiz.findByIdAndUpdate(quizId, { $push: { quizResponse: response } }, { new: true });

        return response;
    },

    getSingleQuizResponse: async (_id, quizId) => {
        const quiz = await Quiz.findOne({ _id: quizId });
        return quiz.quizResponse.id(_id);
    },

    getAllQuizResponses: async (quizId) => {
        const quiz = await Quiz.findOne({ _id: quizId });
        return quiz.quizResponse;
    },

    getQuizQuestions: async (quizId) => {
        const quiz = await Quiz.findOne({ _id: quizId });
        return quiz.questions;
    },

    getStudentQuizResponse: async ({ quizId, studentId }) => {
        const quiz = await Quiz.findOne({ _id: quizId });
        const quizResponse = quiz.quizResponse.filter((response) => response.student == studentId);
        return quizResponse[0] || {};
    }

};

module.exports = { Quiz, quizResolvers };
