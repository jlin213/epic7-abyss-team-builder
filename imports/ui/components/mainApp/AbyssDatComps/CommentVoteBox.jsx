import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';


class CommentVoteBox extends Component{
	constructor(props){
		super(props);

		this.state = {	
		}
	}

	Upvote(){
		console.log(this.props.commentID)
		Meteor.call('vote.comment', this.props.commentID, 'up' )
	}
	Downvote(){
		Meteor.call('vote.comment', this.props.commentID, 'down' )
	}
	render(){
		let $upvoteStyle = "";
		let $downvoteStyle = ""
		if (this.props.upped ){ $upvoteStyle="vote-choice" } else { $upvoteStyle = ""; }
		if (this.props.downed){ $downvoteStyle="vote-choice" } else { $downvoteStyle = "" }
		return (
			<div id="" className="vote-box d-flex flex-column justify-content-center m-2">
				<div className="text-center d-flex justify-content-center align-items-center w-100">
					<div className="point d-flex flex-column text-muted"
						onClick={this.Upvote.bind(this)} >
							<i className={"fas fa-angle-up "+ $upvoteStyle}>
							</i>
					</div>
				</div>
				<div className=" d-flex justify-content-center align-items-center score text-muted">
					<strong>{this.props.score}</strong>
				</div>
				<div className=" d-flex justify-content-center align-items-center w-100">
					<div className="point text-center d-flex flex-column text-muted"
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
})(CommentVoteBox);