import React from 'react'
import Modals from '../Modal/Modal'

const DeleteConfirm = ({ item }) => (
    <Modals
        name="Delete"
        content="Do you want to delete this device?"
        color="danger"
        size="sm"
        item={item._id}
    />)

export default DeleteConfirm