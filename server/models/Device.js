const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a device name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    config: {
        type: String,
        required: [true, 'Please add a config']
    },
    icon: {
        type: String,
        required: [true, 'Please add a icon name']
    },
    state: {
        type: String,
        select: false  
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: 'Room',
        required: true
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
});

// Cascade delete schedule, history when a device is deleted
DeviceSchema.pre('remove', async function (next) {
    console.log(`Schedule  being removed from device, remove device in user ${ this._id }`);
    await this.model('User').update(
        { _id: { $in: this.users } },
        { $pull: { devices: this._id } },
        { multi: true },
    );
    await this.model('Schedule').deleteMany({ device: this._id });
    await this.model('History').deleteMany({ device: this._id });
    next();
});

module.exports = mongoose.model('Device', DeviceSchema);
