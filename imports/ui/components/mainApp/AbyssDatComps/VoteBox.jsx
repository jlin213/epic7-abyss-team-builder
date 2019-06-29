import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';

if (Meteor.isClient) {
	Session.setDefault('client', 0);
}

class VoteBox extends Component{
	constructor(props){
		super(props);

		this.state = {	
		}
	}

	Upvote(){
		// console.log("upvote" + this.props.teamID);
		Meteor.call('vote.team', this.props.teamID, 'up' )
	}
	Downvote(){
		// console.log("upvote" + this.props.teamID);
		Meteor.call('vote.team', this.props.teamID, 'down' )
	}
	render(){
		let $negVote = "";
		let $upvoteStyle = "";
		let $downvoteStyle = ""
		if (this.props.upped ){ $upvoteStyle="vote-choice" } else { $upvoteStyle = ""; }
		if (this.props.downed){ $downvoteStyle="vote-choice" } else { $downvoteStyle = "" }
		if (this.props.score <0) { $negVote=" text-danger" } else { $negVote=" text-primary"}
		return (
			<div id="" className="vote-box d-flex flex-column justify-content-center">
				<div className="text-center vote-buttons d-flex justify-content-center align-items-center w-100">
					<div className="d-flex flex-column text-primary"
						onClick={this.Upvote.bind(this)} >
							<i className={"fas fa-angle-up "+ $upvoteStyle}>
							</i>
					</div>
				</div>
				<div className={"d-flex justify-content-center align-items-center score"+ $negVote}>
					<strong>{this.props.score}</strong>
				</div>
				<div className="vote-buttons d-flex justify-content-center align-items-center w-100">
					<div className="text-center d-flex flex-column text-danger"
						onClick={this.Downvote.bind(this)} >
						<i className={"fas fa-angle-down " + $downvoteStyle}></i>
					</div>
				</div>
			</div>
		)
	}
}
export default withTracker((props) => {
	
	return {
	
	}	
})(VoteBox);