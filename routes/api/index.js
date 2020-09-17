const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');

// add prefix of `/thoughts` to routes created in `thought-routes.js`
router.use('/thoughts', thoughtRoutes);

module.exports = router;