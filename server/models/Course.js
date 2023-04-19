// Require schema and model from mongoose
const { Schema, model } = require('mongoose');
const courseSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description: {
        type:String,
        required:true
    },

    price:{
        type: Number,
        required:true,
        default: 'USD',
    },

   content:[
    {
        type: String,
        enum: ['test','quizzes','assigments', 'notes'],
        required:true
   },
],

    startDate:{
        type: Date,
        required:true,
        default: Date.now,
    },


    teacher: [
        {
            type: String,
            required:true,
        },
    ],
    students: [
        {
            type: String,
            required:true,
        },   
    ],



},);

const Course = model('Course', courseSchema);
module.exports = Course;