// import core
import { mediator } from 'vendors';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// import components
import SpecificationItem from '../specification-item';

// import widgets
import ScrollBottom from 'widgets/scroll-to-bottom';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {
        spec: state.specification
    }
};

class SpecificationList extends Component {
    componentDidMount() {
        this.scrollApi = new ScrollBottom({
            element: '.specification__list',
            elementParent: '.widget__content'
        });
    }

    componentDidUpdate() {
        mediator.on('specification:add', () => {
            this.scrollApi.scollBottom();
        });
    }

    modifiedList() {
        let { spec, num } = this.props;
        let specification;

        if (num !== '') {
            specification = [spec[+num - 1]];
        }

        if (+num > spec.length || +num.charAt(0) === 0) {
            specification = [];
        }

        if (+num === 0) {
            specification = spec;
        }

        return specification;
    }

    render() {
        let { num } = this.props;

        return (
            <div className="specification__list">
                { this.modifiedList().map((item, key) => {
                    return (
                        <SpecificationItem key={ key } item={ item } index={ num ? +num === 0 ? key + 1 : num : key + 1 } />
                    )
                }) }
            </div>
        )
    }
}

SpecificationList.propTypes = {
    specs: PropTypes.array,
    num: PropTypes.string,
};

export default connect(mapStateToProps)(SpecificationList)