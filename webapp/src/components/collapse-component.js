/**
 * Created by shuxuan on 15/03/2017.
 */
import React from "react";

export default (props) => {
	return (
			<div id="accordion" role="tablist" aria-multiselectable="true">
				{props.components.map((val, index) => {
					return <div key={index} className="card">
							<div className="card-header" role="tab" id={`heading${index}`}>
								<h5 className="mb-0">
									<a data-toggle="collapse" data-parent="#accordion" href={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
										{val.title}
									</a>
								</h5>
							</div>
							<div id={`collapse${index}`} className={`collapse ${index === 0 ? "show" : ""}`} role="tabpanel" aria-labelledby={`heading${index}`}>
								<div className="card-block">
									<val.component {...val}/>
								</div>
							</div>
						</div>
				})}
			</div>
	)
}