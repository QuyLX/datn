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
    status: {
        type: String,
        required: [true, 'Please add a status for control device']
    },
    dateAndTime: {
        type: Date,
        required: [true, 'Please add a start schedule']
    },
    endDateAndTime: {
        type: Date,
        required: [true, 'Please add a end schedule']
    },
    startHour: Number,
    duration: Number,
    createdAt: {
        type: Date,
        default: Date.now
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
    }
});



module.exports = mongoose.model('Schedule', ScheduleSchema);
