const { Schema, model } = require('mongoose');

const todoListSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    todos: [
        {
            type: String,
            required: true,
        },
    ],
});

const todoResolvers = {};
module.exports = { todoListSchema, todoResolvers };