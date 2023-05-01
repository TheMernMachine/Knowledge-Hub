const db = require('../config/connection');
const { User, userResolvers,
  Assignments, assignmentResolvers,
  Course, courseResolvers,
  todoListSchema, todoResolvers,
  Alerts, alertResolvers,
  Role, roleResolvers,
  LessonNotes, lessonNotesResolvers,
  Forum, forumResolvers,
  Quiz, quizResolvers,
} = require("../models");

const userSeeds = require('./userSeeds.json');
const roleSeeds = require('./roleSeeds.json');
const courseSeeds = require('./courseSeeds.json');
const assignmentSeeds = require('./assignmentSeeds.json');
const quizSeeds = require('./quizSeeds.json');
const questionSeeds = require('./questionSeeds.json');
const lessonNotesSeeds = require('./lessonSeeds.json');
const forumSeeds = require('./forumSeeds.json');
const todoListSeeds = require('./todoListSeeds.json');




db.once('open', async () => {
  try {
    await Role.deleteMany({});
    await User.deleteMany({});
    await Course.deleteMany({});
    await Assignments.deleteMany({});
    await Quiz.deleteMany({});
    await LessonNotes.deleteMany({});
    await Forum.deleteMany({});

    // Seed Roles
    await Role.create(roleSeeds);
    console.log('Roles seeded');

    // Seed Users
    for (let i = 0; i < userSeeds.length; i++) {
      userSeeds[i].role = await roleResolvers.findRoleByName(userSeeds[i].role);
      await userResolvers.createUser(userSeeds[i]);
    }

    console.log('Users seeded');
    const allUsers = await User.find({});
    const admin = await User.findOne({
      email: "mcclarren@knowledgehub.edu"
    });

    // activate all users
    for (let i = 0; i < allUsers.length; i++) {
      let user = allUsers[i];
      await userResolvers.setUserStatus(admin._id, user._id, "active");
    }
    console.log('Users activated');

    // Seed Courses
    for (let i = 0; i < courseSeeds.length; i++) {
      const teacher = await User.findOne({ email: courseSeeds[i].email });
      courseSeeds[i].teacher = teacher._id;
      await courseResolvers.createCourse(courseSeeds[i]);
    }
    console.log('Courses seeded');

    // Seed Assignments
    for (let i = 0; i < assignmentSeeds.length; i++) {
      const course = await Course.findOne({ title: assignmentSeeds[i].courseTitle });
      assignmentSeeds[i].courseId = course._id;
      await assignmentResolvers.createAssignment(assignmentSeeds[i]);
    }
    console.log('Assignments seeded');


    // Seed Quizzes
    for (let i = 0; i < quizSeeds.length; i++) {
      const course = await Course.findOne({ title: quizSeeds[i].courseTitle });
      quizSeeds[i].courseId = course._id;
      const quiz = await quizResolvers.createQuiz(quizSeeds[i]);

      for (let j = 0; j < questionSeeds.length; j++) {
        questionSeeds[j].quizId = quiz._id;
        await quizResolvers.addQuizQuestion(questionSeeds[j]);
      }
    };
    console.log('Quiz seeded');

    // Seed Lesson Notes
    for (let i = 0; i < lessonNotesSeeds.length; i++) {
      const course = await Course.findOne({ title: lessonNotesSeeds[i].courseTitle });
      lessonNotesSeeds[i].courseId = course._id;
      await lessonNotesResolvers.createLessonNotes(lessonNotesSeeds[i]);
    }
    console.log('Lesson Notes seeded');

    // Seed Forum
    for (let i = 0; i < forumSeeds.length; i++) {
      let user = await User.findOne({ email: forumSeeds[i].email });
      forumSeeds[i].postAuthor = user._id;
      await forumResolvers.createForum(forumSeeds[i]);
    }

    console.log('Forum seeded');

    // Seed Todo Lists
    for (let i = 0; i < todoListSeeds.length; i++) {
      let user = await User.findOne({ email: todoListSeeds[i].email });
      todoListSeeds[i].userId = user._id;
      await todoResolvers.addTodoList(todoListSeeds[i]);
    }

    console.log('Todo Lists seeded');


  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('All Seeding Done!');
  process.exit(0);
});
