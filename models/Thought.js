const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction')

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    validate: [({ length }) => length <= 280, 'Maximum character length reached.']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema],
},
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;