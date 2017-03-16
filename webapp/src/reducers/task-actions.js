/**
 * Created by shuxuan on 16/03/2017.
 */
const taskActions = (state = [], action) => {
	switch (action.type) {
		case 'LOAD_ACTIONS_BY_IDS':
			return action.payload;
		default:
			return state;
	}
};

export default taskActions;