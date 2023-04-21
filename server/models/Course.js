const { Schema, model } = require('mongoose');

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
    content: [
        {
            type: String,
            enum: ['test', 'quizzes', 'assigments', 'notes'],
            required: true
        },
    ],
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
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
        const course = await Course.findById(args);
        return course;
    },

    createCourse: async (title, description, content, startDate, endDate) => {
        const course = await Course.create({  title, description, content, startDate, endDate });
        return course;
    },

    updateCourse: async (args) => {
        const course = await Course.findByIdAndUpdate(args._id, args);
        return course;
    },

    deleteCourse: async (args) => {
        const course = await Course.findByIdAndDelete(args._id);
        return course;
    },
};

const Course = model('Course', courseSchema);

module.exports = { Course, courseResolvers };