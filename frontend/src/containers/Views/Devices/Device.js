import React, { useEffect } from 'react'
import { CCard, CCardBody, CCol, CRow, CDataTable, CCardHeader, CButton, CBadge } from '@coreui/react';
import Spinner from '../../../components/Spinner/Spinner';
import Alert from '../../../components/Alert/Alert';
import Modal from '../../../components/Modal/Modal'
import FormSchedule from '../../FormSubmit/FormSchedule';
import ListUser from '../../FormSubmit/ListUser'
import { getUsersInused, removeUserToUseDevice } from '../../../redux/actions/user'
import { getSchedulesPerDevice } from '../../../redux/actions/schedule'
import { getHistoriesPerDevice } from '../../../redux/actions/history'
import { useSelector, useDispatch } from "react-redux"
const Device = ({ match }) => {
  const dispatch = useDispatch();
  const scheduleListOnDevice = useSelector(state => state.scheduleListOnDevice);
  const historyListPerDevice = useSelector(state => state.historyListPerDevice);
  const userListPerDevice = useSelector(state => state.userListPerDevice);
  const { loading: loadUsers, data: dataUsers, error: errUsers } = userListPerDevice
  const { loading: loadSchedule, data: dataSchedule, error: errSchedule } = scheduleListOnDevice;
  const { loading: loadHistory, data: dataHistory, error: errHistory } = historyListPerDevice
  const fields = [
    { key: 'name', _style: { width: '20%' } },
    { key: 'createdAt', _style: { width: '24%' } },
    {
      key: 'remove',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]
  const fieldUser = [
    { key: 'name', _style: { width: '20%' } },
    {
      key: 'remove',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]
  const fieldsHistories = [
    { key: "user", _style: { width: "20%" } },
    { key: "typeAction", _style: { width: "20%" } },
    { key: "state", _style: { width: "20%" } },
    { key: "device", _style: { width: "20%" } },
    { key: "createdAt", _style: { width: "20%" } },
  ];
  const getBadge = (state) => {
    switch (state) {
      case "on":
        return "success";
      case "off":
        return "danger";
      default:
        return "primary";
    }
  };

  useEffect(() => {
    Promise.all([
      dispatch(getUsersInused(match.params.id)),
      dispatch(getSchedulesPerDevice(match.params.id)),
      dispatch(getHistoriesPerDevice(match.params.id))
    ])

  }, [dispatch, match.params.id]);
  return (
    <>
      <CRow>
        <CCol sm={12} md={6}>
          <>
            {loadSchedule ? (
              <Spinner />
            ) : errSchedule ? (
              <Alert color="danger" msg={errSchedule.message} />
            ) : (
              <CRow>
                <CCol sm={12}>
                  <span className="h4">List schedule in device</span>
                </CCol>
                <CCol sm={12}>
                  <CCard>
                    <CCardHeader>
                      <Modal
                        type="Add schedule"
                        title="Schedule info"
                        body={<FormSchedule />}
                        size="lg"
                        color="info"
                      />
                    </CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={dataSchedule.data}
                        fields={fields}
                        columnFilter
                        tableFilter
                        footer
                        itemsPerPageSelect
                        itemsPerPage={5}
                        hover
                        sorter
                        pagination
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            )}
          </>
        </CCol>

        {/* list user in Device */}

        <CCol sm={12} md={6}>
          <>
            {loadUsers ? (
              <Spinner />
            ) : errUsers ? (
              <Alert color="danger" msg={errUsers.message} />
            ) : (
              <CRow>
                <CCol sm={12}>
                  <span className="h4">List user in used device</span>
                </CCol>
                <CCol sm={12}>
                  <CCard>
                    <CCardHeader>
                      <Modal
                        type="Add user to use this device"
                        title="User info"
                        body={<ListUser deviceId={match.params.id} />}
                        size="lg"
                        color="info"
                      />
                    </CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={
                          dataUsers && dataUsers.data && dataUsers.data.users
                        }
                        fields={fieldUser}
                        columnFilter
                        tableFilter
                        footer
                        itemsPerPageSelect
                        itemsPerPage={5}
                        hover
                        sorter
                        pagination
                        scopedSlots={{
                          remove: (item, index) => {
                            return (
                              <td className="py-2">
                                <Modal
                                  type="Remove"
                                  title="Remove User for this device"
                                  body={
                                    <>
                                      <b>{`Do you want delete ${item.name}?`}</b>
                                      <CButton
                                        color="danger"
                                        onClick={() => {
                                          dispatch(
                                            removeUserToUseDevice(
                                              match.params.id,
                                              item._id
                                            )
                                          );
                                        }}
                                        style={{ float: "right" }}
                                      >
                                        Remove
                                      </CButton>
                                    </>
                                  }
                                  size="sm"
                                  color="danger"
                                />
                              </td>
                            );
                          },
                        }}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            )}
          </>
        </CCol>
      </CRow>
      {/* History of device */}
      {loadHistory ? (
        <Spinner />
      ) : errHistory ? (
        <Alert color="danger" msg={errHistory.message} />
      ) : (
        <CRow>
          <CCol sm={12}>
            <span className="h4">History of device</span>
          </CCol>
          <CCol sm={12}>
            <CDataTable
              items={dataHistory && dataHistory.data}
              fields={fieldsHistories}
              columnFilter
              tableFilter
              footer
              itemsPerPageSelect
              itemsPerPage={10}
              hover
              sorter
              pagination
              scopedSlots={{
                state: (item) => (
                  <td>
                    <CBadge color={getBadge(item.state)}>
                      {item.state === "on"
                        ? "Bật"
                        : item.state === "off"
                        ? "Tắt"
                        : "Cập nhật"}
                    </CBadge>
                  </td>
                ),
                device: (item) => (
                  <td>
                    <b>{item.deviceName}</b>{" "}
                  </td>
                ),
              }}
            />
          </CCol>
        </CRow>
      )}
    </>
  );
}

export default Device
