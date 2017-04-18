import React from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/JSONPretty.acai.styl';
const nodeDetail = ({node}) => {
    return <div>
        {node ? <JSONPretty json={node} /> : null}
    </div>
};

export default nodeDetail;