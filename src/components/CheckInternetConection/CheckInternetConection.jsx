// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { Alert } from 'antd'
import './CheckInternetConection.css'

class CheckInternetConection extends Component {
    state = {
        online: navigator.onLine,
    }

    componentDidMount() {
        window.addEventListener('online', this.handleOnlineStatus)
        window.addEventListener('offline', this.handleOnlineStatus)
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleOnlineStatus)
        window.removeEventListener('offline', this.handleOnlineStatus)
    }

    handleOnlineStatus = () => {
        this.setState({ online: navigator.onLine })
    }

    render() {
        const { online } = this.state
        const { children } = this.props
        return online ? (
            children
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
}

export default CheckInternetConection
