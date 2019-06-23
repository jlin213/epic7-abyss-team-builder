import React, { Component } from 'react';

export default class FloorSelector extends Component{

	constructor(props){
		super(props);
		this.state = {value: "", change: ""}; 
		this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
	}



	handleChange(event){
	    this.setState({change: event.target.value});
	    event.preventDefault();
	}

  	handleSubmit(event) {
	    this.setState({value: this.state.change});
	    event.preventDefault();
	}

	//generate the array of floors based on input 
	generateArray(){
		if (this.state.value == ''){
			return;
		}else{		    
			const num = Array.from(Array(parseInt(this.state.value)).keys());
			const listItems = num.map((num) => 
				<option key={num +1} >Floor {num+1}</option>
			);
			return listItems;
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

