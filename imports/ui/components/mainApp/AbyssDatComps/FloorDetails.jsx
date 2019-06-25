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
			return ( 
				<li className="list-group-item" key={teams._id}>
					teams.slot1 + " " + teams.slot2  + " " + teams.slot3  + " " + teams.slot4
				</li>
			);
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
					<div className="card-header">
						Teams: [Abyss Floor: {this.props.floor} - UseFilter:{$filterStatus} - Filter:{this.props.filter+" "}]
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item text-center text-muted"> <i className="fas fa-chevron-up"></i> </li>
						{this.renderTeams()}
						<li className="list-group-item text-center text-muted"> <i className="fas fa-chevron-down"></i> </li>
					</ul>


					
					<div></div>
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