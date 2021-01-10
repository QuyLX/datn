const asyncHandler = require('../middlewares/async');
const History = require('../models/History');
const Device = require('../models/Device')
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all histories, get all histories for specific device
// @route     GET /api/histories
// @route     GET /api/devices/:deviceId/histories
// @access    Private
exports.getHistories = asyncHandler(async (req, res, next) => {
    if (req.params.deviceId) {
        const users = await Device.findById(req.params.deviceId).populate({ path: 'users', select: '_id' });
        if (!users) {
            return next(new ErrorResponse(`User is not Authorized for view histories`, 401))
        }
        // Check user is in used?
        const arrUser = users.users.filter(item => 
            req.user.id == item._id 
        )
        if (arrUser.length === 0 && req.user.role === "user") {
            return next(new ErrorResponse(`User with id ${ req.user.id } is not authorized`, 401))
        }
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


