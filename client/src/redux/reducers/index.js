import { combineReducers } from 'redux';
import changeState from './changeState';
import auth from './auth'
import { resetPassword } from './auth';
import {
    createRoom,
    deleteRoom,
    roomDetail,
    roomList,
    updateRoom
} from './room'
import {
    addUserToUseDevice,
    createUser,
    deleteUser,
    removeUserToUseDevice,
    updateUser,
    userDetail,
    userList,
    userListPerDevice
} from './user'
import {
    createSchedule,
    deleteSchedule,
    scheduleDetail,
    scheduleList,
    scheduleListOnDevice,
    updateSchedule
} from './schedule'
import {
    historyList,
    historyListPerDevice
} from './history'
import {
    controlDevice,
    createDevice,
    deleteDevice,
    deviceDetail,
    deviceList,
    deviceListInRoom,
    updateDevice
} from './device'



export default combineReducers({
    changeState,
    auth,
    resetPassword: resetPassword,
    createRoom: createRoom,
    deleteRoom: deleteRoom,
    roomDetail: roomDetail,
    roomList: roomList,
    updateRoom: updateRoom,
    addUserToUseDevice: addUserToUseDevice,
    createUser: createUser,
    deleteUser: deleteUser,
    removeUserToUseDevice: removeUserToUseDevice,
    updateUser: updateUser,
    userDetail: userDetail,
    userList: userList,
    userListPerDevice: userListPerDevice,
    createSchedule: createSchedule,
    deleteSchedule: deleteSchedule,
    scheduleDetail: scheduleDetail,
    scheduleList: scheduleList,
    scheduleListOnDevice: scheduleListOnDevice,
    updateSchedule: updateSchedule,
    historyList: historyList,
    historyListPerDevice: historyListPerDevice,
    controlDevice: controlDevice,
    createDevice: createDevice,
    deleteDevice: deleteDevice,
    deviceDetail: deviceDetail,
    deviceList: deviceList,
    deviceListInRoom: deviceListInRoom,
    updateDevice: updateDevice
})