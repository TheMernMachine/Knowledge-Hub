
const {Alert, alertResolvers} = require('./Alerts');
const {Assignments, assignmentResolvers} = require('./Assignments');
// const {Content, contentResolvers} = require('./Content');
const { Course, courseResolvers } = require('./Course');
// const {Forum, forumResolvers} = require('./Forum');
// const {LessonNotes, lessonNotesResolvers} = require('./LessonNotes');
const {Questions, questionResolvers} = require('./Questions');
// const {Quizzes, quizResolvers} = require('./Quizzes');
// const {Role, roleResolvers} = require('./Role');
const {todoListSchema, todoResolvers} = require('./TodoList');
const { User, userResolvers } = require('./User');

module.exports = { Assignments, assignmentResolvers, 
  User, userResolvers, 
  Course, courseResolvers,
  todoListSchema, todoResolvers,
  Alert, alertResolvers,
  Questions, questionResolvers
};
