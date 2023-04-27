const { Schema, model } = require('mongoose');
const { Comment } = require('./Comments');

const forumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    postQuestion: {
        type: String,
        required: true
    },
    postAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    comments: [Comment.schema],

},);

const forumResolvers = {
    getAllForums: async () => {
        const forums = await Forum.find();
        return forums;
    },

    getSingeForum: async (args) => {
        const forum = await Forum.findById(args);
        return forum;
    },

    createForum: async ({ title, postQuestion, postAuthor }) => {
        const forum = await Forum.create({ title, postQuestion, postAuthor });
        return forum;
    },

    updateForum: async (args) => {
        const forum = await Forum.findByIdAndUpdate(args._id, args);
        return forum;
    },

    deleteForumPost: async (args) => {
        const forum = await Forum.findByIdAndDelete(args);
        return forum;
    },

    getForumComments: async (forumId) => {
        const forum = await Forum.findOne({ _id: forumId });
        return forum.comments;
    },

    getSingleForumComment: async (forumId, commentId) => {
        const forum = await Forum.findOne({ _id: forumId });
        return forum.comments.id(commentId);
    },

    addForumComment: async (forumId, commentText, commentAuthor) => {
        return await Forum.findOneAndUpdate(
            { _id: forumId },
            {
                $addToSet: {
                    comments: { commentText, commentAuthor },
                },
            },
            {
                new: true,
                runValidators: true,
            }
        );
    },
    updateForumComment: async (forumId, commentId, commentText) => {
        const forum = await Forum.findOne({ _id: forumId });
        const comment = forum.comments.id(commentId);
        const updatedComment = {
            _id: commentId,
            commentText: commentText,
            commentAuthor: comment.commentAuthor,
            createdAt: comment.getCreateTime()
        }

        return await Forum.findOneAndUpdate(
            { _id: forumId },
            { $set: { comments: { ...updatedComment } } },
            { new: true }
        );
    },
    deleteForumComment: async (forumId, commentId) => {
        return await Forum.findOneAndUpdate(
            { _id: forumId },
            {
                $pull: {
                    comments: {
                        _id: commentId,
                    },
                },
            },
            {
                new: true,
            }
        );
    }
}


const Forum = model('forum', forumSchema);
module.exports = { Forum, forumResolvers }