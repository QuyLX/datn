import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../redux/actions/user';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';
import Modal from '../../../components/Modal/Modal'

const Users = () => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);
  const history = useHistory()
  const { loading, error, data } = userList

  const fields = [
    { key: 'name', _style: { width: '20%' } },
    { key: 'email', _style: { width: '24%' } },
    { key: 'role', _style: { width: '20%' } },
    { key: 'createdAt', _style: { width: '24%' } },
    {
      key: 'detail',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    },
    {
      key: 'edit',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    },
    {
      key: 'delete',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color="danger" msg={error.message} />
      ) : (
            <CRow>
              <CCol sm={12} >
                <Modal
                  type="Create new user"
                  title="Room info"
                  body={`Create room`}
                  size="lg"
                  color="info"
                />
              </CCol>
              <CCol sm={12}>
                <CCard>
                  <CCardBody>
                    <CDataTable
                      items={data.data}
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
                        'detail':
                          (item, index) => {
                            return (
                              <td className="py-2">
                                <CButton
                                  color="success"
                                  className="mr-1"
                                  onClick={() => history.push(`/users/${ item._id }`)}>
                                  Detail
                                </CButton>
                              </td>
                            )
                          },
                        'edit':
                          (item, index) => {
                            return (
                              <td className="py-2">
                                <Modal
                                  type="Update"
                                  title="User update"
                                  body={`Update this user ${ item._id }`}
                                  size="lg"
                                  color="primary"
                                />
                              </td>
                            )
                          },
                        'delete':
                          (item, index) => {
                            return (
                              <td className="py-2">
                                <Modal
                                  type="Delete"
                                  title="User delete"
                                  body={`Do you want delete this user ${ item._id }?`}
                                  size="sm"
                                  color="danger"
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
          )}
    </>
  )
}

export default React.memo(Users) 
