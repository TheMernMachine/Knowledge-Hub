const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,

    },
    quiz: [
        {
            type: Schema.Types.ObjectId,
            ref: 'quiz',
        },
    ],
    assignment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'assignment',
        },
    ],
    lessonNotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'lessonNotes',
        },
    ],
    startDate: {
        type: Date,
        required: true,
        get: (timestamp) => dateFormat(timestamp),
    },
    endDate: {
        type: Date,
        required: true,
        get: (timestamp) => dateFormat(timestamp),
    },
    teacher: {
            type: Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

// select({ password: 0 }) must prevent the password from being returned in a query
const courseResolvers = {
    getCourses: async () => {
        const course = await Course.find({}).populate('quiz')
            .populate('assignment').populate('lessonNotes')
            .populate('teacher').populate({ path: 'teacher', populate: { path: 'role' } })
            .populate('students').populate({ path: 'students', populate: { path: 'role' } });
        return course;
    },

    getUserCourses: async (userId) => {
        const course = await Course.find({ $or:[ {students: { _id: userId }}, {teacher: {_id: userId}}]}).populate('teacher')
        return course;
    },

    getSingleCourse: async (args) => {
        const course = await Course.findById(args).populate('quiz')
            .populate('assignment').populate('lessonNotes')
            .populate('teacher').populate({ path: 'teacher', populate: { path: 'role' } })
            .populate('students').populate({ path: 'students', populate: { path: 'role' } });
        return course;
    },

    createCourse: async (args) => {
        const course = await Course.create(args);
        return course;
    },

    updateCourse: async (args) => {
        const course = await Course.findByIdAndUpdate(args._id, args, { new: true });
        return course;
    },

    addStudent: async (courseId, studentId) => {
      const course = await Course.findByIdAndUpdate(courseId, { $push: { students: [ { _id: studentId } ] } });
      return course;
  },

    deleteCourse: async (args) => {
        const course = await Course.findByIdAndDelete(args._id);
        return course;
    },
};

const Course = model('Course', courseSchema);

module.exports = { Course, courseResolvers };