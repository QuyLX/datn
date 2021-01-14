const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error');
const mqttClient = require('../mqttBroker/connBroker');

// Load model to follow topic
const Device = require('./models/Device');


// Load env variable
dotenv.config();
// Connect to Database
connectDB();

// Route files
const rooms = require('./routes/rooms');
const devices = require('./routes/devices');
const schedules = require('./routes/schedules');
const histories = require('./routes/histories');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
// Middleware
// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/rooms', rooms);
app.use('/api/devices', devices);
app.use('/api/schedules', schedules);
app.use('/api/histories', histories);
app.use('/api/users', users);
app.use('/api/auth', auth);

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running in ${ process.env.NODE_ENV } mode on port ${ PORT }`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${ err.message }`);
    // close server and exit process
    server.close(() => process.exit(1));
})
/************************ CONNECTION TO MQTT BROKER AND MESSAGE HANDLING *******************/

/* Connecting to mqtt broker */
mqttClient.on("connect", async () => {
    try {
        const devices = await Device.find();
        const deviceRoomTopics = devices.map(item => `${ item.room._id }/${ item._id }`);
        // const schedulesTopics = devices.map(item => `${ item._id }/schedules`);
        // const topics = deviceRoomTopics.concat(schedulesTopics);
        mqttClient.subscribe(deviceRoomTopics, { qos: process.env.QOS }, (error) => {
            console.log(error);
        });
        //handle incoming messages
        mqttClient.on('message', async (topic, message, packet) => {
            console.log("message is " + message);
            console.log("topic is " + topic);
            console.log("packet is " + packet);
        });
        //handle errors
        mqttClient.on("error", function (error) {
            console.log("Can't connect" + error);
            process.exit(1)
        });
    } catch (error) {
        console.log(error);
    }
})



