// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Alert } from 'antd'
import './Error.css'

const Error = ({ error }) => {
    return (
        <div className="container error">
            <Alert message="Error" description={error.message} type="error" showIcon />
        </div>
    )
}

export default Error
