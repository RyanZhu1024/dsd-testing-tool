/**
 * Created by shuxuan on 16/03/2017.
 */
import {connect} from "react-redux";
import Card from "../components/card";


const mapDispatchToProps = (dispatch) => {
	return {
		toggleActionById: (id) => {

		}
	}
};

const ActionCardContainer = connect(null, mapDispatchToProps)(Card);

export default ActionCardContainer;