const { Schema, model } = require('mongoose');

    const assigmentSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    question: {
        type:String,
        required:true
    },

    due_date:{
        type: Date,
        required:true,
        default: Date.now,
    },
    assigmentResponses: [
        {
            type: String,
            required:true,
            studentID: ID, //CREATES A ID FOR THE STUDENT
        },
    ],

},);

const Assigment = model('assigment', assigmentSchema);
module.exports = Assigment;
