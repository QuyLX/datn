const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a titile']
    },
    description: {
        type: String,
        required: [true, 'Please add a description for schedule']
    },
    state: {
        type: Boolean,
        required: [true, 'Please add a state for control device']
    },
    timeStart: {
        type: Date,
        required: [true, 'Please add a start schedule']
    },
    timeEnd: {
        type: Date,
        required: [true, 'Please add a end schedule']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    device: {
        type: mongoose.Schema.ObjectId,
        ref: 'Device',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    isDone: {
        type: String,
        enum: ['pending', 'success', 'fail'],
        default: 'pending'
    },
});

// Prevent user from submitting more than one schedule 
ScheduleSchema.index({ device: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
