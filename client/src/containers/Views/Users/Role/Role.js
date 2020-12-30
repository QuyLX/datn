import React, { useEffect } from 'react'
import Spinner from '../../../../components/LoadingIndicator/Spinner'
import withUsersRole from '../../../HOC/Read/ShowEntities';
const Role = (props) => {
    useEffect(() => { props.read() }, []);
    return (
        <div>
            This is Role
        </div>
    )
}


export default withUsersRole({ entityName: "users-roles", params: "users_roles" })(Role)
