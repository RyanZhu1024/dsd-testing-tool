/**
 * Created by shuxuan on 17/03/2017.
 */

const actions = (state = [], action) => {
	switch (action.type) {
		case 'LOAD_ACTIONS':
			return action.payload;
		default:
			return state;
	}
};

export default actions;