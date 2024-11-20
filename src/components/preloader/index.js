// import core
import React, { Component, PropTypes } from 'react';

// import styles
import './styles';

export default class Preloader extends Component {
    render() {
        let { status } = this.props;

        if (status) {
            return (
                <div className="loader">
                    <div className="loader-h">
                        <div className="loader-f">
                            <div className="loader-wrap">
                                <div className="bar1"></div>
                                <div className="bar2"></div>
                                <div className="bar3"></div>
                                <div className="bar4"></div>
                                <div className="bar5"></div>
                                <div className="bar6"></div>
                                <div className="bar7"></div>
                                <div className="bar8"></div>
                                <div className="bar7"></div>
                                <div className="bar8"></div>
                                <div className="bar9"></div>
                                <div className="bar10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return false;
        }
    }
}

Preloader.PropTypes = {
    status: PropTypes.bool
};