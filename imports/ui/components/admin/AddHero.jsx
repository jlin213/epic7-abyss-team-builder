import React, { Component } from 'react';

export default class AddHero extends Component{
	constructor(props){
		super(props);
		this.state = {
			value: "", 
			change: "", 
			star: 0, 
			elementType: ""
		}; 

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
	render(){
		return(
		<div className="">
			<button type="button" 
				className="btn btn-primary" 
				data-toggle="modal" 
				data-target="#addHeroes">
				Add Heroes
			</button>
			<div id="addHeroes"	className="modal fade" role='dialog'>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Add heroe to available heroes list
							</h5>
							<button type="button" 
								className="close" 
								data-dismiss="modal" 
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<form onSubmit={this.handleSubmit}>
							<div className="modal-body">
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name">Hero Name:</label>
									</div>
									<input id="hero-name"
										className="form-control" 
										type="text" 
										value={this.state.change} 
										onChange={this.handleChange} />
								</div>
								<div className="input-group mb-3 ">
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="star-select">Natural Stars:</label>
									</div>
									<select className="custom-select" id="star-select">
										<option disabled>Choose...</option>
										<option value="3" onSelect={this.handleSelectStar}>3</option>
										<option value="4" onSelect={this.handleSelectStar}>4</option>
										<option value="5" onSelect={this.handleSelectStar}>5</option>
									</select>

									<div className="input-group-prepend ml-2">
										<label className="input-group-text" htmlFor="star-select">Element:</label>
									</div>
									<select className="custom-select" id="star-select">
										<option disabled>Choose...</option>
										<option value="Fire" 	onSelect={this.handleSelectElement}>Fire</option>
										<option value="Earth" 	onSelect={this.handleSelectElement}>Earth</option>
										<option value="Water" 	onSelect={this.handleSelectElement}>Water</option>
										<option value="Light" 	onSelect={this.handleSelectElement}>Light</option>
										<option value="Dark" 	onSelect={this.handleSelectElement}>Dark</option>
									</select>
								</div>
							</div>
							<div className="modal-footer">
								<button className="btn btn-primary" type="submit" value="Submit">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		)
	}
}