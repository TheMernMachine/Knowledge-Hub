const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    commentAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const commentResolvers = {
    addComment: async (contentID, commentText,) => {
        if (context.user) {
            return Lesson.findOneAndUpdate(
                { _id: commentId },
                {
                    $addToSet: {
                        comments: { commentText, commentAuthor },
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }
        throw new AuthenticationError('You need to be logged in!');
    },

    removeComment: async (contentID, commentId) => {
        if (context.user) {
            return Lesson.findOneAndUpdate(
                { _id: contentID },
                {
                    $pull: {
                        comments: {
                            _id: commentId,
                            commentAuthor
                        },
                    },
                },
                { new: true }
            );
        }
        throw new AuthenticationError('You need to be logged in!');
    }
}

const Comment = model('comment', commentSchema);
module.exports = { Comment, commentResolvers };


