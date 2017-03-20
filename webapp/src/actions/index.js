/**
 * Created by shuxuan on 13/03/2017.
 */
export const addTask = (payload) => {
	return {
		type: 'ADD_TASK',
		payload
	}
};

export const setTaskVisibilityFilter = (payload) => {
	return {
		type: 'SET_TASK_VISIBILITY_FILTER',
		payload
	}
};

export const loadTasks = (payload) => {
	return {
		type: 'LOAD_TASKS',
		payload
	}
};

export const loadActionsByIds = (payload) => {
	return {
		type: 'LOAD_ACTIONS_BY_IDS',
		payload
	}
};

export const loadNodesToKill = (payload) => {
	return {
		type: 'LOAD_NODES_TO_KILL',
		payload
	}
};

export const loadActions = (payload) => {
	return {
		type: 'LOAD_ACTIONS',
		payload
	}
};

export const createAction = (action) => {
	return {
		type: 'CREATE_ACTION',
		action
	}
};

export const updateAction = (action) => {
	return {
		type: 'UPDATE_ACTION',
		action
	}
};

export const deleteAction = (id) => {
	return {
		type: 'DELETE_ACTION',
		id
	}
};

export const deleteTask = (id) => {
	return {
		type: 'DELETE_TASK',
		id
	}
};

export const loadActionOptions = (payload) => {
	return {
		type: 'LOAD_ACTION_OPTIONS',
		payload
	}
};

export const loadAllNodes = (nodes) => {
	return {
		type: 'LOAD_ALL_NODES',
		nodes
	}
};

export const updateTask = (task) => {
	return {
		type: 'UPDATE_TASK',
		task
	}
};

export const createTask = (task) => {
	return {
		type: 'CREATE_TASK',
		task
	}
};

export const alert = (alert) => {
	return {
		type: 'ALERT',
		alert
	}
};

export const closeAlert = () => {
	return {
		type: 'CLOSE_ALERT'
	}
};