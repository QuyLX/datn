const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Device = require('../models/Device');
const Room = require('../models/Room');

// @desc      Get all devices, get all devices for specific room
// @route     GET /api/devices
// @route     GET /api/rooms/:roomId/devices
// @access    Private
exports.getDevices = asyncHandler(async (req, res, next) => {
    if (req.params.roomId) {
        const devices = await Device.find({ room: req.params.roomId });

        return res.status(200).json({
            success: true,
            count: devices.length,
            data: devices
        });
    } else {
        if (req.user.role !== "admin") {
            return next(new ErrorResponse(`User's role is not authorized`, 401))
        }
        res.status(200).json(res.advancedResults);
    }
});

// @desc      Get single device
// @route     GET /api/devices/:id
// @access    Private
exports.getDevice = asyncHandler(async (req, res, next) => {
    const device = await Device.findById(req.params.id).populate({
        path: 'room',
        select: 'name description'
    });

    if (!device) {
        return next(
            new ErrorResponse(`No device with the id of ${ req.params.id }`),
            404
        );
    }

    res.status(200).json({
        success: true,
        data: device
    });
});

// @desc      Add device for rooms
// @route     POST /api/rooms/:roomId/devices
// @access    Private
exports.addDevice = asyncHandler(async (req, res, next) => {
    req.body.room = req.params.roomId;
    const room = await Room.findById(req.params.roomId);

    if (!room) {
        return next(
            new ErrorResponse(`No room with the id of ${ req.params.roomId }`),
            404
        );
    }
    const device = await Device.create(req.body);

    res.status(200).json({
        success: true,
        data: device
    });
});

// @desc      Update device
// @route     PUT /api/devices/:id
// @access    Private
exports.updateDevice = asyncHandler(async (req, res, next) => {
    let device = await Device.findById(req.params.id);

    if (!device) {
        return next(
            new ErrorResponse(`No device with the id of ${ req.params.id }`),
            404
        );
    }

    const users = await Device.findById(req.params.id).select('users');

    // Make sure user is inused this device or role is Admin
    if (req.user.role !== "admin" && users.users.includes(req.user.id) !== true) {
        return next(
            new ErrorResponse(`User ${ req.user.id } is not authorized to update device ${ device._id }`),
            404
        );
    }
    device = await Device.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: device
    });
});

// @desc      Delete device
// @route     DELETE /api/devices/:id
// @access    Private
exports.deleteDevice = asyncHandler(async (req, res, next) => {
    const device = await Device.findById(req.params.id);

    if (!device) {
        return next(
            new ErrorResponse(`No device with the id of ${ req.params.id }`),
            404
        );
    }
    await device.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});


//  @desc   Control Device when role is Admin or user in used
//  @route  PUT /api/devices/:id/control
//  @access Private
exports.controlDevice = asyncHandler(async (req, res, next) => {
    let device = await Device.findById(req.params.id);

    if (!device) {
        return next(
            new ErrorResponse(`No device with the id of ${ req.params.id }`),
            404
        );
    }

    const users = await Device.findById(req.params.id).select('users');

    // Make sure user is inused this device or role is Admin
    if (req.user.role !== "admin" && users.users.includes(req.user.id) !== true) {
        return next(
            new ErrorResponse(`User ${ req.user.id } is not authorized to update device ${ device._id }`),
            404
        );
    }
    const { state } = req.body

    device = await Device.findByIdAndUpdate(req.params.id, { state }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: device
    });
});