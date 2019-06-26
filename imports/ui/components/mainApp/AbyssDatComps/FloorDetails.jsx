import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../../api/abyss/abyssDB.jsx";

class FloorDetails extends Component{
	constructor(props){
		super(props);

		this.state = {	
			teamsPage: this.props.teamsPage,
		}
	}

	renderTeams(){		
		return this.props.abyss.map((teams) => {
			return ( 
				<li className="list-group-item" key={teams._id}>
					{teams.team.slot1 + " " + teams.team.slot2  + " " + teams.team.slot3  + " " + 	teams.team.slot4}
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

	if (props.useFilter){
		return {
			abyss: abyssDB.find({ 
				$and : [
					{ 'team.level': props.floor },
					{ 'team.slot1': { $in: props.filter } },
					{ 'team.slot2': { $in: props.filter } },
					{ 'team.slot3': { $in: props.filter } },
					{ 'team.slot4': { $in: props.filter } }
				]
			}).fetch(),
		}	
	} else {
		return {
			abyss: abyssDB.find({ 'team.level': props.floor }).fetch(),
		}	
	}

})(FloorDetails);