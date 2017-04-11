/**
 * Created by shuxuan on 10/04/2017.
 */
import React, {Component} from 'react';
import ResultList from './result-list';

export default class TaskActionResults extends Component {

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
        return this.props.selectedTask.responses ? <ResultList responses={this.props.selectedTask.responses} {...this.props}/> : null;
    }
}