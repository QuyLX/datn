import React from 'react'
import {
    CHeaderBrand,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const HeaderBrand = () =>
    (
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
            <CIcon name="logo" height="48" alt="Logo" />
        </CHeaderBrand>
    )
export default HeaderBrand