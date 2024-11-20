// import core
import { _, $, mediator, bitmapCanvas, confirm, provider, providerID } from 'vendors';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// import actions
import { specificationAdd, specificationRemove, specificationChange,  specificationRemoveCollection, projectCurrentPage,  pageRemove, notification_show, notification_hide } from 'actions';

// import widgets
import Draggable from 'widgets/draggable/draggable';
import jcf from 'widgets/custom-forms';

import DrawSelection from 'widgets/draw-selection';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {
        pages: state.pages,
        specs: state.specification,
        project: state.project,
        notification: state.notification
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        specificationAdd: (model) => dispatch(specificationAdd(model)),
        specificationRemove: (id) => dispatch(specificationRemove(id)),
        specificationChange: (id, props) => dispatch(specificationChange(id, props)),
        specificationRemoveCollection: (id) => dispatch(specificationRemoveCollection(id)),
        pageRemove: (id) => dispatch(pageRemove(id)),
        projectCurrentPage: (pageID) => dispatch(projectCurrentPage(pageID)),
        notification_show: (status, message) => dispatch(notification_show(status, message)),
        notification_hide: (status) => dispatch(notification_hide(status))
    }
};

class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = { currentPage: this.props.project.pageID || '' };
    }

    componentWillMount() {
        mediator.on('upload:images', this.uploadImages.bind(this));
        mediator.on('upload:json', this.uploadJson.bind(this));
    }

    componentDidMount() {
        // initialize custom scrollbar
        this.scrollable = document.querySelector('.layout__visalization .jcf-scrollable');
        jcf.replace(this.scrollable, 'Scrollable');

        provider.get(providerID).then((response) => {
            if (response) {
                this.selectPage(response.payload.project.pageID);
            }
        });
    }

    componentDidUpdate() {
        const self = this;
        const jcfInstance = jcf.getInstance(this.scrollable);
        jcfInstance.refresh();

        _.forEach(this.props.pages, (item) => {
            bitmapCanvas.initialize(item);
        });

        _.forEach(this.props.specs, (item) => {
            let elements = document.querySelectorAll(`[data-id="${item.id}"]`);

            _.forEach(elements, (element) => {
                new Draggable(element, {
                    placeholder: '.paint__placeholder',
                    iconSize: '.paint__icon-resize',
                    iconDrag: '.paint__icon-move',
                    onDragEnd: function(instance, id, props) {
                        self.props.specificationChange(id, props);
                    }
                });
            });
        });

        let placeholders = document.querySelectorAll('.paint__placeholder');

        _.forEach(placeholders, (placeholder) => {
            new DrawSelection(placeholder, {
                onClearDimension: function (props) {
                    let { specificationAdd, project: { pageID } } = self.props;
                    let model = {
                        pageID: pageID,
                        rect: props
                    };

                    specificationAdd(model);
                    mediator.emit('specification:add'); // trigger for scrolling to bottom
                }
            });
        });
    }

    componentWillUnmount() {
        // destroy custom scrollbar
        jcf.destroy(this.scrollable);
    }

    uploadImages() {
        this.selectLastPage();
        this.props.notification_show(true, `All Images upload successfully`);

        setTimeout(() => {
            this.props.notification_hide(false);
        }, this.props.notification.timeout);
    }

    uploadJson() {
        this.selectLastPage();
    }

    selectPage(pageID) {
        this.setState({ currentPage: pageID });
        this.props.projectCurrentPage(pageID);
    }

    selectLastPage() {
        let lastPageID;

        setTimeout(() => {
            lastPageID = _.last(this.props.pages).id;
            this.selectPage(lastPageID);
        }, 1);
    }

    deletePage(pageID) {
        confirm.open('Are you sure? <br>Do you want to delete this page?').then((status) => {
            if (status) {
                this.props.specificationRemoveCollection(pageID);
                this.props.pageRemove(pageID);
                bitmapCanvas.deleteFromCollection(pageID);

                let lastPageID = _.filter(this.props.pages, (item) => item.id !== pageID);
                if (lastPageID[lastPageID.length - 1]) {
                    this.selectPage(lastPageID[lastPageID.length - 1].id);
                }
            }
        });
    }

    deleteSpecification(specId) {
        confirm.open('Are you sure? <br>Do you want to delete this specification?').then((status) => {
            if (status) {
                this.props.specificationRemove(specId);
            }
        })
    }

    onUserShow(event, index) {
        if (event.altKey) {
            mediator.emit('Filter:setIndex', index);
        }
    }

    render() {
        return (
            <div className="canvas-area">
                <div className="widget">
                    <div className="widget__header">
                        <div className="tabs">
                            <div className="tabs__list jcf-scrollable">
                                <ul>
                                    { this.props.pages.map((item, index) => {
                                        return (
                                            <li key={ index } className={ `tabs__item ${this.state.currentPage === item.id ? 'active': ''}` } >
                                                <a className="tabs__title"  title="Select page" onClick={ () => this.selectPage(item.id) }>{ item.title }</a>
                                                <a className="tabs__delete" title="Delete page" onClick={ () => this.deletePage(item.id) }><i className="fa fa-window-close" aria-hidden="true"></i></a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="jcf-scrollable-fake"></div>
                        </div>
                    </div>
                    <div className="widget__content">
                        <div className="paint">
                            { this.props.pages.map((page, index) => {
                                return (
                                    <div key={ index } className={ `paint__wrap ${this.state.currentPage === page.id ? 'active': ''}` }>
                                        <div className="paint__placeholder">
                                            { this.props.specs.map((item, index) => {
                                                if (this.state.currentPage === item.pageID && this.state.currentPage === page.id) {
                                                    return (
                                                        <div style={ Object.assign({}, item.rect) } key={ item.id } data-id={ item.id } className="paint__item" onClick={(event) => this.onUserShow(event, index) }>
                                                            <div className="paint__number">{ index + 1 }</div>
                                                            <div className="paint__icon-delete" onClick={ () => this.deleteSpecification(item.id) }><i className="fa fa-trash" aria-hidden="true"></i></div>
                                                            <div className="paint__icon-resize"><i className="fa fa-expand" aria-hidden="true"></i></div>
                                                            <div className="paint__icon-move"><i className="fa fa-arrows" aria-hidden="true"></i></div>
                                                        </div>
                                                    )
                                                }
                                            }) }
                                        </div>
                                        <canvas data-id={ page.id } className="paint__canvas"></canvas>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Visualization.propTypes = {
    pages: PropTypes.array,
    specs: PropTypes.array,
    project: PropTypes.object,
    specificationChange: PropTypes.func,
    specificationRemove: PropTypes.func,
    specificationRemoveCollection: PropTypes.func,
    pageRemove: PropTypes.func,
    projectCurrentPage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Visualization);