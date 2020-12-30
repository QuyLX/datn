import React from 'react'
import { loadComponent } from '../../../utils/loadComponent'
import {
    CRow, CCol
} from '@coreui/react'
import BasedForm from '../Form/BasedForm'
import Tabs from '../Tabs/Tabs'
const LoadComponent = ({ type }) => {
    const config = loadComponent(type)
    return (
        <>
            <CRow>
                <CCol>
                    <BasedForm basedInput={config.basedInput} />
                </CCol>
            </CRow>
            <CRow>
                <CCol >
                    <Tabs tabs={config.tabs} />
                </CCol>
            </CRow>
        </>
    )
}

export default LoadComponent
