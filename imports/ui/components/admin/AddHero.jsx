import React, { Component } from 'react';

export default class AddHero extends Component{
	constructor(props){
		super(props);
		this.state = {value: "", change: "", star: 0, elementType: ""}; 
		this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.handleSelectElement = this.handleSelectElement.bind(this);
    	this.handleSelectStar = this.handleSelectStar.bind(this);
	}
	handleChange(event){
		event.preventDefault();
	    this.setState({change: event.target.value});

	}

	handleSelectElement(event){
		
		this.setState({elementType: event.target.value});
	}
	handleSelectStar(event){
		event.preventDefault(); 
		this.setState({star: parseInt(event.target.value, 10)});
	}

	handleSubmit(event) {
		event.preventDefault();
	    this.setState({value: this.state.change}, function(){
	    	Meteor.call('hero.add', this.state.value , this.state.star, this.state.elementType); 
	    });
	}

	generateStars(){

		const arr = [3, 4, 5]; 
		const listStars = arr.map((num) => 
			<option key={num +1} onSelect= {this.handleSelectStar}> {num}</option>
		 )
		return listStars;
	}

	generateElements(){  
			const num = Array.from(Array(parseInt(5)).keys());
			const arr = ["Fire", "Water", "Earth", "Light", "Dark"]; 
			const listItems = num.map((num) => 
				<option key={num +1} onSelect= {this.handleSelectElement}> {arr[num]}</option>
			);
			return listItems;
	}

	render(){
		return(
		<div>
			<form onSubmit={this.handleSubmit}>
			        <label>
			        Enter the Hero Name:
			       		<input type="text" value={this.state.change} onChange={this.handleChange} />
			       	 Select the Star of the Hero: 
			       	 <select className="custom-select" id="inputGroupSelect01" value= {this.state.star} onChange= {this.handleSelectStar}>
				    	<option>Choose...</option>
				    	{this.generateStars()}
					</select>
					Select the Element of the Hero:
			       	<select className="custom-select" id="inputGroupSelect01" value= {this.state.elementType} onChange= {this.handleSelectElement}>
				    	<option>Choose...</option>
				    	{this.generateElements()}
					</select>
					<input type="submit" value="Submit"  />
					</label>
			</form>
		</div>
		)
	}
}