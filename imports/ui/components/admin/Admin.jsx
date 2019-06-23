import React, { Component } from 'react';

export default class Admin extends Component{
	constructor(props){
		super(props);
		this.state = {value: "", change: ""}; 
		this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		event.preventDefault();
	    this.setState({change: event.target.value});

	}
	handleSubmit(event) {
		event.preventDefault();
	    this.setState({value: this.state.change}, function(){
	    	Meteor.call('Hero.add', this.state.value , 5, "Water"); 
	    });
	}
	render(){
		return(
		<div>
			<form onSubmit={this.handleSubmit}>
			        <label>
			        Enter the Hero Name:
			       		<input type="text" value={this.state.change} onChange={this.handleChange} />
			        </label>
			        <input type="submit" value="Submit"  />
			</form>
		</div>
		)
	}
}