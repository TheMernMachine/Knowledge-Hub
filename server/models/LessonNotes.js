const { Schema, model } = require('mongoose');
const Comments  = require('./Comments');

const lessonNotes = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
  },
  comments: [Comments],
});

const lessonResolvers = {};

const Lesson = model('lesson', lessonNotes);
module.exports = { Lesson, lessonResolvers };