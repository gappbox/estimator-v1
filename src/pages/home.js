// import core
import { provider, providerID } from 'vendors';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import actions
import { pageLoadJson, projectLoadJson, specificationLoadJson, additionalLoadJson } from 'actions';

// import components
import Navbar from '../components/navbar';
import SpecificationBlock from '../components/specification/specification-block';
import Visualization from '../components/visualization';
import Notification from '../components/notification';
import Preloader from '../components/preloader';

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        projectLoadJson: (payload) => dispatch(projectLoadJson(payload)),
        pageLoadJson: (payload) => dispatch(pageLoadJson(payload)),
        specificationLoadJson: (payload) => dispatch(specificationLoadJson(payload)),
        additionalLoadJson: (payload) => dispatch(additionalLoadJson(payload))
    }
};

class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };
    }

    componentWillMount() {
        this.getDataFromBase();
    }

    getDataFromBase() {
        this.setState({ loading: true });

        setTimeout(() => {
            provider.get(providerID).then((response) => {
                if (response) {
                    this.props.projectLoadJson(response.payload.project);
                    this.props.pageLoadJson(response.payload.pages);
                    this.props.specificationLoadJson(response.payload.specification);
                    this.props.additionalLoadJson(response.payload.additional);
                }

                setTimeout(() => { this.setState({ loading: false }); }, 1);
            });
        }, 10);
    }

    render() {
        return (
            <div className={ this.state.loading ? 'loading-provider' : '' }>
                <Navbar />
                <main className="layout">
                    <div className="layout__visalization">
                        <Visualization />
                    </div>
                    <div className="layout__specification">
                        <SpecificationBlock />
                    </div>
                </main>
                <Notification data={ this.props.notification } />
                <Preloader status={ this.state.loading } />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(HomeComponent);