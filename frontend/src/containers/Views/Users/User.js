import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import Modal from '../../../components/Modal/Modal'
import ResetPassword from '../../FormSubmit/ResetPassword'

import { useSelector } from 'react-redux';

const User = ({ match }) => {
  const { data } = useSelector(state => state.userList.data);
  const user = data.find(user => user._id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <>
      <CRow>
        <CCol sm={12} >
          <Modal
            type="Reset Password"
            title="Reset passowrd"
            body={<ResetPassword id={match.params.id}/>}
            size="sm"
            color="warning"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={12}>
          <CCard>
            <CCardHeader>
              User id: {match.params.id}
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      if (key != "devices") {
                        return (
                          <tr key={index.toString()}>
                            <td>{`${ key }:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        )
                      }
                    })
                  }
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default User
