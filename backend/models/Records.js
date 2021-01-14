const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    data: {
        type: String
    }
});

module.exports = mongoose.model('Record', RecordSchema);
