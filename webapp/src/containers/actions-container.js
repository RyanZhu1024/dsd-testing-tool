/**
 * Created by shuxuan on 16/03/2017.
 */
import {connect} from "react-redux";
import Article from "../components/article.js";
import {axios} from "../components/helpers.js";
import {loadActions, selectAction, updateAction} from "../actions";

const mapStateToProps = (state) => {
	return {
		actions: state.actions,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadActions: () => {
			axios.get('actions').then((res) => {
				dispatch(loadActions(res.data.data));
			});
		},
		changeAction: (form) => {
			console.log("update form ", form);
			return axios.put(`actions/${form.id}`, form).then(() => {
				dispatch(updateAction(form));
			})
		},
	}
};

const ActionContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default ActionContainer;