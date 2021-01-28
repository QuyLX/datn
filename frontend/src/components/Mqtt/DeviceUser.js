import React from 'react';
import {
  CCol,
  CWidgetSimple,
  CSwitch,
  CRow,
  CWidgetProgressIcon,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useSelector } from 'react-redux';
import ModalUser from '../../components/Modal/ModalUser';
import ModalHistory from '../../components/Modal/ModalHistory';
import ModalSchedule from '../../components/Modal/ModalSchedule';
// call api publish data in here
const DeviceUser = ({ name, status, icon, users, id, msgSensor }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <CCol sm='12' md='6'>
      <CWidgetSimple
        header={name === 'sensor1' ? 'DHT11 realtime' : name}
        text={name === 'sensor1' ? 'DHT11' : status}
      >
        <CRow>
          <CCol sm='6'>
            {name === 'sensor1' ? (
              <CWidgetProgressIcon
                header='HUMD'
                // text={msgSensor}
                color='gradient-info'
              ></CWidgetProgressIcon>
            ) : (
              <CIcon
                style={{
                  color: status === 'on' ? 'orange' : 'gray',
                }}
                size='4xl'
                name={icon}
              />
            )}
          </CCol>
          {name === 'sensor1' ? (
            <CCol sm='6'>
              <CWidgetProgressIcon
                header={`19°c`}
                text='Temp'
                color='gradient-success'
              ></CWidgetProgressIcon>
            </CCol>
          ) : (
            <CCol
              style={{
                paddingTop: '6%',
              }}
              sm='6'
            >
              <CSwitch
                disabled={!users.includes(user.data._id)}
                className={'mx-1'}
                variant={'3d'}
                color={'success'}
                defaultChecked={status === 'on' ? true : false}
              />
            </CCol>
          )}
        </CRow>
        <CRow
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          <ModalUser
            type='Users'
            title='Users'
            size='sm'
            color='info'
            deviceId={id}
          />
          <ModalSchedule role={!users.includes(user.data._id)} />
          <ModalHistory
            type='History'
            title='History'
            size='lg'
            color='primary'
            deviceId={id}
          />
        </CRow>
      </CWidgetSimple>
    </CCol>
  );
};

export default DeviceUser;
