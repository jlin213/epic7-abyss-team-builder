import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';
import { abyssDB } 						from "../../../api/abyss/abyssDB.jsx";

class FloorSelector extends Component{
	constructor(props){
		super(props);

		this.state = {
			newFloorMax: 0,
		}; 
	}

	handleChange(e){ this.setState({newFloorMax: parseInt(e.target.value)}) }

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.newFloorMax > this.props.abyss.length){
			for (var x = this.props.abyss.length + 1; x < this.state.newFloorMax +1 ;  x++ ){
				Meteor.call('abyss.add', x );
				console.log("Adding floor :" + x);
			}
			
		}
	}
	render(){
		return(
			<div className="m-2"> 
				<form onSubmit={this.handleSubmit.bind(this)} >
					<label htmlFor="max-floor-setter">
						Set Max Abyss Level
					</label>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">Current Levels:</span>
							<span className="input-group-text">{this.props.abyss.length}</span>
						</div>
						<input id="max-floor-setter"
							type="number" 
							className="form-control" 
							aria-label="New floor max"
							onChange={this.handleChange.bind(this)}/>
						<div className="input-group-append">
							<button className="btn btn-outline-primary" 
								min={this.props.abyss.length}
								type="submit" >
								<i className="fas fa-chevron-right"></i>
							</button>
						</div>
					</div>
				</form>
			</div>	
		);
	}
}
export default withTracker(() => {
	Meteor.subscribe('abyss.all');
	
	return {
		abyss: abyssDB.find({}).fetch(),
	}	
})(FloorSelector);