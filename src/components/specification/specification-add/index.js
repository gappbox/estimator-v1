// import core
import { mediator } from 'vendors';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// import actions
import { specificationAdd } from 'actions';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {
        pages: state.pages,
        project: state.project,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        specificationAdd : (model) => dispatch(specificationAdd(model))
    }
};

class SpecificationAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'Element',
            pageID: '',
            duration: 0.22,
            comment: '',
            rect: { left: 0, top: 0, height: 65, width: 65 }
        }
    }

    onSubmitForm() {
        let { specificationAdd, project: { pageID } } = this.props;
        this.setState({ pageID: pageID }, () => { specificationAdd(this.state); });

        mediator.emit('specification:add');
    }

    pagesLength() {
        return this.props.pages.length;
    }

    render() {
        return (
            <div className="specification-add" data-disabled={ !this.pagesLength() }>
                <img height="25" width="25" src={"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDU2MSA1NjEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2MSA1NjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icXVldWUiPgoJCTxwYXRoIGQ9Ik01MSwxMDJIMHY0MDhjMCwyOC4wNSwyMi45NSw1MSw1MSw1MWg0MDh2LTUxSDUxVjEwMnogTTUxMCwwSDE1M2MtMjguMDUsMC01MSwyMi45NS01MSw1MXYzNTdjMCwyOC4wNSwyMi45NSw1MSw1MSw1MSAgICBoMzU3YzI4LjA1LDAsNTEtMjIuOTUsNTEtNTFWNTFDNTYxLDIyLjk1LDUzOC4wNSwwLDUxMCwweiBNNDU5LDI1NUgzNTd2MTAyaC01MVYyNTVIMjA0di01MWgxMDJWMTAyaDUxdjEwMmgxMDJWMjU1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="} />
                <span className="specification-add__handler" onClick={ () => this.onSubmitForm() }></span>
            </div>
        )
    }
}

SpecificationAdd.propTypes = {
    pages: PropTypes.array,
    project: PropTypes.object,
    specificationAdd: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecificationAdd);