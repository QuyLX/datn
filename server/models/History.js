const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    data: [String],
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

module.exports = mongoose.model('History', HistorySchema);
