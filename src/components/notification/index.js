// import core
import React, { Component } from 'react';

// import styles
import './styles';

export default class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { status, message, position } = this.props.data;

        return (
            <div className={`notification position-${position} ${status ? 'is-opened': ''}`}><i className="fa fa-info" aria-hidden="true"></i> { message }</div>
        )
    }
}