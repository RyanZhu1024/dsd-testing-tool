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
		default:
			return state;
	}
};

const actions = (state = [], action) => {
	switch (action.type) {
		case 'LOAD_ACTIONS':
			return action.payload;
		case 'UPDATE_ACTION':
			console.log(`Update Action${JSON.stringify(action.action)}`);
			return state.map(act => singleAction(act, action));
		default:
			return state;
	}
};

export default actions;