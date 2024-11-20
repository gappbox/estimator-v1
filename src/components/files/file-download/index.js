// import core
import { _, bitmapCanvas, zip, FileSaver, calc, estimator, provider } from 'vendors';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// import component
import Preloader from '../../preloader';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {
        pages: state.pages,
        specs: state.specification,
        project: state.project,
        additional: state.additional
    }
};

class DownloadZIP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            nativeName: false
        }
    }

    onChangeState(event) {
        this.setState({ nativeName : event.target.checked });
    }

    onUserClick() {
        this.setState({ loading: true });
        setTimeout(() => { this.onDownloadZip(); }, 10);
    }

    onDownloadZip() {
        calc.setValues(this.props.specs, this.props.additional);
        estimator.setValues(this.props.pages, this.props.specs, this.props.additional);

        let estimate = estimator.create();
        let collections = bitmapCanvas.getCollection();
        let status = this.state.nativeName;
        let { title } = this.props.project;

        title = title.replace(/\s/g, '_');

        this.props.specs.forEach((item, index) => {
            bitmapCanvas.drawRect(item, index);
        });

        zip.files = {};
        zip.file(`estimation_${title || ''}.txt`, estimate);

        let backup = {};

        backup['project'] = this.props.project;
        backup['additional'] = this.props.additional;
        backup['pages'] = this.props.pages;
        backup['specification'] = this.props.specs;

        zip.file(`backup.json`, JSON.stringify(backup));

        for (let key in collections) {
            let api = collections[key];
            let filename = api.filename.replace(/\.(jpg|png|gif|jpe?g)/g, '');
            let canvas   = api.element;
            let name = status ? filename : api.title.replace(/\s/g, '_').replace(/\.(jpg|png|gif|jpe?g)/g, '');

            zip.file(`estimation_${title || ''}_${name}.png`, canvas.toDataURL().substr(canvas.toDataURL().indexOf(',') + 1), {base64: true});
        }

        zip.generateAsync({type:"blob"}).then((blob) => {
            FileSaver.saveAs(blob, `estimation_${title || ''}.zip`);

            this.props.pages.forEach((item) => {
                bitmapCanvas.redrawImage(item);
            });

            provider.clear();
            this.setState({ loading: false });

        });
    }

    render() {
        return (
            <div className={ `download-zip ${this.state.loading ? 'loading' : ''}` }>
                <div className="download-zip__note">
                    <label className="x-checkbox">
                        <input type="checkbox" onChange={ (event) => this.onChangeState(event) } checked={ this.state.nativeName } />
                        <span className="fake-input"><i className="fa fa-check" aria-hidden="true"></i></span>
                        <span className="fake-label">Download images with native filename</span>
                    </label>
                </div>
                <button className="button" onClick={ () => this.onUserClick() }>
                    <span className="text">Download</span>
                    <Preloader status={ this.state.loading } />
                </button>
            </div>
        )
    }
}

DownloadZIP.propTypes = {
    pages: PropTypes.array,
    specs: PropTypes.array,
    project: PropTypes.object,
    additional: PropTypes.object
};

export default connect(mapStateToProps)(DownloadZIP)