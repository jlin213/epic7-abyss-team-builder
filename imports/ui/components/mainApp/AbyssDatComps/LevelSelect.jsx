import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';

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
		this.props.handleDatState( 'floor' , e.target.value);
	}
	renderFloorSelect(){		
		return Array(Meteor.settings.public.maxFloors).fill().map((v,i)=>i).map((num) => {
			return <option key={num} value={num +1}>	Floor: {num +1}</option>
		})
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
	
	return {
	}	
})(LevelSelect);