/**
 * Created by shuxuan on 17/03/2017.
 */
const selectedAction = (state = {}, action) => {
	switch (action.type) {
		case 'SELECT_ACTION':
			return action.payload;
		default:
			return state;
	}
};

export default selectedAction;