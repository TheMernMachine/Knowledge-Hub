// Require schema and model from mongoose
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  profilePic: {
    type: String,
    default: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
  },
  dateJoined: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'role',
  },
  todoLists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'todoList',
    },
  ],
});


// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const userResolvers = {

  getAllUsers: async () => {
    const users = await User.find().populate('role');
    return users;
  },

  getMe: async (lessonId) => {
    return User.findOne({ _id: lessonId });
  },

  createUser: async ({ firstName, lastName, email, password, role }) => {
    const user = await User.create({ firstName, lastName, email, password, role });
    const token = signToken(user);
    return { token, user };
  },

  updateUser: async ({ _id, firstName, lastName, email, password }) => {
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    return await User.findByIdAndUpdate(_id, { firstName, lastName, email, password }, { new: true });
  },

  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthenticationError('Incorrect credentials');
    }
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials');
    }
    const token = signToken(user);
    return { token, user };
  },



};

const User = model('User', userSchema);
module.exports = { User, userResolvers };