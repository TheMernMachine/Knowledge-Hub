// Require schema and model from mongoose
const { AuthenticationError } = require("apollo-server-express");
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const saltRounds = 10;
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
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
    default: 'inactive',
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

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

const userResolvers = {

  // Once we get todoList fully functional, we can add a populate here to get the todoLists
  getAllUsers: async () => {
    const users = await User.find().populate('role');
    return users;
  },

  // Once we get todoList fully functional, we can add a populate here to get the todoLists
  getUser: async (userId, email) => {
    const user = await User.findOne({ _id: userId }).populate('role');
    console.log(user);
    return await User.findOne({ _id: userId }).populate('role');
  },

  getSingleUser: async (email) => {
    const user = await User.findOne({ email: email }).populate('role');
    console.log(user);
    return await User.findOne({ email: email }).populate('role');
  },

  createUser: async ({ firstName, lastName, email, password, role }) => {
    const user = await User.create({ firstName, lastName, email, password, role });
    const token = signToken(user);
    return { token, user };
  },

  updateUser: async ({ _id, firstName, lastName, email, password }) => {
    if (password) {
      password = await bcrypt.hash(password, saltRounds);
    }
    return await User.findByIdAndUpdate(_id, { firstName, lastName, email, password }, { new: true });
  },

  // This is a protected route, only admins can change the status of users
  setUserStatus: async (adminId, userId, status) => {
    const adminUser = await User.findOne({ _id: adminId }).populate('role');
    if (adminUser.role.name !== 'admin') {
      throw new AuthenticationError('You are not authorized to perform this action');
    }

    return await User.findByIdAndUpdate(userId, { status }, { new: true });
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

module.exports = { User, userResolvers };