const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['on', 'off']
    },
    deviceName: {
        type: String,
        required: true
    },
    dataUpdate: {
        type: String,
    },
    typeAction: {
        type: String,
    },
    device: {
        type: mongoose.Schema.ObjectId,
        ref: 'Device',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('History', HistorySchema);
