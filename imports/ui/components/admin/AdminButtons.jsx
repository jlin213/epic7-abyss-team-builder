import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';

import AddHero 							from "./AddHero.jsx";
import FloorSelector 					from "./FloorSelector.jsx";

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
		);
	}
}

export default withTracker(() => {
		return {
		}
	}	
)(AdminButtons);