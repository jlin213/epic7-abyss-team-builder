import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';


class CommentBox extends Component{
	constructor(props){
		super(props);

		this.state = {	
		}
	}


	render(){
		return (
			<div className="text-center h-100">
				<div className="comment-body ">
					<h5 className="card-title">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
				</div>
				<div id="" className="comment-footer d-flex flex-column justify-content-center">
					View more
				</div>
			</div>
		)
	}
}
export default withTracker((props) => {
	
	return {
	
	}	
})(CommentBox);