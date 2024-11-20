// import core
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// import actions
import { additionalUpdate, notification_show, notification_hide, additionalRemoveFrameworks } from 'actions';

// import utils
import { formatDate } from 'mixins/utils';

// import models
import models from 'models/prices';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {
        additional: state.additional,
        notification: state.notification
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        additionalUpdate: (layout, frameworks, options, requirements, hours, summary) => dispatch(additionalUpdate(layout, frameworks, options, requirements, hours, summary)),
        additionalRemoveFrameworks: () => dispatch(additionalRemoveFrameworks()),
        notification_show: (status, message) => dispatch(notification_show(status, message)),
        notification_hide: (status) => dispatch(notification_hide(status))
    }
};

const responsiveList = models.layouts;
const frameworksList = models.frameworks;

class Additional extends Component {
    constructor(props) {
        super(props);

        this.state = {
            frameworks: {},
            responsive: {},
            requirements: [],
            options: [],
            hours: 0,
            summary: ''
        }
    }

    onChange(event, id, propName) {
        let model, modelChanged, modelState = {};

        model = this.props.additional[propName];
        modelChanged = model.map((item) => {
            if (item.id === id) {
                item.isChecked = event.target.checked;
            }

            return item;
        });
        modelState[propName] = modelChanged;

        this.setState(modelState);
    }

    onUpdateStore() {
        let responsive = this.state.responsive;
        let isRKeys = Object.keys(responsive).length ? responsive : this.props.additional.layout;

        let frameworks = this.state.frameworks;
        let isFKeys = Object.keys(frameworks).length ? frameworks : this.props.additional.frameworks;

        let requirements = this.state.requirements;
        let isEKeys = requirements.length ? requirements : this.props.additional.requirements;

        let options = this.state.options;
        let isOKeys = options.length ? options : this.props.additional.options;

        let summary = this.state.summary;
        let isS = summary ? summary : this.props.additional.summary;

        let hours = this.state.hours || this.props.additional.hours;

        this.props.additionalUpdate(isRKeys, isFKeys, isOKeys, isEKeys, hours, isS);

        this.props.notification_show(true, `Addition options saved successfully`);

        setTimeout(() => {
            this.props.notification_hide(false);
        }, this.props.notification.timeout);
    }

    onSet(event, prop) {
        let temp = {}, tempState = {};

        tempState.id    = event.target.dataset.id;
        tempState.name  = event.target.dataset.value;
        tempState.count = event.target.dataset.count;
        temp[prop] = tempState;

        this.setState(temp);
    }

    onClear(event, propName, radio) {
        let model, modelChanged, modelState = {};

        if (radio) {
            let temp = {}, tempState = {};

            temp[propName] = tempState;

            this.setState(temp);
            this.props.additionalRemoveFrameworks();
        } else {
            model = this.props.additional[propName];
            modelChanged = model.map((item) => {
                item.isChecked = false;

                return item;
            });
            modelState[propName] = modelChanged;

            this.setState(modelState);
        }

        event.preventDefault();
    }

    onChangeHours(event) {
        if (!isNaN(event.target.value)) {
            this.setState({ hours: +event.target.value });
        }
    }

    onChangeSummary(event) {
        this.setState({ summary: event.target.value });
    }

    render() {
        let { hours, summary, date } = this.props.additional;
        let requirementsArray = this.state.requirements.length ? this.state.requirements: this.props.additional.requirements;
        let options = this.state.options.length ? this.state.options : this.props.additional.options;

        return (
            <div className="additional">
                <div className="additional__time">
                    <i className="fa fa-calendar" aria-hidden="true"></i> Last Update: { formatDate(date) }
                </div>
                <div className="additional__list">
                    <div className="additional__item">
                        { responsiveList.map((item) => {
                            return (
                                <div key={ item.id }>
                                    <label className="x-radio">
                                        <input
                                            type="radio"
                                            name="responsive"
                                            data-count={ item.count }
                                            data-id={ item.id }
                                            data-value={ item.name }
                                            checked={ Object.keys(this.state.responsive).length ? this.state.responsive.id === item.id : this.props.additional.layout.id === item.id  }
                                            onChange={ (event) => this.onSet(event, 'responsive') }
                                        />
                                        <span className="fake-input"></span>
                                        <span className="fake-label">{ item.name }</span>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="additional__item">
                        { frameworksList.map((item) => {
                            return (
                                <div key={ item.id }>
                                    <label className="x-radio">
                                        <input
                                            type="radio"
                                            name="frameworks"
                                            data-count={ item.count }
                                            data-id={ item.id }
                                            data-value={ item.name }
                                            checked={ Object.keys(this.state.frameworks).length ? this.state.frameworks.id === item.id : this.props.additional.frameworks.id === item.id }
                                            onChange={ (event) => this.onSet(event, 'frameworks') }
                                        />
                                        <span className="fake-input"></span>
                                        <span className="fake-label">{ item.name }</span>
                                    </label>
                                </div>
                            )
                        })}
                        <a href="#" className="additional__clear" onClick={ (event) => this.onClear(event, 'frameworks', true) }>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="additional__item">
                        { requirementsArray.map((item) => {
                            return (
                                <div key={ item.id }>
                                    <label className="x-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={ item.isChecked }
                                            onChange={ (event, id) => this.onChange(event, item.id, 'requirements') }
                                        />
                                        <span className="fake-input"><i className="fa fa-check" aria-hidden="true"></i></span>
                                        <span className="fake-label">{ item.name }</span>
                                    </label>
                                </div>
                            )
                        })}
                        <a href="#" className="additional__clear" onClick={ (event) => this.onClear(event, 'requirements') }>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="additional__item">
                        { options.map((item) => {
                            return (
                                <div key={ item.id }>
                                    <label className="x-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={ item.isChecked }
                                            onChange={ (event, id) => this.onChange(event, item.id, 'options') }
                                        />
                                        <span className="fake-input"><i className="fa fa-check" aria-hidden="true"></i></span>
                                        <span className="fake-label">{ item.name }</span>
                                    </label>
                                </div>
                            )
                        })}
                        <a href="#" className="additional__clear" onClick={ (event) => this.onClear(event, 'options') }>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="additional__item">
                        <div className="additional__sub-title">Hours:</div>
                        <input type="text" value={ this.state.hours || hours } onChange={ (event) => this.onChangeHours(event) } />
                    </div>
                    <div className="additional__item">
                        <div className="additional__sub-title">Summary:</div>
                        <textarea className="additional__summary_textarea" value={ this.state.summary || summary } onChange={ (event) => this.onChangeSummary(event) } cols="20" rows="5"></textarea>
                    </div>
                </div>
                <button className="button" onClick={ () => this.onUpdateStore() }>
                    <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
                </button>
            </div>
        )
    }
}

Additional.propTypes = {
    additional: PropTypes.object,
    additionalUpdate: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Additional);