const asyncHandler = require('../middlewares/async');
const History = require('../models/History');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all histories, get all histories for specific device
// @route     GET /api/histories
// @route     GET /api/devices/:deviceId/histories
// @access    Private
exports.getHistories = asyncHandler(async (req, res, next) => {
    if (req.params.deviceId) {
        const histories = await History.find({ device: req.params.deviceId });
        return res.status(200).json({
            success: true,
            count: histories.length,
            data: histories
        });
    } else {
        if (req.user.role === "user") {
            return next(new ErrorResponse(`User is not authorized`, 401));
        }
        res.status(200).json(res.advancedResults);
    }
});


