import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../../api/abyss/abyssDB.jsx";

import VoteBox						from './VoteBox.jsx';
import CommentBox						from './CommentBox.jsx';

class FloorDetails extends Component{
	constructor(props){
		super(props);

		this.state = {	

		}
	}
	nextPageTeams(e){
		if (this.props.teamsPageIndex +2 < this.props.abyss.length){
			this.props.handleDatState('teamsPageIndex', this.props.teamsPageIndex +3);
		}
	}
	prevPageTeams(e){
		if (this.props.teamsPageIndex != 0 ){
			this.props.handleDatState('teamsPageIndex', this.props.teamsPageIndex -3);
		}
	}
	renderTeams(){	
		if (this.props.abyss.length == 0){
			return(	<div className="container alert alert-light empty p-7 text-center">
				<h5><strong>OnO</strong></h5>
					<p><strong>There doesn't seem to be a team for this floor yet. </strong></p>
					<p><strong>Why not get things started by adding one?</strong></p>
					<hr/>
					<p className="font-weight-light">You will need to be logged in to add a team.</p>
				</div>
			);
		}

		return this.props.abyss.slice(this.props.teamsPageIndex, this.props.teamsPageIndex +3 ).map((teams) => {
			return ( 
				<div className="view-team-wrap border view-slots d-flex flex-row" key={teams._id}>
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
					<p className="team-by">team by: {teams.team.createdby}</p>
					<div className="team-spacer h-100" />
					<VoteBox upvotes={teams.team.upvotes} 
						downvotes={teams.team.downvotes} 
						score={teams.team.score}
						teamID={teams._id}
						upped={teams.team.upvotes.includes(Session.get("client"))}
						downed={teams.team.downvotes.includes(Session.get("client"))} />
					<div className="comment-wrap d-flex flex-row">
						<div className="comments border h-100">
							<CommentBox user={this.props.user}
								team={teams._id}
								slot1={teams.team.slot1}
								slot2={teams.team.slot2}
								slot3={teams.team.slot3}
								slot4={teams.team.slot4}
								date={teams.team.createdOn}/>
						</div>
					</div>
				</div>
			);
		})
	}
	render(){
		return (
			<div className="h-100">
				<button type="button" 
					onClick={this.prevPageTeams.bind(this)}
					className="text-muted view-page-nav btn btn-outline-secondary 
								btn-block text-center bg-light">
					<i className="fas fa-angle-double-up"></i> 
				</button>
				{this.renderTeams()}
				<button type="button" 
					onClick={this.nextPageTeams.bind(this)}
					className="text-muted view-page-nav view-page-nav-down btn 
								btn-outline-secondary btn-block text-center bg-light">
					<i className="fas fa-angle-double-down"></i>
				</button>
			</div>
		)
	}
}
export default withTracker((props) => {
	Meteor.subscribe('abyss.all');

	let floorNum = parseInt(props.floor);
	if (props.useFilterFrom){
		return {
			abyss: abyssDB.find({ 
				$and : [
					{ 'team.level': floorNum },
					{ 'team.slot1': { $in: props.filter } },
					{ 'team.slot2': { $in: props.filter } },
					{ 'team.slot3': { $in: props.filter } },
					{ 'team.slot4': { $in: props.filter } }
				]
			}, {sort: {'team.score': -1} }	).fetch(),
		}	
	} else if(props.useFilterContains){
		if (props.filter.length == 0){
			return {
				abyss: abyssDB.find({ 'team.level': floorNum }, {sort: {'team.score': -1} }	).fetch(),
			}	
		}
		return {
			abyss: abyssDB.find({ 
				$and : [
					{ 'team.level': floorNum },
					{ $or : [ 
						{ 'team.slot1': { $in: props.filter } },
						{ 'team.slot2': { $in: props.filter } },
						{ 'team.slot3': { $in: props.filter } },
						{ 'team.slot4': { $in: props.filter } }
					]}
				]
			}, {sort: {'team.score': -1} }	).fetch(),
		}	
	} else {
		return {
			abyss: abyssDB.find({ 'team.level': floorNum }, {sort: {'team.score': -1} }	).fetch(),
		}	
	}

})(FloorDetails);