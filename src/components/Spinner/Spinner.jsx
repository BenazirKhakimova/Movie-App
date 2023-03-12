// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Spin } from 'antd'
import './Spinner.css'

const Spinner = () => {
    return (
        <div className="container spin">
            <Spin size="large" />
        </div>
    )
}

export default Spinner
