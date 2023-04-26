const { Schema, model } = require('mongoose');

const responseSchema = new Schema({
    responseText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1200,
        required: true,
    },
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

const Response = model('Response', responseSchema);

module.exports = { Response };


