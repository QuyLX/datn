import React from 'react';
import {
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCardFooter,
} from '@coreui/react';
import DeviceUser from './DeviceUser';
import CIcon from '@coreui/icons-react';

const CardRoomUser = ({
  roomName,
  roomId,
  icon,
  allDevice,
  desc,
  msgSensor,
}) => {
  // get real time data in here
  return (
    <CCol sm='12' md='6'>
      <CCard style={{ backgroundColor: '#ebedef', textAlign: 'center' }}>
        <CCardHeader
          style={{
            backgroundColor: '#ebedef',
            color: '#768192',
          }}
        >
          <b>{`${roomName}     `}</b>
          <CIcon size='2xl' name={icon} />
        </CCardHeader>
        <CCardBody>
          <CRow>
            {allDevice &&
              allDevice.map(
                (item) =>
                  item.room._id === roomId && (
                    <DeviceUser
                      roomName={roomName}
                      roomId={roomId}
                      name={item.name}
                      key={item._id}
                      status={item.state}
                      icon={item.icon}
                      users={item.users}
                      id={item._id}
                      // msgSensor={msgSensor}
                    />
                  )
              )}
          </CRow>
        </CCardBody>
        <CCardFooter
          style={{
            backgroundColor: '#ebedef',
            color: '#768192',
          }}
        >
          <span className='h4'>{desc}</span>
        </CCardFooter>
      </CCard>
    </CCol>
  );
};

export default CardRoomUser;
