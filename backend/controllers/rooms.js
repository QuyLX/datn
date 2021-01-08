const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Room = require('../models/Room');

// @desc      Get all rooms
// @route     GET /api/rooms
// @access    Private
exports.getRooms = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});


// @desc      Create new room
// @route     POST /api/rooms
// @access    Private Only Admin
exports.addRoom = asyncHandler(async (req, res, next) => {
    // Check role
    const room = await Room.create(req.body);
    res.status(201).json({
        success: true,
        data: room
    })
});

// @desc      Get single room
// @route     GET /api/rooms/:id
// @access    Private 
exports.getRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findById(req.params.id)

    res.status(200).json({
        succcess: true,
        data: room
    })
});

// @desc      Update room
// @route     PUT /api/rooms/:id
// @access    Private only Admin
exports.updateRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        succcess: true,
        data: room
    })
});

// @desc      Delete room
// @route     DELETE /api/rooms/:id
// @access    Private only Admin
exports.deleteRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findById(req.params.id);

    // Make sure room is existed
    if (!room) {
        return next(new ErrorResponse(`Room is not found by ${ req.params.id }`, 404))
    }

    room.remove();

    res.status(200).json({
        succcess: true,
        data: {}
    })
});