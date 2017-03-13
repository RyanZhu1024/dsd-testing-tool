/**
 * Created by shuxuan on 12/03/2017.
 */
import React from "react";
import SideBar from "./sidebar.js";
import Content from "./content.js";

export default (props) => {
	return (
		<div className="row">
			<div className="col-lg-3">
				<SideBar />
			</div>
			<div className="col-lg-9">
				<Content />
			</div>
		</div>
	)
}