const { Schema, model } = require('mongoose');
const { questionSchema } = require('./Questions');

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [questionSchema],
    due_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    quizResponse: [
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

    createQuiz: async (title, due_date, quizResponse) => {
        const quiz = await Quiz.create({ title, due_date, quizResponse });
        return quiz;
    },

    updateQuiz: async (args) => {
        const quiz = await Quiz.findByIdAndUpdate(args._id, args);
        return quiz;
    },

    deleteQuiz: async (quizId) => {
        const quiz = await Quiz.findByIdAndDelete(quizId);
        return quiz;
    },

    addQuizQuestion: async (quizId, title, options, answer) => {
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

};

module.exports = { Quiz, quizResolvers };
