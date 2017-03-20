/**
 * Created by shuxuan on 19/03/2017.
 */
const nodes = (state= [], action) => {
	switch (action.type) {
		case 'LOAD_ALL_NODES':
			return action.nodes;
		default:
			return state;
	}
};

export default nodes;