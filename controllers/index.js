const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const test = require('./testroute')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/game', test);
module.exports = router;
