const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    data: {
        type: String
    },
    device: {
        type: String
    },
    user: {
        type: String
    }
});

module.exports = mongoose.model('History', HistorySchema);
