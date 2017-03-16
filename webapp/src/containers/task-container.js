/**
 * Created by shuxuan on 13/03/2017.
 */
import {connect} from "react-redux";
import Article from "../components/article.js";
import {axios} from "../components/helpers.js";
import {loadTasks, loadActionsByIds, loadNodesToKill} from "../actions";

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
		taskActions: state.taskActions,
		nodesToKill: state.nodesToKill
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTasks: () => {
			axios.get('tasks').then((res) => {
				dispatch(loadTasks(res.data.data));
			})
		},
		loadNodesToKill: (killProcess) => {
			console.log(killProcess);
			if (killProcess) {
				Promise.all(killProcess.nodeIds.map((id) => {
					return axios.get(`node-info/${id}`);
				})).then((res) => {
					const nodes = res.map((rs) => rs.data);
					dispatch(loadNodesToKill(nodes));
					console.log(nodes);
				})
			} else {
				dispatch(loadNodesToKill([]));
			}
		},
		loadActionsByIds: (acts) => {
			Promise.all(acts.map((act) => {
				return axios.get(`actions/${act.id}`);
			})).then((res) => {
				const actions = res.map((rs, index) => Object.assign({}, rs.data.data, {disable: acts[index].disable}));
				dispatch(loadActionsByIds(actions));
				console.log(actions)
			})
		}
	}
};

const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default TaskListContainer;