/**
 * Created by shuxuan on 13/03/2017.
 */
const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.payload;
		default:
			return state;
	}
};

export default visibilityFilter;