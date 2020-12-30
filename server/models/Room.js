const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            unique: true,
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description can not be more than 500 characters']
        },
        icon: {
            type: String,
            required: [true, 'Please add a icon name']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);

// Cascade delete devices when a room is deleted
RoomSchema.pre('remove', async function (next) {
    console.log(`Devices being removed from room ${ this._id }`);
    await this.model('Device').deleteMany({ room: this._id });
    next();
});

module.exports = mongoose.model('Room', RoomSchema);
