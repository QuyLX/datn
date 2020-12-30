const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Schedule = require('../models/Schedule');
const Device = require('../models/Device');

// @desc      Get all schedule, get all schedule per device
// @route     GET /api/schedules
// @route     GET /api/devices/:deviceId/schedules
// @access    Private
exports.getSchedules = asyncHandler(async (req, res, next) => {
    if (req.params.deviceId) {
        const users = await Device.findById(req.params.deviceId).populate('users').select('-devices');
        if (users.includes(req.user.id) !== true && req.user.role === "user") {
            return next(new ErrorResponse(`User with id ${ req.user.id } is not authorized`, 401))
        }
        const schedules = await Schedule.find({ device: req.params.deviceId });
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: schedules
        });
    } else {
        if (req.user.role === "user") {
            return next(new ErrorResponse(`User is not authorized`, 401));
        }
        res.status(200).json(res.advancedResults);
    }
});

// @desc      Get single schedule
// @route     GET /api/schedules/:id
// @access    Private
exports.getSchedule = asyncHandler(async (req, res, next) => {
    const users = await Device.findById(req.params.deviceId).populate('users').select('-devices');
    if (req.user.role === "moderator" || users.includes(req.user.id) !== true) {
        return next(new ErrorResponse(`User is not authorized`, 401))
    }
    const schedule = await Schedule.findById(req.params.id).populate({
        path: 'device',
        select: 'name description'
    });

    if (!schedule) {
        return next(
            new ErrorResponse(`No schedule found with the id of ${ req.params.id }`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: schedule
    });
});

// @desc      Add schedule to device
// @route     POST /api/devices/:deviceId/schedules
// @access    Private
exports.addSchedule = asyncHandler(async (req, res, next) => {
    req.body.device = req.params.deviceId;
    req.body.user = req.user.id;

    const device = await Device.findById(req.params.deviceId);
    if (!device) {
        return next(
            new ErrorResponse(
                `No device with the id of ${ req.params.deviceId }`,
                404
            )
        );
    };

    const users = await Device.findById(req.params.id).select('users');

    // Make sure user is inused this device or role is Admin
    if (req.user.role !== "admin" && users.users.includes(req.user.id) !== true) {
        return next(
            new ErrorResponse(`User ${ req.user.id } is not authorized to update device ${ device._id }`),
            404
        );
    }

    const schedules = await Schedule.find({ device: req.params.deviceId });
    // Validation for schedule, convert schedule to obj
    let schedulesStr = JSON.parse(schedules);

    schedulesStr.forEach(element => {
        if (req.body.start > element.start || req.body.end < element.end) {
            return next(
                new ErrorResponse(
                    `There was another schedule in that time frame`,
                    400
                )
            );
        }
    });


    // const schedule = await Schedule.create(req.body);

    res.status(201).json({
        success: true,
        data: schedule
    });
});

// @desc      Update schedule
// @route     PUT /api/schedules/:id
// @access    Private
exports.updateSchedule = asyncHandler(async (req, res, next) => {
    let schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
        return next(
            new ErrorResponse(`No schedule with the id of ${ req.params.id }`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    // if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //     return next(new ErrorResponse(`Not authorized to update review`, 401));
    // }

    schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: schedule
    });
});

// @desc      Delete review
// @route     DELETE /api/schedules/:id
// @access    Private
exports.deleteSchedule = asyncHandler(async (req, res, next) => {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
        return next(
            new ErrorResponse(`No schedule with the id of ${ req.params.id }`, 404)
        );
    }

    // // Make sure review belongs to user or user is admin
    // if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //     return next(new ErrorResponse(`Not authorized to update review`, 401));
    // }

    await schedule.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});
