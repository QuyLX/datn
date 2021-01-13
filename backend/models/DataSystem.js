const mongoose = require('mongoose');

const DataSystem = new mongoose.Schema({
    data: {
        type: String
    }
});

module.exports = mongoose.model('History', DataSystem);
