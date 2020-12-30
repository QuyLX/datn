import React, { useState } from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'

const Modals = ({ name, content, color, item, size }) => {
    const [large, setLarge] = useState(false)
    return (
        <>
            <CButton size={size} color={color} onClick={() => setLarge(!large)} className="mr-1">
                {name}
            </CButton>
            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size={size}
            >
                <CModalHeader closeButton>
                    <CModalTitle>{name}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {content}
                    <p>{JSON.stringify(item)}</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color={color} onClick={() => setLarge(!large)}>Do Something</CButton>{' '}
                    <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Modals

