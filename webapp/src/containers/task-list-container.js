/**
 * Created by shuxuan on 13/03/2017.
 */
import {connect} from "react-redux";
import TaskList from "../components/tasks/task-list.js";
import {axios} from "../components/helpers.js";
import {loadTasks} from "../actions";

const getVisibleTasks = (tasks, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return tasks;
		default:
			return tasks;
	}
};

const mapStateToProps = (state) => {
	return {
		tasks: getVisibleTasks(state.tasks, state.visibilityFilter)
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTasks: () => {
			axios.get('tasks').then((res) => {
				dispatch(loadTasks(res.data.data));
			})
		}
	}
};

const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(TaskList);

export default TaskListContainer;