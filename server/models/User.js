// Require schema and model from mongoose
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
  username: {
    type: String,
    max: 20,
    min: 8,
    required: true,
    unique: true,
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
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
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

const User = model('User', userSchema);

const userResolvers = {

  getAllUsers: async () => {
    const users = await User.find();
    return users;
  },

  getMe: async (parent, args, context) => {
    if (context.user) {
      return User.findOne({ _id: context.user._id }).populate("thoughts");
    }
    throw new AuthenticationError("You need to be logged in!");
  },

  createUser: async ({ firstName, lastName, username, email, password  }) => {
    const user = await User.create({ firstName, lastName, username, email, password });
    const token = signToken(user);
    return { token, user };
  },

  updateUser: async (parent, args, context) => {
    if (context.user) {
      return await User.findByIdAndUpdate(context.user._id, args, { new: true });
    }
    throw new AuthenticationError('Not logged in');
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