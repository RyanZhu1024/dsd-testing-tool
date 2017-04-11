/**
 * Created by shuxuan on 10/04/2017.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/JSONPretty.acai.styl';

export default ({taskActions, results}) => {
    return <table className="table .table-responsive">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Response Code</th>
                <th>Expected Code</th>
                <th>Response Body</th>
                <th>Expected Body</th>
            </tr>
        </thead>
        <tbody>
        {
            results.map((result, index) => {
                const action = taskActions.find((act) => act.id === result.actionId);
                console.log(action.responseExpected.data);
                return <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>
                        <Link onClick={() => $('.modal').modal('hide')} to={`/actions/${action.id}`}>{action.name}</Link>
                    </td>
                    <td className={parseInt(result.status) === parseInt(action.responseExpected.code) ? "table-success" : "table-danger"}>{result.status}</td>
                    <td className={parseInt(result.status) === parseInt(action.responseExpected.code) ? "table-success" : "table-danger"}>{action.responseExpected.code}</td>
                    <td>
                        {result.data ? <JSONPretty json={result.data} /> : null}
                    </td>
                    <td>
                        {action.responseExpected.data ? <JSONPretty json={JSON.parse(action.responseExpected.data)}/> : null}
                    </td>
                </tr>
            })
        }
        </tbody>
    </table>
}