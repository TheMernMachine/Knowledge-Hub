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
  getTodoLists: async (id) => {
    let user = await User.findOne({ _id: id }).populate('todoLists');
    return user.todoLists;
  },

  // Get a single todoList
  getTodoList: async (id, toDoId) => {
    let user = await User.findOne({ _id: id }).populate('todoLists');
    const list = user.todoLists.filter((aList) => aList._id.equals(toDoId));
    return list[0];
  },

  // Mutations for the todoList model to be imported into the resolvers index.js file at Path: server\schemas\resolvers.js

  // Add a todoList
  addTodoList: async (id, title, todo, priority) => {
    let list = await TodoList.create({ title, todo, priority });
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { todoLists: list._id } },
      { new: true }
    );
    return list;
  },

  // Delete a todoList
  deleteTodoList: async (id, todoId) => {
    let user = await User.findOne({ _id: id });
    const list = user.todoLists.filter((aList) => !aList._id.equals(todoId));

    user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { todoLists: list } },
      { new: true }
    );

    return user;
  },
};

module.exports = { todoListSchema, todoResolvers };