const { Schema, model } = require('mongoose');


const lessonNotes = new Schema({

    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
        {
          commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
          },
          commentAuthor: {
            type: ID,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
          },
        },
      ],
 
  },);

   const lessonResolvers = {
    addComment : async (lessonNotesID, commentText,) => {
    if (context.user) {
      return Lesson.findOneAndUpdate(
        { _id: commentId },
        {
          $addToSet: {
            comments: { commentText, commentAuthor},
        }},
        {
          new: true,
          runValidators: true,
        }
      );
    }
    throw new AuthenticationError('You need to be logged in!');
  },

  removeComment : async ( lessonNotesID, commentId )  => {
    if (context.user) {
      return Lesson.findOneAndUpdate(
        { _id: lessonNotesID },
        {
          $pull: {
            comments: {
              _id: commentId,
              commentAuthor
            },
          },
        },
        { new: true }
      );
    }
    throw new AuthenticationError('You need to be logged in!');
  }}



const Lesson = model('lesson', lessonNotes);
module.exports = {Lesson,lessonResolvers};