import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';

import { heroDB } 						from "../../../api/heroes/heroDB.jsx";
import { abyssDB } 						from "../../../api/abyss/abyssDB.jsx";

class AdminInfo extends Component{
	constructor(props){
		super(props);

		this.state = {
		}; 
	}
	
	renderAdminHero(){
		if (this.props.heroes){
			return this.props.heroes.map((a) => (
				<div key={a._id} value={a.name} >
					name:{a.name} - natStar:{a.natStar} - element:{a.element}
				</div>
			));
		}
	}
	renderAdminAbyss(){
		if (this.props.abyss){
			return this.props.abyss.map((a) => (
				<div key={a._id} value={a.level} >
				</div>
			));
		}
	}
	render(){
		return(
			<div className="card m-2">
				<div className="card-header">
					HeroDB:
				</div>
				<div className="card-body admin-mini-display mb-2">
					{this.renderAdminHero()}
				</div>
				<div className="card-header">
					AbyssDB:
				</div>
				<div className="card-body admin-mini-display">
					{this.renderAdminAbyss()}
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('heroes.all');
	Meteor.subscribe('abyss.all');
 
	return {
		heroes: heroDB.find({}).fetch(),
		abyss: abyssDB.find({}).fetch(),
	}
})(AdminInfo);


