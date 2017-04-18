/**
 * Created by shuxuan on 17/04/2017.
 */
import {connect} from "react-redux";
import Article from "../components/article";
import {axios} from "../components/helpers.js";
import {loadAllNodes} from '../actions'

const mapStateToProps = (state) => {
    return {
        nodes: state.nodes,
        alert: state.alert,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadNodes: () => {
            axios.get('nodes').then((res) => {
                console.log(res.data.data);
                dispatch(loadAllNodes(res.data.data))
            });
        }
    }
};

const NodeContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default NodeContainer;