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
});

// const Comment = model('comment', commentSchema);

const commentResolvers = {
    // getComments: async () => {
    //     const comments = await Comment.find({});
    //     return comments;
    // },
    // getSingleComment: async (commentId) => {
    //     return await Comment.findOne({ _id: commentId });
    // },
    // addComment: async (commentAuthor, commentText,) => {
    //     if (context.user) {
    //         return Lesson.findOneAndUpdate(
    //             { _id: commentId },
    //             {
    //                 $addToSet: {
    //                     comments: { commentText, commentAuthor },
    //                 }
    //             },
    //             {
    //                 new: true,
    //                 runValidators: true,
    //             }
    //         );
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    // },

    // removeComment: async (contentID, commentId) => {
    //     if (context.user) {
    //         return Lesson.findOneAndUpdate(
    //             { _id: contentID },
    //             {
    //                 $pull: {
    //                     comments: {
    //                         _id: commentId,
    //                         commentAuthor
    //                     },
    //                 },
    //             },
    //             { new: true }
    //         );
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    // }
}

module.exports = { commentSchema, commentResolvers };


        // getComments(parentId: ID!): [Comment]
        // getComment(parentId: ID!, _id: ID!): Comment
        // getComments: async (parent, { parentId }) => {
        //     return commentResolvers.getComments(parentId);
        // },