const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        required: true,
    },
    commentAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        required: true,
    }
});

// Instance method to return createdAt
commentSchema.methods.getCreateTime = function () {
    let temp = this.createdAt.toString();
    temp = temp.replace(/(st|nd|rd|th|at )/g, '');
    return Date.parse(temp);
};


const Comment = model('Comment', commentSchema);

module.exports = { Comment };


