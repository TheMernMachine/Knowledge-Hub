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
    },
    teacher: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const courseResolvers = {
    getCourses: async () => {
        const course = await Course.find({});
        return course;
    },

    getSingleCourse: async (args) => {
        const course = await Course.findById(args).populate('teacher').populate('students');
        return course;
    },

    createCourse: async ({title, description, startDate, endDate}) => {
        const course = await Course.create({ title, description, startDate, endDate });
        return course;
    },

    updateCourse: async (args) => {
        const course = await Course.findByIdAndUpdate(args._id, args);
        return course;
    },

    addStudent: async (courseId, studentId) => {
        const course = await Course.findByIdAndUpdate(courseId, { $push: { students: [ { _id: studentId } ] } });
        console.log(course);
        return course;
    },

    deleteCourse: async (args) => {
        const course = await Course.findByIdAndDelete(args._id);
        return course;
    },
};

const Course = model('Course', courseSchema);

module.exports = { Course, courseResolvers };