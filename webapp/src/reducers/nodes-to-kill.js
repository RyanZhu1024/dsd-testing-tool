/**
 * Created by shuxuan on 16/03/2017.
 */
const nodesToKill = (state = [], action) => {
	switch (action.type) {
		case 'LOAD_NODES_TO_KILL':
			return action.payload;
		default:
			return state;
	}
};

export default nodesToKill;