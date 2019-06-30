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
			floor: Meteor.settings.public.maxFloors,
			useFilterContains: false,
			useFilterComprise: false,
			filter: [],
			user: null,
			teamsPageIndex: 0,
		}
	}

	componentWillMount(){
		this.setState({user: Meteor.userId()});
	}

	handleDatState(key, value){ this.setState({ [key]: value }) }

	render(){
		Meteor.call('getIp', function(err,res){
			if(!err) {
				Session.set("client", res);
			} 
		})	
		var scope = this;
		Accounts.onLogin(function(){
			if (scope.state.user == ""){ scope.setState({ user: Meteor.user().username }) }
		});
		Accounts.onLogout(function(){
			if (scope.state.user != ""){ scope.setState({ user: "" }) }
		});

		console.log(this.state.user)

		let $addTeamSpot=( <div className="card-footer alert alert-warning mb-0" role="alert"> 
				Please log in or create an account to add new teams or comments.</div> );
		if( this.state.user != null ){
			$addTeamSpot=( <div className="card-footer text-muted"><AddTeam floor={this.state.floor}/></div> );
		} 

		return (
			<div className="d-flex w-100 h-100">
				<div className="w-40 h-100 pl-3 pt-2 pb-3">
					<div className="card front-page-cards h-100">
						<LevelSelect 
							handleDatState={this.handleDatState.bind(this)}
							floor={this.state.floor} />
						<Flexboxes handleDatState={this.handleDatState.bind(this)}/>
						{$addTeamSpot}
					</div>
				</div>
				<div className="w-60 h-100 pt-2 pl-3 pr-3 pb-3">
					<div className="card front-page-cards h-100">
						<FloorDetails 
							user={this.state.user}
							useFilterContains={this.state.useFilterContains}
							useFilterComprise={this.state.useFilterComprise}
							floor={this.state.floor}
							filter={this.state.filter}
							teamsPageIndex={this.state.teamsPageIndex}
							handleDatState={this.handleDatState.bind(this)}
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