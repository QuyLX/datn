const express = require('express');
const History = require('../models/History');
const { getHistories } = require('../controllers/histories');
const advancedResults = require('../middlewares/advancedResults');
const { protect } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });
router.use(protect);


router
    .route('/')
    .get(
        advancedResults(History, {
            path: 'device',
            select: 'name config'
        }),
        getHistories
    )


module.exports = router;
