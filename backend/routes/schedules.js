const express = require('express');
const Schedule = require('../models/Schedule');
const { getSchedules, getSchedule, addSchedule, updateSchedule, deleteSchedule } = require('../controllers/schedules');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });
router.use(protect);

router
    .route('/')
    .get(
        advancedResults(Schedule, {
            path: 'device',
            select: 'name description'
        }),
        authorize("admin")
        ,
        getSchedules
    )
    .post(addSchedule);

router
    .route('/:id')
    .get(getSchedule)
    .put(updateSchedule)
    .delete(deleteSchedule);

module.exports = router;
