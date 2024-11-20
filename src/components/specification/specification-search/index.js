// import core
import { mediator } from 'vendors';
import React, { PropTypes, Component } from 'react';

// import styles
import './styles';

export default class SpecificationSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { index: '' };

        mediator.on('Filter:setIndex', (value) => {
            this.setState({ index: value + 1 });
            this.props.onSetNum((value + 1).toString());
        });
    }

    onUserSetNum(event) {
        let value = event.target.value;

        if (!isNaN(value)) {
            this.setState({ index: value });
            this.props.onSetNum(value);
        }
    }

    render() {
        return (
            <div className="specification-search">
                <label htmlFor="search">Block filter</label>
                <input id="search" placeholder="№" type="text" value={ this.state.index } onChange={ (event) => this.onUserSetNum(event) } />
            </div>
        )
    }
}

SpecificationSearch.propTypes = {
    onSetNum: PropTypes.func
};