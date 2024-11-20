// import core
import { _, confirm } from 'vendors';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// import actions
import { specificationUpdate, specificationRemove } from 'actions';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {
        pages: state.pages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        specificationUpdate: (id, name, duration, comment) => dispatch(specificationUpdate(id, name, duration, comment)),
        specificationRemove: (id) => dispatch(specificationRemove(id))
    }
};

class SpecificationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.item.name,
            duration: this.props.item.duration,
            comment: this.props.item.comment,
            isEditValue: ''
        };
    }

    onUserOnEdit(event, value) {
        const nextElement = event.target.nextElementSibling;

        this.setState({ isEditValue: value });
        setTimeout(() => {nextElement.focus();}, 0);
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
        event.preventDefault();
    }

    onChangeDuration(event) {
        if (!isNaN(event.target.value)) {
            this.setState({ duration: event.target.value });
            event.preventDefault();
        }
    }

    onChangeComment(event) {
        this.setState({ comment: event.target.value });
        event.preventDefault();
    }

    onUpdateOption() {
        let { name, duration, comment } = this.state;

        name = name || 'Element';
        duration = duration || 0;

        this.props.specificationUpdate(this.props.item.id, name, duration, comment);
        this.setState({ isEditValue: '' });
    }

    onRemoveOption(id) {
        confirm.open('Are you sure? <br>Do you want to delete this specification?').then((status) => {
            if (status) {
                this.props.specificationRemove(id);
            }
        })
    }

    render() {
        let { id, name, duration, comment, pageID } = this.props.item;
        let pageTitle = _.find(this.props.pages, ['id', pageID]).title;

        return (
            <div className="specification-item">
                <div className="specification-item__index">{ this.props.index }</div>
                <div className="specification-item__tools">
                    <div className="specification__delete">
                        <a title="Delete" onClick={() => this.onRemoveOption(id)}><i className="fa fa-trash" aria-hidden="true"></i></a>
                    </div>
                </div>
                <form action="#">
                    <table className="table-info">
                        <tbody>
                            <tr className={`${ this.state.isEditValue === 'name' ? 'specification-item_is-edit': '' }`}>
                                <td>Name: </td>
                                <td>
                                    <div className="specification__property">
                                        <div className="specification__label" onDoubleClick={ (event) => this.onUserOnEdit(event, 'name') }>{ name }</div>
                                        <input
                                            type="text"
                                            value={ this.state.name }
                                            onDoubleClick={ (event) => this.onUser(event) }
                                            onBlur={ () => this.onUpdateOption() }
                                            onChange={ (event) => this.onChangeName(event) } />
                                    </div>
                                </td>
                            </tr>
                            <tr className={`${ this.state.isEditValue === 'duration' ? 'specification-item_is-edit': '' }`}>
                                <td>Duration: </td>
                                <td>
                                    <div className="specification__property">
                                        <div className="specification__label"  onDoubleClick={ (event) => this.onUserOnEdit(event, 'duration') }>{ duration }h</div>
                                        <input type="text"  value={  this.state.duration } onBlur={ () => this.onUpdateOption() } onChange={ (event) => this.onChangeDuration(event) } />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Page: </td>
                                <td>
                                    <div className="specification__property">
                                        <div className="specification__page-title">{ pageTitle }</div>
                                    </div>
                                </td>
                            </tr>
                            <tr className={`${ this.state.isEditValue === 'comment' ? 'specification-item_is-edit': '' }`}>
                                <td>Comment: </td>
                                <td>
                                    <div className="specification__property">
                                        <div className="specification__label" onDoubleClick={ (event) => this.onUserOnEdit(event, 'comment') }>{ comment }</div>
                                        <textarea onBlur={ () => this.onUpdateOption() } value={ this.state.comment } onChange={ (event) => this.onChangeComment(event) }></textarea>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

SpecificationItem.propTypes = {
    pages: PropTypes.array,
    specificationUpdate: PropTypes.func,
    specificationRemove: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecificationItem);