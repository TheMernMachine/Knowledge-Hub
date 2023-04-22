const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            required: true,
        },
    ],
    answer: {
        type: String,
        required: true,
    }
});

const questionResolvers = {};

const Question = model('question', questionSchema);
module.exports = { Question, questionResolvers };