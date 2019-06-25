import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../../api/abyss/abyssDB.jsx";

class FloorDetails extends Component{
	constructor(props){
		super(props);

		this.state = {	

		}
	}

	render(){
		let $filterStatus = "";
		if (this.props.useFilter){
			 $filterStatus = "true"
		} else {
			 $filterStatus = "false"
		}

		return (
			<div id="" className="m-2">
				<div className="card">
					Abyss Floor: {this.props.floor} - UseFilter:{$filterStatus} - Filter:{this.props.filter+" "}
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
})(FloorDetails);