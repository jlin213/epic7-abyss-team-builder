import React, { Component } 			from 'react';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { withTracker } 					from 'meteor/react-meteor-data';

class LevelSelect extends Component{
	constructor(props){
		super(props);

		this.state = {
		}
	}
	userPick(e){
		this.props.handleDatState( 'floor' , e.target.value);
	}
	renderFloorSelect(){		
		return Array(Meteor.settings.public.maxFloors).fill().map((v,i)=>i).reverse().map((num) => {
			return <option className="" key={num +1} value={num +1}> Floor {num +1}</option>
		})
	}

	render(){
		return (
			<div id="" className="ml-2 mr-2 mt-2">
				<div className="card">
					<div className="input-group">
						<div className="input-group-prepend">
							<label className="input-group-text" htmlFor="level-selector">Show Teams for Abyss</label>
						</div>
						<select id="level-selector" className="custom-select" defaultValue={this.props.floor} onChange={this.userPick.bind(this)}>
							<option value="" disabled>Choose Floor</option>
							{this.renderFloorSelect()}
						</select>
					</div>
				</div>
			</div>
		)
	}
}
export default withTracker(() => {
	
	return {
	}	
})(LevelSelect);