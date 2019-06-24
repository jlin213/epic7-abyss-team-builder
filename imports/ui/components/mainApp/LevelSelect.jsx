import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../api/abyss/abyssDB.jsx";

class LevelSelect extends Component{
	constructor(props){
		super(props);

		this.state = {
			userSelectedFloor: 0,
		}
	}

	userPick(e){
		this.setState({ userSelectedFloor: e.target.value})
	}
	renderFloorSelect(){
		if (this.props.abyss){
			return this.props.abyss.map((a) => (
				<option key={a._id} value={a.level} >
					Floor: {a.level}
				</option>
			));
		}
	}

	render(){
		return (
			<div id="" className="">
				<div className="card">
					<select id="level-selector" className="custom-select" defaultValue="" onChange={this.userPick.bind(this)}>
						<option value="" disabled>Choose Level</option>
						{this.renderFloorSelect()}
					</select>
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
})(LevelSelect);