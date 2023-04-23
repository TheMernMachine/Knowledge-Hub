const { Alert, alertResolvers } = require('./Alerts');
const { Assignments, assignmentResolvers } = require('./Assignments');
const { Course, courseResolvers } = require('./Course');
const { Forum, forumResolvers } = require('./Forum');
const { LessonNotes, lessonNotesResolvers } = require('./LessonNotes');
// const {Questions, questionResolvers} = require('./Questions');
const { Quiz, quizResolvers } = require('./Quiz');
const { Role, roleResolvers } = require('./Role');
const { todoListSchema, todoResolvers } = require('./TodoList');
const { User, userResolvers } = require('./User');
const { Comment, commentResolvers } = require('./Comments');

module.exports = {
  Assignments, assignmentResolvers,
  User, userResolvers,
  Course, courseResolvers,
  todoListSchema, todoResolvers,
  Alert, alertResolvers,
  Role, roleResolvers,
  LessonNotes, lessonNotesResolvers,
  Comment, commentResolvers,
  Forum, forumResolvers,
  Quiz, quizResolvers,
};
