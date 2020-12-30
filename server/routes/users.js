const express = require('express');
const User = require('../models/User')
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
    .get(advancedResults(User), getUsers)
    .post(authorize("admin"), createUser);

router.route('/:id')
    .get(authorize("admin", "moderator"), getUser)
    .put(authorize("admin", "moderator"), updateUser)
    .delete(deleteUser)


module.exports = router;
