/**
 * Created by shuxuan on 10/04/2017.
 */
import React from 'react';

export default ({taskActions, results}) => {
    return <table className="table .table-responsive">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Response Code</th>
                <th>Response Body</th>
            </tr>
        </thead>
        <tbody>
        {
            results.map((result, index) => {
                const action = taskActions.find((act) => act.id === result.actionId);
                return <tr key={index}>
                    <th scope="row">{index}</th>
                    <td style={{whiteSpace: "nowrap"}}>{action.name}</td>
                    <td>{result.status}</td>
                    <td>{JSON.stringify(result.data)}</td>
                </tr>
            })
        }
        </tbody>
    </table>
}