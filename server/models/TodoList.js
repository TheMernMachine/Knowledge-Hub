const { Schema, model } = require('mongoose');
const { User } = require('./User');

const todoListSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    todo: [
        {
            type: String,
            required: true,
        },
    ],
});

const TodoList = model('todoList', todoListSchema);

// These are the resolvers for the todoList model to be imported into the resolvers index.js file at Path: server\schemas\resolvers.js
const todoResolvers = {
  // Queries for the todoList model

    // Get all todoLists
    getTodoLists: async () => {
      let lists = await TodoList.find({});
      return lists;
    },

    // Get a single todoList
    getTodoList: async (_id, context) => {
      // If searched for by user then return the todoList with the user's todoListId
      // if (context.user) {
        console.log(_id);
        let list = await TodoList.findOne({ _id: _id });
        return list;
        // If not searched for by ID or user then throw an error
      // } else {
      //   throw new AuthenticationError('You need to be logged in!');
      // };
    },

  // Mutations for the todoList model to be imported into the resolvers index.js file at Path: server\schemas\resolvers.js
    
    // Add a todoList
    addTodoList: async (title, todos, context) => {
      // If the user is logged in then create a new todoList
      if (context.user) {
        let list = await TodoList.create({title, todos});
        let user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { todoLists: list._id } },
          { new: true }
        );
        return { list, user };
        // If the user is not logged in then throw an error
      } else {
        throw new AuthenticationError('You need to be logged in!');
      };
    },

    // Update a todoList
    updateTodoList: async (id, title, todos, context) => {
      // If the user is logged in then update the todoList with the user's todoListId
      if (context.user) {
        let list = await TodoList.findOneAndUpdate({ _id: id, title, todos, new: true });
        return list;
        // If the user is not logged in then throw an error
      } else {
        throw new AuthenticationError('You need to be logged in!');
      };
    },

    // Delete a todoList
    deleteTodoList: async (id, context) => {
      // If the user is logged in then delete the todoList with the user's todoListId
      if (context.user) {
        let list = await TodoList.findOneAndDelete({ _id: id });
        return list;
        // If the user is not logged in then throw an error
      } else {
        throw new AuthenticationError('You need to be logged in!');
      };
    },
};

module.exports = { todoListSchema, todoResolvers };