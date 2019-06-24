import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../../api/abyss/abyssDB.jsx";

class LevelSelect extends Component{
	constructor(props){
		super(props);

		this.state = {
		}
	}
	componentDidMount(){
		if ((parseInt(FlowRouter.getParam('floorNum')) ) && ( this.state.floor == "" )){
			this.setState({ floor: parseInt(FlowRouter.getParam('floorNum')) });
			console.log(this.state.floor)
			console.log(parseInt(FlowRouter.getParam('floorNum')))
		}	
	}
	userPick(e){
		this.props.handleFloorSelect(e.target.value);
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
			<div id="" className="m-2">
				<div className="card">
					<select id="level-selector" className="custom-select" defaultValue="" onChange={this.userPick.bind(this)}>
						<option value="" disabled>Choose Abyss Level</option>
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