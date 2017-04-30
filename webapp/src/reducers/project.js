/**
 * Created by shuxuan on 29/04/2017.
 */

const project = (state = "", action) => {
    switch (action.type) {
        case 'SELECT_PROJECT':
            return action.projectId;
        case 'DESELECT_PROJECT':
            return state;
        default:
            return state;
    }
};

export default project;