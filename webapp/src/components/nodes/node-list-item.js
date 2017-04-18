/**
 * Created by shuxuan on 17/04/2017.
 */
import React from 'react';
import {NavLink, Route, Switch} from "react-router-dom";

const NodeListItem = ({node}) => {
    return <Route path="/nodes"
               render={() =>
                   <NavLink activeClassName="active"
                            className="list-group-item list-group-item-action"
                            to={`/nodes/${node.id}`}>{`${node.ip}:${node.nodePort}`}</NavLink>}
        />
};

export default NodeListItem;