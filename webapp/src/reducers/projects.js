/**
 * Created by shuxuan on 29/04/2017.
 */
const project = (state={}, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            return action.project;
        case 'UPDATE_PROJECT':
            if (state.id !== action.project.id) {
                return state;
            } else {
                return action.project;
            }
        default:
            return state;
    }
};

const projects = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_ALL_PROJECTS':
            return action.projects;
        case 'CREATE_PROJECT':
            return [
                ...state,
                project(undefined, action)
            ];
        case 'UPDATE_PROJECT':
            return state.map(p => project(p, action));
        case 'DELETE_PROJECT':
            return state.filter(project => project.id !== action.id);
        default:
            return state;
    }
};

export default projects;