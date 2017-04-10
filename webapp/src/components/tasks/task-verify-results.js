/**
 * Created by shuxuan on 10/04/2017.
 */
import React from 'react';

export default (props) => {
    return props.task ? <h3>task verify results {props.task.id}</h3> : null;
}