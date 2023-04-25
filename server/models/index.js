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
const { Comment } = require('./Comments');
const { Response } = require('./Response');

module.exports = {
  Alert, alertResolvers,
  Assignments, assignmentResolvers,
  User, userResolvers,
  Course, courseResolvers,
  todoListSchema, todoResolvers,
  Role, roleResolvers,
  LessonNotes, lessonNotesResolvers,
  Comment, commentResolvers,
  Forum, forumResolvers,
  Quiz, quizResolvers,
  Response,
};
