const { Schema, model } = require('mongoose');
const Comments = require('./Comments');
const dateFormat = require('../utils/dateFormat');

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
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const lessonNotesResolvers = {
  getLessonNotes: async () => {
    const lessons = await LessonNotes.find({});
    return lessons;
  },
  getSingleLessonNote: async (lessonId) => {
    return await LessonNotes.findOne({ _id: lessonId });
  },
  createLessonNotes: async (title, content) => {
    return LessonNotes.create({ title, content });
  },
  deleteLessonNotes: async (lessonId) => {
    const lesson = await LessonNotes.findOneAndDelete({
      _id: lessonId,
    });
    return lesson;
  },
  updateLessonNotes: async (lessonId, title, content) => {
    const lesson = await LessonNotes.findOneAndUpdate(
      { _id: lessonId },
      { $set: { ...title, content, updatedAt: Date.now() } },
      { new: true }
    );
    return lesson;
  }
};

const LessonNotes = model('lessonNotes', lessonNotes);
module.exports = { LessonNotes, lessonNotesResolvers };