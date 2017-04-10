/**
 * Created by shuxuan on 10/04/2017.
 */
const selectedTask = (state = {}, action) => {
    switch (action.type) {
        case 'GET_TASK_BY_ID':
            return action.task;
        default:
            return state
    }
};
export default selectedTask;