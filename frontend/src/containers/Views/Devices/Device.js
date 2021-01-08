import React from 'react'
import { CCard, CCardBody, CCol, CRow, CDataTable, CCardHeader } from '@coreui/react';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';
import Modal from '../../../components/Modal/Modal'
import CIcon from '@coreui/icons-react';
import FormSchedule from '../../FormSubmit/FormSchedule'
const Device = ({ match }) => {
  const data = []
  [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  const fields = [
    { key: 'name', _style: { width: '20%' } },
    { key: 'role', _style: { width: '20%' } },
    { key: 'createdAt', _style: { width: '24%' } },
    {
      key: 'remove',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]
  return (
    <>
      <CRow>
        {/* list user in use Device */}
        <CCol sm={12} md={6}>
          <>
            <CRow>
              <CCol sm={12} >
                <span className="h4">List schedule in device</span>
              </CCol>
              <CCol sm={12}>
                <CCard>
                  <CCardHeader >
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
                      items={data}
                      fields={fields}
                      columnFilter
                      footer
                      hover
                      sorter
                      pagination
                      scopedSlots={{
                        'remove':
                          (item, index) => {
                            return (
                              <td className="py-2">
                                <Modal
                                  type="Delete"
                                  title="User delete"
                                  body={<b>{`Do you want to remove  ${ item.name }?`}</b>}
                                  size="sm"
                                  color="warning"
                                />
                              </td>
                            )
                          },
                      }}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </>
        </CCol>

        {/* list schedule in Device */}

        <CCol sm={12} md={6}>
          <>

            <CRow>
              <CCol sm={12} >
                <span className="h4">List user in used device</span>
              </CCol>
              <CCol sm={12}>
                <CCard>
                  <CCardHeader >
                    <Modal
                      type="Add user to use this device"
                      title="User info"
                      body={`Add user`}
                      size="lg"
                      color="info"
                    />
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={data}
                      fields={fields}
                      columnFilter
                      footer
                      hover
                      sorter
                      pagination
                      scopedSlots={{
                        'remove':
                          (item, index) => {
                            return (
                              <td className="py-2">
                                <Modal
                                  type="Delete"
                                  title="User delete"
                                  body={`Do you want remove this user ${ item._id }?`}
                                  size="sm"
                                  color="warning"
                                />
                              </td>
                            )
                          },
                      }}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </>

        </CCol>
      </CRow>
      {/* History of device */}
      <CRow>
        <CCol sm={12} >
          <span className="h4">History of device</span>
        </CCol>
        <CCol sm={12}>
          <CDataTable
            items={data}
            fields={fields}
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              'status':
                (item) => (
                  <td>
                    {/* <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge> */}
                  </td>
                )
            }}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Device
