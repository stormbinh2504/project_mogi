import React, { Component } from 'react';

import './ErrorBoundary.scss';

class ErrorBoundary extends Component {

    state = { hasError: false };

    reloadContent = () => {
        this.setState({ hasError: false });
    };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-wrapper">
                        <div className="error-boundary-content">
                            <div className="icon">
                                <i className="far fa-exclamation-triangle" />
                            </div>
                            <div className="message">
                                Có lỗi xảy ra yêu cầu tải lại trang
                            </div>
                            <div className="action">
                                <button className="btn btn-info" onClick={this.reloadContent}>
                                   Tải lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;