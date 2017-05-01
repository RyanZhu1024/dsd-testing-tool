/**
 * Created by shuxuan on 29/04/2017.
 */
import {connect} from "react-redux";
import ProjectIndex from "../components/projects/project-index";
import {axios} from "../components/helpers.js";
import {createProject, deleteProject, deSelectProject, selectProject, updateProject} from "../actions";


const mapStateToProps = (state) => {
    return {
        project: state.project,
        projects: state.projects
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectProject: (projectId) => {
            console.log(`select the project with id: ${projectId}`);
            // localStorage.setItem("projectId", projectId);
            // console.log(`local storage project id: ${localStorage.getItem("projectId")}`);
            dispatch(selectProject(projectId))
        },
        createProject: (form, history) => {
            return axios.post('projects', form).then((res) => {
                console.log("create project", res.data.data);
                dispatch(createProject(res.data.data));
                dispatch(selectProject(res.data.data.id));
                history.push(`/projects/${res.data.data.id}`);
            })
        },
        changeProject: (form) => {
            console.log(`change Project ${JSON.stringify(form)}`);
            const {id, ...toUpdate} = form;
            return axios.put(`projects/${id}`, toUpdate).then((res) => {
                console.log(`update project ${res.data.success}`);
                dispatch(updateProject(form));
            })
        },
        handleDelete: (id, history) => {
            console.log(`handleDelete ${id}`);
            axios.delete(`projects/${id}`).then(() => {
                dispatch(deleteProject(id));
                dispatch(deSelectProject());
                history.replace("/projects");
            });
        }
    }
};

const ProjectContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectIndex);

export default ProjectContainer;