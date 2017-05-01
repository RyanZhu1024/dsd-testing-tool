/**
 * Created by shuxuan on 20/03/2017.
 */
import {connect} from "react-redux";
import App from "../components/app";
import {closeAlert, loadAllProjects, selectProject} from "../actions";
import {axios} from "../components/helpers.js";
import queryString from 'query-string';

const mapStateToProps = (state) => {
    return {
        project: state.project,
		projects: state.projects
    }
};

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
		},
        selectProject: (search) => {
            // localStorage.setItem("projectId", projectId);
            // console.log(`local storage project id: ${localStorage.getItem("projectId")}`);
            const parsed = queryString.parse(search);
            console.log(`select project with id: ${parsed.projectId}`);
            return axios.get(`currentProject/${parsed.projectId}`).then((res) => {
                console.log("current project is: " + parsed.projectId);
                dispatch(selectProject(parsed.projectId));
            });
        },
	}
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;