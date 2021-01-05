const mongoose = require('mongoose');
const moment = require('moment')

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


// Validation to ensure a room cannot be double-booked
ScheduleSchema.path('dateAndTime').validate(function (value) {
    // Extract the Room Id from the query object
    let device = this.device

    // Convert booking Date objects into a number value
    let newScheduleStart = value.getTime()
    let newScheduleEnd = this.endDateAndTime.getTime()

    // Function to check for schedule clash
    let clashesWithExisting = (existingScheduleStart, existingScheduleEnd, newScheduleStart, newScheduleEnd) => {
        if (newScheduleStart >= existingScheduleStart && newScheduleStart < existingScheduleEnd ||
            existingScheduleStart >= newScheduleStart && existingScheduleStart < newScheduleEnd) {

            throw new Error(
                `Schedule could not be saved. There is a clash with an existing booking from ${ moment(existingBookingStart).format('HH:mm') } to ${ moment(existingBookingEnd).format('HH:mm on LL') }`
            )
        }
        return false
    }

    // Locate the room document containing the bookings
    return Room.findById(roomId)
        .then(room => {
            // Loop through each existing booking and return false if there is a clash
            return room.bookings.every(booking => {

                // Convert existing booking Date objects into number values
                let existingBookingStart = new Date(booking.bookingStart).getTime()
                let existingBookingEnd = new Date(booking.bookingEnd).getTime()

                // Check whether there is a clash between the new booking and the existing booking
                return !clashesWithExisting(
                    existingBookingStart,
                    existingBookingEnd,
                    newBookingStart,
                    newBookingEnd
                )
            })
        })
}, `{REASON}`)

module.exports = mongoose.model('Schedule', ScheduleSchema);
