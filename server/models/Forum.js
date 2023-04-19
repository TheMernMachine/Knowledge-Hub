const { Schema, model } = require('mongoose');

const forumSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description: {
        type:String,
        required:true
    },

},);