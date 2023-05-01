const { AuthenticationError } = require('apollo-server-express');
const { Schema, model } = require('mongoose');
const { User } = require('./User');

const todoListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ['high', 'medium', 'low']
  }
});

const TodoList = model('todoList', todoListSchema);

// These are the resolvers for the todoList model to be imported into the resolvers index.js file at Path: server\schemas\resolvers.js
const todoResolvers = {
  // Queries for the todoList model

  // Get all todoLists
  getAllTodoLists: async () => {
    return await TodoList.find({});
  },

  // Get all todoLists for a specific user
  getUserTodoLists: async (userId) => {
    let user = await User.findOne({ _id: userId }).populate('todoLists').populate('role');
    return user.todoLists;
  },

  // Get a single todoList
  getSingleTodoList: async (id) => {
    return await TodoList.findOne({ _id: id });
  },

  // Mutations for the todoList model to be imported into the resolvers index.js file at Path: server\schemas\resolvers.js

  // Add a todoList
  addTodoList: async ({ userId, title, todo, priority }) => {
    let list = await TodoList.create({ title, todo, priority });
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { todoLists: list._id } },
      { new: true }
    );
    return list;
  },

  updateTodoList: async (id, args) => {
    return await TodoList.findOneAndUpdate({ _id: id }, { ...args }, { new: true });
  },

  // Delete a todoList
  deleteTodoList: async (id) => {
    const list = await TodoList.findOneAndDelete({ _id: id }, { new: true });
    await User.findOneAndUpdate(
      { todoLists: id },
      { $pull: { todoLists: id } }
    );

    return list;
  },
};

module.exports = { todoListSchema, todoResolvers };