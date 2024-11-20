// import core
import { _, mediator } from 'vendors';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// import actions
import { pageAdd } from 'actions';

// import utils
import { makeID } from 'mixins/utils';

// import component
import Preloader from '../../preloader';

import Dropzone from 'widgets/dropzone';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        pageAdd : (payload) => dispatch(pageAdd(payload))
    }
};

class UploadFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            loading: false
        }
    }

    componentDidMount() {
        this.dropzoneAPI = new Dropzone(this.inputFile, {
            onDrop: (event) => {
                this.onPrepareFiles(event);
            }
        });
    }

    componentWillUnmount() {
        if (this.dropzoneAPI) {
            this.dropzoneAPI.destroy();
        }
    }

    onPrepareFiles(event) {
        let files;

        files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        files = [].slice.call(files);

        function asyncLoad(file) {
            let reader, model;

            return new Promise((resolve) => {
                reader = new FileReader();
                reader.onload = (f) => {
                    model = {
                        id: makeID(),
                        title: file.name,
                        fileName: file.name,
                        fileBase64: f.target.result
                    };

                    resolve(model);
                };
                reader.readAsDataURL(file);
            })
        }
        
        function filesPromises() {
            return files.map((file) => {
                return asyncLoad(file);
            })
        }

        Promise.all(filesPromises()).then((response) => {
            setTimeout(() => { this.setState({ files: response }); }, 10);
        });
    }

    onUserChangeTitle(event) {
        let newFiles = this.state.files.map((item) => {
            if (item.id === event.target.id) {
                item.title = event.target.value;
            }

            return item;
        });

        this.setState({ files: newFiles });
    }

    onUserUpload() {
        this.setState({ loading: true });

        setTimeout(() => {
            this.props.pageAdd(this.state.files);
            mediator.emit('upload:images');
            setTimeout(() => { this.setState({ files: [], loading: false }); }, 10);
        }, 10)
    }

    onUserRemove(fileId) {
        let files = this.state.files;
        let filesFiltered = _.filter([...files], (item) => item.id !== fileId);

        setTimeout(() => { this.setState({ files: filesFiltered }); }, 10);
    }

    render() {
        return (
            <div className={`upload-file ${this.state.loading ? 'loading' : ''} `}>
                <div className="upload-file__section">
                    <p>You can upload single or multiply images</p>
                    <div className="upload-file__dropzone" ref={ (input) => { this.inputFile = input } }>
                        <div className="button_dropzone">
                            <i className="fa fa-upload" aria-hidden="true"></i>
                            <div className="button">
                                <span>Upload</span>
                                <input type="file" accept="image/*" multiple onChange={ (event) => this.onPrepareFiles(event) } />
                            </div>
                        </div>
                    </div>
                    {/*<div className="button">*/}
                        {/*<i className="fa fa-upload" aria-hidden="true"></i>*/}
                        {/*<span>Choice</span>*/}
                        {/*<input type="file" accept="image/*" multiple onChange={ (event) => this.onPrepareFiles(event) } />*/}
                    {/*</div>*/}
                </div>
                <div className={ `upload-file__section ${this.state.files.length ? '' : 'hidden'}` }>
                    <p>You can change names as you want</p>
                    <div className="upload-file__list">
                        { this.state.files.map((item, index) => {
                            return (
                                <div key={ index } className="upload-file__item">
                                    <input type="text" id={ item.id } value={ item.title } onChange={ (event) => this.onUserChangeTitle(event) } />
                                    <a onClick={ () => { this.onUserRemove(item.id) } }><i className="fa fa-trash" aria-hidden="false"></i></a>
                                </div>
                            )
                        }) }
                    </div>
                    <button className="button" onClick={(event) => this.onUserUpload(event) }>
                        <span className="text"><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</span>
                        <Preloader status={ this.state.loading } />
                    </button>
                </div>
            </div>
        )
    }
}

UploadFile.propTypes = {
    pageAdd: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);