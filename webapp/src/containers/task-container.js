/**
 * Created by shuxuan on 13/03/2017.
 */
import {connect} from "react-redux";
import Article from "../components/article.js";
import {axios} from "../components/helpers.js";
import {loadTasks, loadActionsByIds, loadNodesToKill, deleteTask, loadActionOptions, loadAllNodes} from "../actions";

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
		nodesToKill: state.nodesToKill,
		actionOptions: state.actions,
		nodes: state.nodes
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
			console.log(`loadNodesToKill ${killProcess}`);
			if (killProcess) {
				Promise.all(killProcess.nodeIds.map((id) => {
					return axios.get(`node-info/${id}`);
				})).then((res) => {
					const nodes = res.map((rs) => rs.data);
					dispatch(loadNodesToKill(nodes));
				})
			} else {
				dispatch(loadNodesToKill([]));
			}
		},
		loadActionsByIds: (acts) => {
			acts && Promise.all(acts.map((act) => {
				return axios.get(`actions/${act.id}`);
			})).then((res) => {
				const actions = res.map((rs, index) => Object.assign({}, rs.data.data, {disable: acts[index].disable}));
				dispatch(loadActionsByIds(actions));
				console.log(`loadActionsByIds ${actions}`)
			})
		},
		loadActionOptions: () => {
			axios.get('actions').then((res) => {
				dispatch(loadActionOptions(res.data.data));
			});
		},
		createTask: (form, history) => {
			console.log(`createTask ${JSON.stringify(form)}`);
		},
		changeTask: (form) => {
			console.log(`changeTask ${form}`);
		},
		handleDelete: (id, history) => {
			console.log(`handleDelete ${id}`);
			axios.delete(`tasks/${id}`).then(() => {
				dispatch(deleteTask(id));
			}).then(() => history.replace("/tasks/new"));
		},
		loadAllNodes: () => {
			console.log(`loadAllNodes`);
			axios.get('nodes').then((res) => {
				dispatch(loadAllNodes(res.data.data));
			});
		}
	}
};

const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default TaskListContainer;