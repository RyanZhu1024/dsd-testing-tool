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
		actionForm: state.form.action
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadActions: () => {
			axios.get('actions').then((res) => {
				dispatch(loadActions(res.data.data));
			});
		},
		handleSubmit: (form) => {
			console.log("update form ", form.values);
			axios.put(`actions/${form.values.id}`, form.values).then(() => {
				dispatch(updateAction(form.values));
			})
		},
		selectAction: (action) => {
			dispatch(selectAction(action))
		}
	}
};

const ActionContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default ActionContainer;