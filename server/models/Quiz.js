const { Schema, model } = require('mongoose');
const { questionSchema } = require('./Questions');

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
    quizResponse: [
        {
            type: String,
            required: true,
            
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

const quizResolvers = {
    
};

const Quiz = model('quiz', quizSchema);
module.exports = { Quiz, quizResolvers };
