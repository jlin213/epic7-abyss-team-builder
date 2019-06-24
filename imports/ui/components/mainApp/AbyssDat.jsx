import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../api/abyss/abyssDB.jsx";

import LevelSelect						from './AbyssDatComps/LevelSelect.jsx'
import FloorDetails						from './AbyssDatComps/FloorDetails.jsx'
import Flexboxes						from './AbyssDatComps/Flexboxes.jsx'

class AbyssDat extends Component{
	constructor(props){
		super(props);

		this.state = {
			floor: "",
			
		}
	}

	handleFloorSelect(input){ this.setState({ floor: input }) }

	render(){
		return (
			<div className="d-flex w-100 h-100">
				<div className="w-40 h-100 pl-3 pt-3 pb-3">
			        <div className="card front-page-cards">
			        	<Flexboxes />
			        </div>
	        	</div>
	        	<div className="w-60 h-100 p-3">
	        		<div className="card front-page-cards">
	        			<div id="" className="m-2">
							<div className="card">
								<LevelSelect handleFloorSelect={this.handleFloorSelect.bind(this)}/>
								<FloorDetails floor={this.state.floor}/>
							</div>
						</div>
	        		</div>
	        	</div>
	        </div>	

		)
	}
}
export default withTracker(() => {
	Meteor.subscribe('abyss.all');
	
	return {
		abyss: abyssDB.find({}).fetch(),
	}	
})(AbyssDat);