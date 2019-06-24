import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';

import AddHero 							from "./AddHero.jsx";
import FloorExtender 					from "./FloorExtender.jsx";

class AdminButtons extends Component{
	constructor(props){
		super(props);
		
	}
	
	renderAddHeroes(){
		return(<AddHero />)
	}
	renderAbyssExtender(){
		return(<FloorSelector />)
	}
	render(){
		return(
			<div className="d-flex w-100 h-100">
				<div className="w-40 h-100 p-3">
			        <div className="card front-page-cards">
			        	<div id="admin-buttons">
							<div className="card w-100">
								<div className="card-body">
									<div className="input-group">
										{this.renderAddHeroes()}
									</div>
									<div className="input-group">
										{this.renderAbyssExtender()}
									</div>
								</div>
							</div>
						</div>
			        </div>
	        	</div>
	        	<div className="w-60 h-100 p-3">
	        		<div className="card front-page-cards">
	        			
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