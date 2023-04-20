const { Schema, model } = require('mongoose');
const Comments = require('./Comments');

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
   
},);

const forumResolvers = {

}


const Forum = model('forum', forumSchema);
module.exports = { Forum, forumResolvers }