const { Schema, model } = require('mongoose');

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'question',
        },
    ],
    due_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const quizResolvers = {};

const Quiz = model('quiz', quizSchema);
module.exports = {Quiz, quizResolvers};
