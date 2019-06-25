import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../../api/abyss/abyssDB.jsx";

class FloorDetails extends Component{
	constructor(props){
		super(props);

		this.state = {	

		}
	}

	renderTeams(){		
		return this.props.abyss.map((teams) => {
			return teams.slot1 + " " + teams.slot2  + " " + teams.slot3  + " " + teams.slot4;
		})
		console.log(this.props.abyss[0]);
	}
	render(){
		let $filterStatus = "";
		if (this.props.useFilter){
			 $filterStatus = "true"
		} else {
			 $filterStatus = "false"
		}
		return (
			<div id="" className="m-2">
				<div className="card">
					Abyss Floor: {this.props.floor} - UseFilter:{$filterStatus} - Filter:{this.props.filter+" "}
					<div>{this.renderTeams()}</div>
				</div>
			</div>
		)
	}
}
export default withTracker((props) => {
	Meteor.subscribe('abyss.all');
	console.log()
	return {
		abyss: abyssDB.find({ level: props.floor }).fetch(),
	}	
})(FloorDetails);