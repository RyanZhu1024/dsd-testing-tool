/**
 * Created by shuxuan on 13/03/2017.
 */
import {connect} from "react-redux";
import Article from "../components/article.js";
import {axios} from "../components/helpers.js";
import {
	alert,
	createTask,
	updateTask,
	loadTasks,
	loadActionsByIds,
	loadNodesToKill,
	deleteTask,
	loadActionOptions,
	loadAllNodes
} from "../actions";

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
		nodes: state.nodes,
		alert: state.alert
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTasks: () => {
			axios.get('tasks').then((res) => {
				dispatch(loadTasks(res.data.data));
			})
		},
		loadNodesToKill: (nodeIds) => {
			console.log(`loadNodesToKill ${nodeIds}`);
			if (nodeIds) {
				Promise.all(nodeIds.map((id) => {
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
				return axios.get(`actions/${act}`);
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
			return axios.post('tasks', form).then((res) => {
				console.log("create task", res.data.data);
				dispatch(createTask(res.data.data));
				history.push(`/tasks/${res.data.data.id}`);
			})
		},
		changeTask: (form) => {
			console.log(`changeTask ${JSON.stringify(form)}`);
			const {id, ...toUpdate} = form;
			return axios.put(`tasks/${id}`, toUpdate).then(() => {
				dispatch(updateTask(form));
			})
		},
		handleDelete: (id, history) => {
			console.log(`handleDelete ${id}`);
			axios.delete(`tasks/${id}`).then(() => {
				dispatch(deleteTask(id));
				history.replace("/tasks/new");
			});
		},
		loadAllNodes: () => {
			console.log(`loadAllNodes`);
			axios.get('nodes').then((res) => {
				dispatch(loadAllNodes(res.data.data));
			});
		},
		runTask: (id) => {
			console.log(`Run task: ${id}`);
			axios.get(`tasks/${id}/run`).then(() => {
				dispatch(alert({show: true, message: "The task is running", level: "success"}));
			}).catch(error => {
				dispatch(alert({show: true, message: `Run task failed due to ${error}`, level: "danger"}));
			})
		}
	}
};

const TaskListContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default TaskListContainer;