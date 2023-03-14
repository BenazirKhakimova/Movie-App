// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Pagination as AntPagination } from 'antd'
import './Pagination.css'

const Pagination = ({ handlePaginationChange, currentPage, totalResults }) => {
    return (
        <div className="container pagination">
            <AntPagination
                defaultCurrent={1}
                pageSize={20}
                current={currentPage}
                total={totalResults}
                onChange={handlePaginationChange}
                responsive
                showSizeChanger={false}
            />
        </div>
    )
}

export default Pagination
