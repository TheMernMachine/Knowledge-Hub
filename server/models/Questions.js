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

const questionResolvers = {
    getQuestions: async () => {
        const question = await Question.find();
        return question;
    },
    getSingleQuestion: async (args) => {
        const question = await Question.findById(args);
        return question
    },

    addQuestion: async (title,options,answer) => {
        return Question.create({title,options,answer});
    },

    removeQuestion: async (_id) => {
        const question = await Question.findOneAndDelete();
        return question;
    }, 

    updateQuestion: async (args) => {
        const question = await Question.findOneAndUpdate(args._id, args);
        return question
    },
};  


const Question = model('question', questionSchema);
module.exports = {Question, questionResolvers};