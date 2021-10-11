const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');

router.use('/users', userRoutes);
router.use('/lobby', gameRoutes);

module.exports = router;
