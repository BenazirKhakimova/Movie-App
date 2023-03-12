// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Alert } from 'antd'
import { Detector } from 'react-detect-offline'
import './CheckInternetConection.css'

const CheckInternetConection = (props) => {
    return (
        <Detector
            render={({ online }) =>
                online ? (
                    // eslint-disable-next-line react/destructuring-assignment
                    props.children
                ) : (
                    <div className="offline">
                        <Alert
                            message="Warning"
                            description="You are offline. Please check your internet connection"
                            type="warning"
                            showIcon
                        />
                    </div>
                )
            }
        />
    )
}

export default CheckInternetConection
