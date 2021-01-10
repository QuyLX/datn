const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    data: String,
    createdAt: {
        type: Date,
        default :Date.now()
    },
    state: Boolean,
    device: {
        type: mongoose.Schema.ObjectId,
        ref: 'Device',
        required: true
    },
    user: {
        type: String
    }
});

module.exports = mongoose.model('History', HistorySchema);
