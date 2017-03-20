/**
 * Created by shuxuan on 20/03/2017.
 */
import {connect} from "react-redux";
import App from "../components/app";
import {closeAlert} from "../actions";

const mapDispatchToProps = (dispatch) => {
	return {
		closeAlert : () => {
			console.log("Close alert");
			dispatch(closeAlert());
		}
	}
};

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;