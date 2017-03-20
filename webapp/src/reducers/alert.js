/**
 * Created by shuxuan on 20/03/2017.
 */
const alert = (state = {show: false, message: "", level: "info"}, action) => {
	switch (action.type) {
		case 'ALERT':
			return action.alert;
		case 'CLOSE_ALERT':
			console.log("return close alert object");
			return {show: false, message: "", level: "info"};
		default:
			return state;
	}
};

export default alert;