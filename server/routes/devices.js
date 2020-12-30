const express = require('express');
const Device = require('../models/Device');
const { getDevices, getDevice, addDevice, updateDevice, deleteDevice } = require('../controllers/devices');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

// Include other resource routers
const scheduleRouter = require('./schedules');
const historiyRouter = require('./histories');
const userRouter = require('./users');

// Protect route
router.use(protect);

// Re-route into other resource routers
router.use('/:deviceId/schedules', scheduleRouter);
router.use('/:deviceId/histories', historiyRouter);
router.use('/:deviceId/users', userRouter);

router
    .route('/')
    .get(
        advancedResults(Device, {
            path: 'room',
            select: 'name description'
        }),
        getDevices
    )
    .post(authorize("admin"), addDevice);

router
    .route('/:id')
    .get(getDevice)
    .put(updateDevice)
    .delete(authorize("admin"), deleteDevice);


module.exports = router;
