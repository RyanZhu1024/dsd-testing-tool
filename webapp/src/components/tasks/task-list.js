/**
 * Created by shuxuan on 12/03/2017.
 */
import React, {Component} from "react";
import TaskListItem from "./task-list-item.js";
import queryString from 'query-string';
export default class TaskList extends Component {

	componentWillMount () {
		console.log("load tasks");
        let search = this.props.location.search;
        if (search) {
			this.props.selectProject(search).then(() => {
                this.props.loadTasks();
			});
        } else {
            this.props.loadTasks();
		}
	}

    componentWillReceiveProps(nextProps) {
        const search = nextProps.location.search;
        if (search) {
            const projectId = queryString.parse(search).projectId;
            if (projectId !== this.props.project) {
                console.log(this.props.project);
                console.log(projectId);
                this.props.selectProject(search).then(() => {
                    this.props.loadTasks();
                });
            }
        }
    }

	render () {
		return (
			<div className="list-group">
				{this.props.tasks.map((task) => {
					return <TaskListItem key={task.id} task={task}/>
				})}
			</div>
		)
	}
};

TaskList.contextTypes = {
	axios: React.PropTypes.func
};