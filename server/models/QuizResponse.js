const { Schema, model } = require('mongoose');

const quizResponseSchema = new Schema({
    responses: [String],
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rawScore: {
        type: Number,
        default: 0,
        required: true,
    },
    grade: {
        type: String,
        default: 'Not Graded',
        enum: ['Not Graded', 'A', 'B', 'C', 'D', 'F'],
        required: true,
    }
});

const QuizResponse = model('quizResponse', quizResponseSchema);

module.exports = { QuizResponse };


