/**
 * Created by shuxuan on 10/04/2017.
 */
import React, {Component} from 'react';
import ResultList from './result-list';

export default class TaskVerifyResults extends Component {

    componentWillMount() {
        if (this.props.task) {
            this.props.getTaskById(this.props.task.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.task !== nextProps.task) {
            nextProps.getTaskById(nextProps.task.id);
        }
    }

    render() {
        console.log(`verify responses ${this.props.selectedTask.verifyResponses}`);
        return this.props.selectedTask.verifyResponses ? <ResultList responses={this.props.selectedTask.verifyResponses} {...this.props}/> : null;
    }
}