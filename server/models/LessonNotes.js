const { Schema, model } = require('mongoose');
const { commentSchema } = require('./Comments');
const dateFormat = require('../utils/dateFormat');
const { Course } = require('./Course');
const { Comment } = require('./Comments');

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
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
    required: true,
  },
  comments: [Comment.schema]
});

const lessonNotesResolvers = {
  getLessonNotes: async () => {
    const lessons = await LessonNotes.find({});
    return lessons;
  },
  getSingleLessonNote: async (lessonId) => {
    return await LessonNotes.findOne({ _id: lessonId });
  },
  createLessonNotes: async ({ title, content, courseId }) => {
    let lesson = await LessonNotes.create({ title, content, courseId });
    await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { lessonNotes: lesson._id } },
      { new: true }
    );

    return lesson;
  },
  deleteLessonNotes: async (lessonId, courseId) => {
    const lesson = await LessonNotes.findOneAndDelete({ _id: lessonId });
    await Course.findOneAndUpdate(
      { _id: courseId },
      { $pull: { lessonNotes: lessonId } }
    );
    return lesson;
  },
  updateLessonNotes: async (lessonId, title, content) => {
    const lesson = await LessonNotes.findOneAndUpdate(
      { _id: lessonId },
      { $set: { ...title, content, updatedAt: Date.now() } },
      { new: true }
    );
    return lesson;
  },
  getLessonComments: async (lessonId) => {
    const lesson = await LessonNotes.findOne({ _id: lessonId });
    return lesson.comments;
  },
  getSingleLessonComment: async (lessonId, commentId) => {
    const lesson = await LessonNotes.findOne({ _id: lessonId });
    return lesson.comments.id(commentId);
  },
  addLessonComment: async (lessonId, commentText, commentAuthor) => {
    return await LessonNotes.findOneAndUpdate(
      { _id: lessonId },
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
  updateLessonComment: async (lessonId, commentId, commentText) => {
    const lesson = await LessonNotes.findOne({ _id: lessonId });
    const comment = lesson.comments.id(commentId);
    const updatedComment = {
      _id: commentId,
      commentText: commentText,
      commentAuthor: comment.commentAuthor,
      createdAt: comment.getCreateTime()
    }

    return await LessonNotes.findOneAndUpdate(
      { _id: lessonId },
      { $set: { comments: { ...updatedComment } } },
      { new: true }
    );
  },
  deleteLessonComment: async (lessonId, commentId) => {
    return await LessonNotes.findOneAndUpdate(
      { _id: lessonId },
      {
        $pull: {
          comments: {
            _id: commentId,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
};

const LessonNotes = model('lessonNotes', lessonNotes);
module.exports = { LessonNotes, lessonNotesResolvers };