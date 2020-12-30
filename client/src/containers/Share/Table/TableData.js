import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CDataTable, CPagination } from '@coreui/react'

const TableData = ({ usersData, fields, config, type }) => {
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/${type}?page=${newPage}`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])
    return (
        <div>
            <CDataTable
                columnFilter
                tableFilter
                footer
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                activePage={page}
                clickableRows={true}
                items={usersData}
                fields={fields}
                scopedSlots={config}
            />
            <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={20}
                doubleArrows={true}
                align="center"
            />
        </div>
    )
}

export default TableData
