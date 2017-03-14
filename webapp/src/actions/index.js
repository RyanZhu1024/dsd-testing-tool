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
