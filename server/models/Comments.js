const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
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
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});

// Instance method to return createdAt
commentSchema.methods.getCreateTime = function () {
    let temp = this.createdAt.toString();
    temp = temp.replace(/(st|nd|rd|at )/g, '');
    return Date.parse(temp);
};


const commentResolvers = {

}

module.exports = { commentSchema, commentResolvers };


