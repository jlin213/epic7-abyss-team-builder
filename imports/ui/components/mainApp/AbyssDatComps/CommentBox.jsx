import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';
import { moment } 						from 'meteor/momentjs:moment';

import { abyssCommentsDB } 				from "../../../../api/abyss/abyssDB.jsx";
import CommentVoteBox					from './CommentVoteBox.jsx'

class CommentBox extends Component{
	constructor(props){
		super(props);

		this.state = {	
			teamId : this.props.team,
			newComment: "",
			// showCommentsModal: "" ,
		}
	}

	// return this.props.comments.slice(this.props.teamsPageIndex, this.props.teamsPageIndex +3 ).map((teams) => {

	renderComments(){
		return this.props.comments.map((comment) => {
			return (
				<li key={comment._id} className="text-left d-flex flex-row justify-content-center list-group-item">
					<blockquote className="comment-blockquote blockquote mb-0 d-flex flex-column justify-content-center">
						<p>{comment.comment}</p>
						<footer className="blockquote-footer">
							<cite title="Source Title">{comment.createdByUsername} </cite>Created on { moment(comment.dateCreated).format("M-DD-YY")}
						</footer>
					</blockquote>
					<CommentVoteBox upvotes={comment.upvotes} 
						downvotes={comment.downvotes} 
						score={comment.score}
						commentID={comment._id}
						upped={comment.upvotes.includes(Session.get("client"))}
						downed={comment.downvotes.includes(Session.get("client"))} />
				</li>
			);
		});
	}
	renderTopComment(){
		return [this.props.comments[0]].map((comment) => {
			return (
				<div key={comment._id} className="comment-body m-0 d-flex flex-row justify-content-center">
					<div className="comment-text">
						<strong> {comment.createdByUsername}: </strong>
						{comment.comment}
					</div>
					<CommentVoteBox upvotes={comment.upvotes} 
							downvotes={comment.downvotes} 
							score={comment.score}
							commentID={comment._id}
							upped={comment.upvotes.includes(Session.get("client"))}
							downed={comment.downvotes.includes(Session.get("client"))} />
				</div>
			);
		});
	}

	addComment(e){
		e.preventDefault();

		Meteor.call('comment.add', this.props.team, this.state.newComment);
		this.setState({ newComment: ""});
	}

	toggleModal(){ this.setState({showCommentsModal: !this.state.showCommentsModal}) };	

	typingNewComment(e){ this.setState({ newComment: e.target.value }) };

	render(){
		//login to add comment
		let $loginReqFront=( <div className="comment-body alert alert-warning mb-0 d-flex flex-column justify-content-center" role="alert"> 
			Please log in or create an account to add new teams or comments.</div> );
		let $loginReqForm = ( <div className="comment-body alert alert-warning mb-0 d-flex flex-column justify-content-center" role="alert"> 
			Please log in or create an account to add new teams or comments.</div> );
		
		if( this.props.user != "" ){
			$loginReqForm = (
				<form className="input-group" onSubmit={this.addComment.bind(this)}>
					<textarea className="form-control" 
						rows="3" 
						maxLength="500" 
						value={this.state.newComment}
						placeholder="Add comment (max 500 chars)"
						onChange={this.typingNewComment.bind(this)}
						required></textarea>
					<div className="input-group-append">
						  <button type="submit" className="btn btn-outline-primary" >Submit</button>
					</div>
				</form>
			);
			$loginReqFront = "";
		} 

		if ( this.props.comments.length==0 ){
			$loginReqFront = (	<div className="comment-body alert alert-warning m-0 point d-flex flex-column justify-content-center"
				data-toggle="modal" 
				data-target={"#viewMoreComs"+this.props.team}>
				There are no comments for this team yet. Click here to add one.
			</div>);
		} else {
			$loginReqFront = ( this.renderTopComment() )
		}

		return (
			<div className="text-center h-100">
				{$loginReqFront}

				<div className="comment-footer d-flex flex-column justify-content-center"
					data-toggle="modal" 
					data-target={"#viewMoreComs"+this.props.team}>
					View more
				</div>
				<div className="modal fade" 
					id={"viewMoreComs"+this.props.team} 
					role="dialog">
					<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header team-comment-title d-flex flex-column pb-1">
								<div className="view-comment-hero-box d-flex justify-content-around">
									<img src={'http://assets.epicsevendb.com/hero/' + this.props.slot1 + '/icon.png'} 
										className="view-comment-hero view-comment-hero-lead "/>
									<img src={'http://assets.epicsevendb.com/hero/' + this.props.slot2 + '/icon.png'} 
										className="view-comment-hero "/>
									<img src={'http://assets.epicsevendb.com/hero/' + this.props.slot3 + '/icon.png'} 
										className="view-comment-hero "/>
									<img src={'http://assets.epicsevendb.com/hero/' + this.props.slot4 + '/icon.png'} 
										className="view-comment-hero "/>
									<span className="added-on text-muted"><h6>Floor { this.props.floor } </h6>team created: <br/> {moment(this.props.date).format("M-DD-YY")}</span>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									</div>
								<div className="extra-team-details d-flex justify-content-around text-muted w-100 mt-2"> 
									<span>Upvotes:{this.props.up} </span>
									<span>Score: {this.props.score}</span>
									<span>Downvotes: {this.props.down}</span>
									<span> </span>
								</div>
							</div>
							<div className="comment-modal-body modal-body">
								<div className="card">
									<ul className="list-group list-group-flush">
										{this.renderComments() }
									</ul>
								</div>							
							</div>
							<div className="modal-footer">
								{$loginReqForm}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default withTracker((props) => {
	Meteor.subscribe('abyss.comments.teamID', props.team);

	return {
		comments: abyssCommentsDB.find({ teamID:props.team }, {sort: {'score': -1} } ).fetch(),
	}	
})(CommentBox);