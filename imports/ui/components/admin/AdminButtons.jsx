import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';

import SrapeAPI 						from "./SrapeAPI.jsx";
import FloorExtender 					from "./FloorExtender.jsx";
import AdminInfo 						from "./AdminInfo.jsx";

class AdminButtons extends Component{
	constructor(props){
		super(props);
		
	}
	
	render(){
		return(
			<div className="d-flex w-100 h-100">
				<div className="w-40 h-100 pt-3 pl-3 pb-3">
			        <div className="card front-page-cards">
			        	<div id="admin-buttons">
							<div className="card w-100">
								<div className="card-body">
									<div className="input-group">
										<SrapeAPI />
									</div>
									<div className="input-group">
										<FloorExtender />
									</div>
								</div>
							</div>
						</div>
			        </div>
	        	</div>
	        	<div className="w-60 h-100 p-3">
	        		<div className="card front-page-cards">
	        			<AdminInfo />
	        		</div>
	        	</div>
	        </div>	

		);
	}
}

export default withTracker(() => {
		return {
		}
	}	
)(AdminButtons);