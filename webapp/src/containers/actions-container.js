/**
 * Created by shuxuan on 16/03/2017.
 */
import {connect} from "react-redux";
import Article from "../components/article.js";

const mapStateToProps = (state) => {
	return {
		actions: state.actions
	}
};

const mapDispatchToProps = (dispatch) => {
	return {

	}
};

const ActionContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default ActionContainer;