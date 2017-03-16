/**
 * Created by shuxuan on 13/03/2017.
 */
import {connect} from "react-redux";
import Article from "../components/article.js";
import {axios} from "../components/helpers.js";
import {loadTasks, loadActionsByIds} from "../actions";

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
		tasks: getVisibleTasks(state.tasks, state.visibilityFilter),
		taskActions: state.taskActions
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTasks: () => {
			axios.get('tasks').then((res) => {
				dispatch(loadTasks(res.data.data));
			})
		},
		loadActionsByIds: (acts) => {
			Promise.all(acts.map((act) => {
				return axios.get(`actions/${act.id}`);
			})).then((res) => {
				const actions = res.map((rs) => rs.data.data);
				dispatch(loadActionsByIds(actions));
				console.log(actions)
			})
		}
	}
};

const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default TaskListContainer;