/**
 * Created by shuxuan on 16/03/2017.
 */
import React from "react";
import NodeInfoContainer from "../../containers/node-info-container";

export default ({nodes}) => {
	return <div>
		{nodes ? nodes.map((node) => {
				const data = {
					id: node.id,
					title: node.ip,
					viewPath: `/nodes/${node.id}`,
					updatePath: `/nodes/${node.id}`,
					summary: node
				};
				return <NodeInfoContainer key={data.id} {...data} />;
			}) : null}
	</div>
}