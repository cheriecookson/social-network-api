const router = require('express').Router();
const {
    getThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

  router
  .route('/')
  .get(getThought)
  .post(createThought);
  
  // /api/thoughts/<userId>
  router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
  
  // /api/thoughts/<userId>/<thoughtId>
  router
    .route('/:thoughtId/reactions')
    .post(addReaction)
  
  // /api/thoughts/<userId>/<thoughtId>/<replyId>
  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);
  
  module.exports = router;
