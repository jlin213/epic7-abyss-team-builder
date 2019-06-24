import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../../api/abyss/abyssDB.jsx";

import LevelSelect						from './LevelSelect.jsx'
import FloorDetails						from './FloorDetails.jsx'

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
			<div id="" className="m-2">
				<div className="card">
					<LevelSelect handleFloorSelect={this.handleFloorSelect.bind(this)}/>
					<FloorDetails floor={this.state.floor}/>
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