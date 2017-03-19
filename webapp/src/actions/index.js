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

export const selectAction = (payload) => {
	return {
		type: 'SELECT_ACTION',
		payload
	}
};

export const updateAction = (action) => {
	return {
		type: 'UPDATE_ACTION',
		action
	}
};