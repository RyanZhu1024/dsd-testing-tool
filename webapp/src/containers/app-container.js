/**
 * Created by shuxuan on 20/03/2017.
 */
import {connect} from "react-redux";
import App from "../components/app";
import {closeAlert, loadAllProjects} from "../actions";
import {axios} from "../components/helpers.js";

const mapDispatchToProps = (dispatch) => {
	return {
        loadAllProjects: () => {
            axios.get('projects').then((res) => {
                dispatch(loadAllProjects(res.data.data));
            })
        },
		closeAlert : () => {
			console.log("Close alert");
			dispatch(closeAlert());
		}
	}
};

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;