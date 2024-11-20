// import core
import React, { Component } from 'react';

// import components
import SpecificationSearch from '../specification-search';
import SpecificationAdd from '../specification-add';
import SpecificationList from '../specification-list';

// import styles
import './styles';

const isOpenedSpec = 'specification-is-opened';

export default class SpecificationBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: '',
            isOpened: true
        };
    }

    componentDidUpdate() {
        this.state.isOpened ? document.body.classList.add(isOpenedSpec) : document.body.classList.remove(isOpenedSpec);
    }

    onChangeNum(num) {
        this.setState({ num: num });
    }

    onUserToggle() {
        this.setState({ isOpened: !this.state.isOpened });
    }

    render() {
        return (
            <div className="widget">
                <div className="widget__header">
                    {/*<SpecificationAdd />*/}
                    Specification List
                    <SpecificationSearch onSetNum={ (num) => this.onChangeNum(num) } />
                </div>
                <div className="widget__content">
                    <div className="specification">
                        <SpecificationList num={ this.state.num } />
                    </div>
                </div>
            </div>
        )
    }
};