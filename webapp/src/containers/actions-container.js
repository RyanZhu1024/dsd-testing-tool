/**
 * Created by shuxuan on 16/03/2017.
 */
import {connect} from "react-redux";
import Article from "../components/article.js";
import {axios} from "../components/helpers.js";
import {loadActions, createAction, updateAction, deleteAction} from "../actions";

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
		createAction: (form, history) => {
			console.log("create an action");
			return axios.post('actions', form).then((res) => {
				dispatch(createAction(res.data.data));
				history.push(`/actions/${res.data.data.id}`);
			})
		},
		handleDelete: (id, history) => {
			console.log(`Delete ${id}`);
			axios.delete(`actions/${id}`).then(() => {
				dispatch(deleteAction(id));
			}).then(() => history.replace("/actions/new"));
		}
	}
};

const ActionContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default ActionContainer;