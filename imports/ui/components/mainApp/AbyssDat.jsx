import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';
import { AccountsCommon } 				from 'meteor/accounts-base'

import { abyssDB } 						from "../../../api/abyss/abyssDB.jsx";

import LevelSelect						from './AbyssDatComps/LevelSelect.jsx'
import FloorDetails						from './AbyssDatComps/FloorDetails.jsx'
import Flexboxes						from './AbyssDatComps/Flexboxes.jsx'
import AddTeam							from './AbyssDatComps/AddTeam.jsx'

class AbyssDat extends Component{
	constructor(props){
		super(props);

		this.state = {
			floor: 1,
			useFilterContains: false,
			useFilterFrom: false,
			filter: [],
			user: "",
			teamsPage: 0,
		}
	}

	handleDatState(key, value){ this.setState({ [key]: value }) }

	render(){
		var scope = this;
		Accounts.onLogin(function(){
			if (scope.state.user == ""){ scope.setState({ user: Meteor.userId() }) }
		});
		Accounts.onLogout(function(){
			if (scope.state.user != ""){ scope.setState({ user: "" }) }
		});

		let $addTeamSpot=( <div className="card-footer alert alert-warning mb-0" role="alert"> 
				Please log in or create an account to add teams or comments.</div> );
		if( this.state.user != "" ){
			$addTeamSpot=( <div className="card-footer text-muted"><AddTeam floor={this.state.floor}/></div> );
		} 

		return (
			<div className="d-flex w-100 h-100">
				<div className="w-40 h-100 pl-3 pt-2 pb-3">
			        <div className="card front-page-cards">
				        <LevelSelect handleDatState={this.handleDatState.bind(this)}/>
			        	<Flexboxes handleDatState={this.handleDatState.bind(this)}/>
			        	{$addTeamSpot}
			        </div>
	        	</div>
	        	<div className="w-60 h-100 pt-2 pl-3 pr-3 pb-3">
	        		<div className="card front-page-cards">
						<FloorDetails 
							useFilterContains={this.state.useFilterContains}
							useFilterFrom={this.state.useFilterFrom}
							floor={this.state.floor}
							filter={this.state.filter}
						/>
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