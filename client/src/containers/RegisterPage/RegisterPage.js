import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import Spinner from '../../components/LoadingIndicator/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { register } from '../../redux/actions/auth'

const RegisterPage = ({ isAuthenticated, register }) => {
  const [check, setCheck] = useState(isAuthenticated)
  useEffect(() => {
    setCheck(isAuthenticated)
  }, [isAuthenticated])
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: ""
  })
  const { username, password, password2 } = form

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      alert("Please confirm true Password")
    } else {
      register({ username, password })
    }
  }
  return (check === null ? <Spinner /> :
    (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={e => onSubmit(e)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={e => onChange(e)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Repeat password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                      />
                    </CInputGroup>
                    <CButton className="mb-4" type="submit" color="success" block>
                      Create Account
                      </CButton>
                    <Link to="/login">
                      <CButton type="submit" color="primary" block>
                        Login now!
                      </CButton>
                    </Link>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  )
}

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(RegisterPage) 