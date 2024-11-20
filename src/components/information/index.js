// import core
import { _, calc } from 'vendors';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import styles
import './styles';

const mapStateToProps = (state) => {
    return {
        pages: state.pages,
        specs: state.specification,
        additional: state.additional
    }
};

class Information extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        let { layout, frameworks, options, requirements, summary } = this.props.additional;

        calc.setValues(this.props.specs, this.props.additional);

        return (
            <div className="information">
                <table className="table-info">
                    <tbody>
                        <tr>
                            <td>Layout:</td>
                            <td>{ layout.name }</td>
                        </tr>
                        <tr>
                            <td>Frameworks:</td>
                            <td>{ frameworks.name }</td>
                        </tr>
                        <tr>
                            <td>Requirements:</td>
                            <td>
                                { requirements.filter((item) => item.isChecked).map((item, key) => <div key={ key }>{ item.name }</div>)}
                                { options.filter((item) => item.isChecked).map((item, key) => <div key={ key }>{ item.name }</div>)}
                            </td>
                        </tr>
                        <tr>
                            <td>Pages:</td>
                            <td>{ this.props.pages.length }</td>
                        </tr>
                        <tr>
                            <td>Blocks:</td>
                            <td>{ calc.getBlocks() }</td>
                        </tr>
                        <tr>
                            <td>Total:</td>
                            <td>{ calc.getHours() }h</td>
                        </tr>
                        <tr>
                            <td>7h without QA:</td>
                            <td>{ calc.getDays().seven } days</td>
                        </tr>
                        <tr>
                            <td>6h without QA:</td>
                            <td>{ calc.getDays().six } days</td>
                        </tr>
                        <tr>
                            <td>5h without QA:</td>
                            <td>{ calc.getDays().five } days</td>
                        </tr>
                        <tr>
                            <td>Summary: </td>
                            <td><textarea className="information__summary" readOnly value={summary}></textarea></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

Information.propTypes = {
    specs: PropTypes.array,
    additional: PropTypes.object
};

export default connect(mapStateToProps)(Information);