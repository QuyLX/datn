const express = require('express');
const Room = require('../models/Room');
const { getRooms, getRoom, addRoom, updateRoom, deleteRoom } = require('../controllers/rooms')
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Use protect route
router.use(protect);

// Include other resource routers
const deviceRouter = require('./devices');

// Re-route into other resource routers
router.use('/:roomId/devices', deviceRouter);


router
    .route('/')
    .get(advancedResults(Room), getRooms)
    .post(authorize("admin"), addRoom)

router
    .route('/:id')
    .get(getRoom)
    .put(authorize("admin"), updateRoom)
    .delete(authorize("admin"), deleteRoom)

module.exports = router;
