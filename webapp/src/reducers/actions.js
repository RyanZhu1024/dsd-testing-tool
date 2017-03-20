/**
 * Created by shuxuan on 17/03/2017.
 */

const singleAction = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_ACTION':
			if (state.id !== action.action.id) {
				return state;
			} else {
				return action.action;
			}
		case 'CREATE_ACTION':
			return action.action;
		default:
			return state;
	}
};

const actions = (state = [], action) => {
	switch (action.type) {
		case 'LOAD_ACTIONS':
		case 'LOAD_ACTION_OPTIONS':
			return action.payload;
		case 'UPDATE_ACTION':
			console.log(`Update Action${JSON.stringify(action.action)}`);
			return state.map(act => singleAction(act, action));
		case 'CREATE_ACTION':
			return [
				...state,
				singleAction(undefined, action)
			];
		case 'DELETE_ACTION':
			return state.filter((act) => act.id !== action.id);
		default:
			return state;
	}
};

export default actions;