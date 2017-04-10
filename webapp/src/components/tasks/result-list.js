/**
 * Created by shuxuan on 10/04/2017.
 */
import React, {Component} from 'react';
import ResultListItem from './result-list-item';

export default class ResultList extends Component {
    componentWillMount() {
        const {actions} = this.props.selectedTask;
        this.props.loadActionsByIds(actions);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.selectedTask.id !== nextProps.selectedTask.id || this.props.taskActions.length === 0;
    }
    render() {
        return (
            <div className="list-group">
                {this.props.selectedTask.responses.map((response, index) => {
                    return <ResultListItem key={index} response={response} {...this.props}/>
                })}
            </div>
        )
    }
}