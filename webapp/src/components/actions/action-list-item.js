/**
 * Created by shuxuan on 17/03/2017.
 */
import React from "react";
import {NavLink} from "react-router-dom";

export default (({action}) => {
	return <NavLink activeClassName="active" className="list-group-item list-group-item-action" to={`/actions/${action.id}`}>{action.name}</NavLink>
})