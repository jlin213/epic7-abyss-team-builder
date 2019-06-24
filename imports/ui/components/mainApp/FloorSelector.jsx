import React, { Component } from 'react';
import {abyssDB} from "../../../api/abyss/abyssDB.jsx";
import { withTracker } from 'meteor/react-meteor-data';

class FloorSelector extends Component{
	constructor(props){
		super(props);
		this.state = {value: "", change: "", previousArr: ""}; 
		this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
	    this.setState({change: event.target.value});
	    event.preventDefault();
	}

  	handleSubmit(event) {
  		if (this.props.abyss.level < this.state.value | this.props.abyss.level == null){	    
		    this.setState({value: this.state.change}, function(){
		    	Meteor.call('abyss.add', this.state.value)
		    });
		}
	    event.preventDefault();
	}
	//generate the array of floors based on input 
	generateArray(){
		if (this.state.value == ''){
			return;
		}else if (this.props.abyss.level < this.state.value){	    
			const num = Array.from(Array(parseInt(this.state.value)).keys());
			const listItems = num.map((num) => 
				<option key={num +1} >Floor {num+1}</option>
			);
			this.setState({previousArr: listItems});
			return listItems;
		}
		else{
			return this.state.previousArr;
		}
	}		

	render(){
		return(
			<div> 
				<form onSubmit={this.handleSubmit}>
			        <label>
			        What is your maximum floor:
			        <input type="text" value={this.state.change} onChange={this.handleChange} />
			        </label>
			        <input type="submit" value="Submit" />
			    </form>
			    <select className="custom-select" id="inputGroupSelect01">
				    <option>Choose...</option>
				    {this.generateArray()}
				</select>
				
			</div>	
		);
	}
}

export default withTracker(() => {
  	Meteor.subscribe('abyss.all');
  	return {
    	abyss: abyssDB.find({}).fetch(),
		}
	}	
)(FloorSelector);

