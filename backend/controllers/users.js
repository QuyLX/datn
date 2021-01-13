const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const User = require('../models/User');
const Device = require('../models/Device');

// @desc Get all users, get all users for specific device
// @route GET /api/users
// @route GET /api/devices/:deviceId/users
// @access Protect

exports.getUsers = asyncHandler(async (req, res, next) => {
    if (req.params.deviceId) {
        const users = await Device.findById(req.params.deviceId).populate({ path: 'users', select: 'name' }).select("name");
        if (!users) {
            return next(new ErrorResponse(`No users use this device`, 404))
        }
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } else {
        // only Admin and morderator can views all users
        if (req.user.role === "user") {
            return next(new ErrorResponse(`User is not authorized for view all Users`, 401))
        }
        res.status(200).json(res.advancedResults);
    }
});


// @desc Get single user
// @route GET /api/users/:id
// @access Private/Admin

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorResponse(`No user with id ${ req.params.id }`, 404))
    }
    res.status(200).json({
        succcess: true,
        data: user
    })
});


// @desc Create user
// @route POST /api/users
// @access Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body
    const user = await User.create({ name, email, password, role });
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc Update user, add user to use device
// @route PUT /api/users/:id
// @route PUT /api/devices/:deviceId/users/:id
// @access Private/Admin/moderator

exports.updateUser = asyncHandler(async (req, res, next) => {
    // add devices to use for user
    if (req.params.deviceId) {
        await User.findByIdAndUpdate(
            req.params.id,
            { $push: { devices: req.params.deviceId } },
            { new: true, useFindAndModify: false, runValidators: true }
        );
        // add user to use device
        await Device.findByIdAndUpdate(
            req.params.deviceId,
            { $push: { users: req.params.id } },
            { new: true, useFindAndModify: false, runValidators: true }
        )
        res.status(200).json({
            success: true,
        });
    } else {
        // Update user
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            succcess: true,
            data: user
        })
    }
});
// @desc Delete user
// @route DELETE /api/users/:id
// @route DELETE /api/devices/:deviceId/users/:id
// @access Private

exports.deleteUser = asyncHandler(async (req, res, next) => {
    // Admin cant delete admin account
    if (req.user.id === req.params.id) {
        return next(new ErrorResponse(`Admin cant delete admin account1`, 400))
    }
    // Remove user use device
    if (req.params.deviceId) {
        if (req.user.role === "user") {
            return next(
                new ErrorResponse(`User with the id of ${ req.params.id } is not authorized`),
                401
            );
        };
        const userInUsedDevices = await Device.findById(req.params.deviceId).select('users');
        if (userInUsedDevices.length == 0) {
            return next(
                new ErrorResponse(`No user in used this device`),
                404
            );
        };
        await Device.findByIdAndUpdate(
            req.params.deviceId,
            { $pull: { users: req.params.id } },
            { new: true, useFindAndModify: false, runValidators: true }
        )
        await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { devices: req.params.deviceId } },
            { new: true, useFindAndModify: false, runValidators: true }
        )

        res.status(200).json({
            success: true,
            data: {}
        });
    } else {
        // Delete user
        if (req.user.role !== "admin") {
            return next(
                new ErrorResponse(`User with the id of ${ req.params.id } is not authorized`),
                401
            );
        };
        // Make sure user exist
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(
                new ErrorResponse(`No user with the id of ${ req.params.id }`),
                404
            );
        }
        const users = await User.findById(req.params.id).select('devices');

        if (users.length == 0) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                data: {}
            });
        } else {
            await user.remove();
            res.status(200).json({
                success: true,
                data: {}
            });
        }
    }
});