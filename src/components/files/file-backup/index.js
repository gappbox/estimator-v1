// import core
import { _, mediator } from 'vendors';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import actions
import { projectLoadJson, additionalLoadJson, pageLoadJson, specificationLoadJson } from 'actions';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        projectLoadJson: (payload) => dispatch(projectLoadJson(payload)),
        additionalLoadJson: (payload) => dispatch(additionalLoadJson(payload)),
        pageLoadJson: (payload) => dispatch(pageLoadJson(payload)),
        specificationLoadJson: (payload) => dispatch(specificationLoadJson(payload)),
    }
};

let backupJSON = null;

class FileBackup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: {
                status: false,
                message: ''
            }
        }
    }

    onUploadPrepare(event) {
        let file = event.target.files[0];
        let reader, json;
        let error;

        reader = new FileReader();
        reader.onload = (e) => {
            try {
                json = JSON.parse(e.target.result);
                backupJSON = json;
                error = { status: false, message: '' };
            } catch (ex) {
                error = { status: true,  message: ex };
            }

            this.setState({ error: error });
        };
        reader.readAsText(file);
    }

    onUploadJSON() {
        if (!backupJSON) return;

        let { projectLoadJson, additionalLoadJson, pageLoadJson, specificationLoadJson  } = this.props;

        projectLoadJson(backupJSON.project);
        additionalLoadJson(backupJSON.additional);
        pageLoadJson(backupJSON.pages);
        specificationLoadJson(backupJSON.specification);

        mediator.emit('upload:json');
        backupJSON = null;
    }

    render() {
        return (
            <div className="file-backup">
                <p>Please choise file <strong>backup.json</strong> from your project folder</p>
                <div>
                    <span className="button">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                        <span>Choice</span>
                        <input type="file" onChange={ (event) => { this.onUploadPrepare(event) } } />
                    </span> &nbsp;
                    <span className="button" onClick={ () => { this.onUploadJSON() } }>Load File</span>
                </div>
                <div className={`error ${this.state.error.status ? 'error-active' : ""}`}>Please upload file in JSON format</div>
            </div>
        )
    }
}

FileBackup.propTypes = {
    projectLoadJson: PropTypes.func,
    additionalLoadJson: PropTypes.func,
    pageLoadJson: PropTypes.func,
    specificationLoadJson: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(FileBackup);