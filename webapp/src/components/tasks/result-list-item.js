/**
 * Created by shuxuan on 10/04/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ResultCompareTable from './result-compare-table';
import './styles.css';

export default class ResultListItem extends Component {
    render() {
        const {key, value} = this.props.response;
        return <div>
            <Link to='#' className="list-group-item list-group-item-action" data-toggle="modal" data-target={`#modal${key}`}>
            {value.completedAt}
            </Link>
            <div className="modal fade" id={`modal${key}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{`Completed At ${value.completedAt}`}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                this.props.taskActions.length > 0 ? <ResultCompareTable results={value.results} taskActions={this.props.taskActions}/> : "Loading Actions"
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {/*<button type="button" className="btn btn-primary">Save changes</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}