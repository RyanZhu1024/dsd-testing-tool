/**
 * Created by shuxuan on 12/03/2017.
 */
import React, {Component} from "react";
import SideBar from "./sidebar.js";
import Content from "./content.js";
import {axios} from './helpers';
import queryString from 'query-string';

const styles = {
	paddingTop: 30
};

export default class Article extends Component {
	componentWillMount() {
        // let search = this.props.location.search;
		// if (search) {
         //    const parsed = queryString.parse(search);
         //    console.log(parsed.projectId);
         //    axios.get(`currentProject/${parsed.projectId}`).then((res) => {
         //        console.log("current project is: " + parsed.projectId);
         //    });
		// }
	}

    componentWillReceiveProps(nextProps) {
        // let curSearch = this.props.location.search;
        // let nextSearch = nextProps.location.search;
        // if (nextSearch && curSearch) {
         //    const curParsed = queryString.parse(curSearch);
         //    const nextParsed = queryString.parse(nextSearch);
         //    if (curParsed.projectId !== nextParsed.projectId) {
         //        axios.get(`currentProject/${nextParsed.projectId}`).then((res) => {
         //            console.log("current project is: " + nextParsed.projectId);
         //            nextProps.selectProject(nextParsed.projectId);
         //        });
		// 	}
		// }
    }
	render() {
		let props = this.props;
        return (
			<div className="row" style={styles}>
				<div className="col-lg-3">
					<SideBar {...props} />
				</div>
				<div className="col-lg-9">
					<Content {...props}/>
				</div>
			</div>
        )
    }
}