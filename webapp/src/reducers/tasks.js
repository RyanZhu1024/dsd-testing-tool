/**
 * Created by shuxuan on 13/03/2017.
 */
const task = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_TASK':
			return action.payload;
		default:
			return state;
	}
};

const tasks = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TASK':
			return [
				...state,
				task(undefined, action)
			];
		case 'LOAD_TASKS':
			return action.payload;
		default:
			return state;
	}
};

export default tasks;