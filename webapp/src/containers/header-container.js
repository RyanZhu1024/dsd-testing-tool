import {connect} from "react-redux";
import Header from "../components/header";
import {selectProject} from "../actions";

const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectProject: (projectId) => {
            console.log(`select the project with id: ${projectId}`);
            dispatch(selectProject(projectId))
        }
    }
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;