const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getThought(req, res) {
    Thought.find({})
      .sort({ createdAt: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ dbThoughtData }) => {
        return User.findOneAndUpdate(
          { _id: params.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // update thought by id
  updateThought({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $set: params.body }, 
      { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData=> {
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      return User.findOneAndUpdate(
        { thoughts: params.thoughtId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'Thought successfully deleted!' });
        return;
      }
      res.json({ message: 'Thought successfully deleted!' });
    })
    .catch(err => res.json(err));
},


  // add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  // remove reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'Reaction successfully deleted!' });
        return;
      }
      res.json({ message: 'Reaction successfully deleted!' });
    })
    .catch(err => res.json(err));
  }
};



module.exports = thoughtController;