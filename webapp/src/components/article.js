/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import SideBar from "./sidebar.js";
import Content from "./content.js";

const styles = {
	paddingTop: 30
};

export default (props) => {
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