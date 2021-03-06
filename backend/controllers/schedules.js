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
        let device = await Device.findById(req.params.deviceId);

        if (!device) {
            return next(
                new ErrorResponse(`No device with the id of ${ req.params.id }`, 404)
            );
        }

        const users = await Device.findById(req.params.id).select('users');

        // Make sure user is inused this device or role is Admin
        if (req.user.role === "user" && users.users.includes(req.user.id) !== true) {
            return next(
                new ErrorResponse(`User ${ req.user.id } is not authorized`, 401)
            );
        }
        const schedules = await Schedule.find({ device: req.params.deviceId });
        return res.status(200).json({
            success: true,
            count: schedules.length,
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
    const schedule = await Schedule.findById(req.params.id).populate({
        path: 'device',
        select: 'name description'
    });
    if (!schedule) {
        return next(
            new ErrorResponse(`No schedule found with the id of ${ req.params.id }`, 404)
        );
    }
    if (req.user.role !== "admin" || req.user.id != schedule.user) {
        return next(new ErrorResponse(`User is not authorized`, 401))
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

    // Validate time schedule
    const { timeStart, timeEnd } = req.body;

    if (timeStart <= Date.now() && timeEnd <= timeStart) {
        return next(
            new ErrorResponse(
                `Bad request time incorrect`,
                400
            )
        );
    } else {
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
                new ErrorResponse(`User ${ req.user.id } is not authorized to update device ${ device._id }`, 404)
            );
        }

        if (device.available == false) {
            return next(
                new ErrorResponse(`Device not available`, 400)
            );
        }
        const schedule = await Schedule.create(req.body)
        await Device.findByIdAndUpdate(req.params.deviceId, { available: false });

        // const schedule = await Schedule.create(req.body);

        res.status(201).json({
            success: true,
            data: schedule
        });
    }
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
    if (schedule.isDone !== "pending") {
        return next(new ErrorResponse(`Schedule in implement, You cant trigger this schedule`, 400))
    }
    const { timeStart, timeEnd } = req.body
    if (timeStart <= Date.now() && timeEnd <= timeStart) {
        return next(
            new ErrorResponse(
                `Bad request time incorrect`,
                400
            )
        );
    } else {
        if (req.user.role !== "admin" || req.user.id != schedule.user) {
            return next(new ErrorResponse(`User is not authorized`, 401))
        }

        schedule = await Schedule.findByIdAndUpdate(req.params.id, { timeStart, timeEnd }, {
            new: true,
            runValidators: true
        });


        res.status(200).json({
            success: true,
            data: schedule
        });
    }
});

// @desc      Delete schedule
// @route     DELETE /api/schedules/:id
// @access    Private
exports.deleteSchedule = asyncHandler(async (req, res, next) => {
    const schedule = await Schedule.findById(req.params.id);

    if (schedule.timeEnd < Date.now() || (timeStart < Date.now() && timeEnd)) {
        return next(new ErrorResponse(`Schedule in implement, You cant trigger this schedule`, 400))
    }

    if (!schedule) {
        return next(
            new ErrorResponse(`No schedule with the id of ${ req.params.id }`, 404)
        );
    }

    // Make sure review belongs to user or user is admin

    if (req.user.role !== "admin" || req.user.id != schedule.user) {
        return next(new ErrorResponse(`User is not authorized`, 401))
    }

    await Device.findByIdAndUpdate(req.params.deviceId, { available: true });
    await schedule.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});


