// import core
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// import actions
import { projectTitleChange, notification_show, notification_hide } from 'actions';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {
        project: state.project,
        notification: state.notification
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        projectTitleChange: (title) => dispatch(projectTitleChange(title)),
        notification_show: (status, message) => dispatch(notification_show(status, message)),
        notification_hide: (status) => dispatch(notification_hide(status))
    }
};

class ProjectTitle extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onSaveTitle() {
        this.props.projectTitleChange(this.state.title || this.props.project.title);
        this.props.notification_show(true, `Project name saved successfully`);

        setTimeout(() => {
            this.props.notification_hide(false);
        }, this.props.notification.timeout);
    }

    render() {
        let { title } = this.props.project;

        return (
            <div className="project-title">
                <p>Please enter project name</p>
                <div className="project-title__input">
                    <input type="text" value={ this.state.title || title } placeholder="Project Title" onChange={ (event) => this.onChangeTitle(event) } />
                </div>
                <button className="button" onClick={ () => this.onSaveTitle() }>
                    <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
                </button>
            </div>
        )
    }
}

ProjectTitle.propTypes = {
    project: PropTypes.object,
    projectTitleChange: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTitle);