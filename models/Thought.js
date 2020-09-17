const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    ThoughtText: {
      type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    createdBy: {
      type: String
    },
    reactions: []
  });

 
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;