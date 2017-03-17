/**
 * Created by shuxuan on 15/03/2017.
 */
import React from "react";
import ActionCardContainer from "../../containers/action-card-container";

export default ({actions}) => {
	console.log(actions);
	return <div>
		{actions ? actions.map((action) => {
			const data = {
				id: action.id,
				title: action.name,
				viewPath: `/actions/${action.id}`,
				updatePath: `/actions/${action.id}`,
				disable: action.disable,
				summary: Object.assign({}, {Delay: action.delay, Repeat: action.repeat, Request: action.request, Response: action.response})
			};
			return <ActionCardContainer key={data.id} {...data} />;
		}) : null}
	</div>
}