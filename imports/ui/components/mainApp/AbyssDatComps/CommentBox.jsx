import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';

import { abyssCommentsDB } 				from "../../../../api/abyss/abyssDB.jsx";


class CommentBox extends Component{
	constructor(props){
		super(props);

		this.state = {	
			teamId : this.props.team,
			newComment: "",
		}
	}


	renderComments(){
		return null;
	}
	addComment(e){
		e.preventDefault();

		Meteor.call('comment.add', this.props.team, this.state.newComment);
	}

	typingNewComment(e){ this.setState({ newComment: e.target.value }) }

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
						placeholder="Add comment (max 500 chars)"
						onChange={this.typingNewComment.bind(this)}
						required></textarea>
					<div className="input-group-append">
						  <button type="submit" className="btn btn-outline-primary">Submit</button>
					</div>
				</form>
			);
			$loginReqFront = "";
		} 

		// // if there are no comments (comments.legnth == 0)
			$loginReqFront = (	<div className="comment-body alert alert-warning m-0 point d-flex flex-column justify-content-center"
				data-toggle="modal" 
				data-target="#viewMoreComs">
				There are no comments for this team yet. Click here to add one.
			</div>);


		return (
			<div className="text-center h-100">
				{$loginReqFront}
				{this.renderComments}
				<div className="comment-footer d-flex flex-column justify-content-center"
					data-toggle="modal" 
					data-target="#viewMoreComs">
					View more
				</div>
				<div className="modal fade" 
					id="viewMoreComs" 
					role="dialog">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header team-comment-title">
								<img src={'http://assets.epicsevendb.com/hero/' + this.props.slot1 + '/icon.png'} 
									className="view-comment-hero view-comment-hero-lead "/>
								<img src={'http://assets.epicsevendb.com/hero/' + this.props.slot2 + '/icon.png'} 
									className="view-comment-hero "/>
								<img src={'http://assets.epicsevendb.com/hero/' + this.props.slot3 + '/icon.png'} 
									className="view-comment-hero "/>
								<img src={'http://assets.epicsevendb.com/hero/' + this.props.slot4 + '/icon.png'} 
									className="view-comment-hero "/>
								<span className="added-on">Floor { this.props.floor } <br/>team created: <br/> {this.props.date}</span>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="comment-modal-body modal-body">

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
	Meteor.subscribe('abyss.all');


	return {
	
	}	
})(CommentBox);