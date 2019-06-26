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
				<li className="view-team-wrap" key={teams._id}>
					<div className="view-team-guard team-guard" 
						style={{backgroundImage: "url(img/"+ teams.team.guardian + ".png)"}}></div>
					<div className="team-heroes view-team-heroes">
						<img src={'http://assets.epicsevendb.com/hero/' + teams.team.slot1 + '/icon.png'} 
							className="view-team-hero1 "/>
						<img src={'http://assets.epicsevendb.com/hero/' + teams.team.slot2 + '/icon.png'} 
							className="view-team-hero2 "/>
						<img src={'http://assets.epicsevendb.com/hero/' + teams.team.slot3 + '/icon.png'} 
							className="view-team-hero3 "/>
						<img src={'http://assets.epicsevendb.com/hero/' + teams.team.slot4 + '/icon.png'} 
							className="view-team-hero4 "/>					
					</div>
				</li>
			);
		})
		console.log(this.props.abyss[0]);
	}
	render(){
		return (
			<div id="" className="m-2">
				<div className="card">
					<div className="card-header">
						Teams:
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

	if (props.useFilterFrom){
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
	} else if(props.useFilterContains){
		return {
			abyss: abyssDB.find({ 
				$and : [
					{ 'team.level': props.floor },
					{ $or : [ 
						{ 'team.slot1': { $in: props.filter } },
						{ 'team.slot2': { $in: props.filter } },
						{ 'team.slot3': { $in: props.filter } },
						{ 'team.slot4': { $in: props.filter } }
					]}
				]
			}).fetch(),
		}	
	} else {
		return {
			abyss: abyssDB.find({ 'team.level': props.floor }).fetch(),
		}	
	}

})(FloorDetails);