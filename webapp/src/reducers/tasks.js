/**
 * Created by shuxuan on 13/03/2017.
 */
const task = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_TASK':
			return action.task;
		case 'UPDATE_TASK':
			if (state.id !== action.task.id) {
				return state;
			} else {
				return action.task;
			}
		default:
			return state;
	}
};

const tasks = (state = [], action) => {
	switch (action.type) {
		case 'CREATE_TASK':
			return [
				...state,
				task(undefined, action)
			];
		case 'LOAD_TASKS':
			return action.payload;
		case 'DELETE_TASK':
			return state.filter(task => task.id !== action.id);
		case 'UPDATE_TASK':
			return state.map(t => task(t, action));
		default:
			return state;
	}
};

export default tasks;