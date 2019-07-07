import React, { Component } 			from 'react';
import { heroDB } 						from "../../../../api/heroes/heroDB.jsx";
import { abyssDB}						from "../../../../api/abyss/abyssDB.jsx";
import { abyssCommentsDB } 				from "../../../../api/abyss/abyssDB.jsx";
import { withTracker } 					from 'meteor/react-meteor-data';
import { Meteor } 						from 'meteor/meteor';

class Footer extends Component{
	constructor (props){
		super(props); 
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(event){
		event.preventDefault();
		if(event.target.id == "wy"){
			window.open('https://wyung.com');
		}
		if(event.target.id == "jl"){
			window.open('https://jlin213.github.io/');
		}
	}
	render(){
		return (
			<div>
				<div> Made by: Wilson Yung  <a href = "" id = "wy" onClick = {this.handleClick}>wyung.com</a>
				, Julianne Lin <a href = "" id = "jl" onClick = {this.handleClick}> https://jlin213.github.io/ </a> 
				</div>

				<div> 
					Number of teams: {this.props.numTeams}	
					<br></br>
					Number of comments: {this.props.numComments}
					<br></br>
					Number of registered users: {this.props.numUsers}
				</div>
			</div>
			)
	}
}

export default withTracker(() => {
	Meteor.subscribe('abyss.all');
	Meteor.subscribe('userCount');
	Meteor.subscribe('abyss.commentsCount') 
	return {
		numUsers: Meteor.users.find({}).count(),
		numComments: abyssCommentsDB.find({}).count(),
		numTeams: abyssDB.find({}).count(), 

	}
})(Footer);