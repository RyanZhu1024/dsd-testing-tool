/**
 * Created by shuxuan on 16/03/2017.
 */
import {connect} from "react-redux";
import Card from "../components/card";


const mapDispatchToProps = (dispatch) => {
	return {
	}
};

const NodeInfoContainer = connect(null, mapDispatchToProps)(Card);

export default NodeInfoContainer;