import React, { useEffect } from 'react'
import Spinner from '../../../../components/LoadingIndicator/Spinner'
import withUsersBlock from '../../../HOC/Read/ShowEntities';
const UserBlock = (props) => {
    useEffect(() => { props.read() }, []);
    return (
        <div>
            This is UserBlock
        </div>
    )
}


export default withUsersBlock({ entityName: "users-block", params: "users_block" })(UserBlock)
