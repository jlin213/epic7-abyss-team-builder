import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';
import { heroDB } 						from "../../../api/heroes/heroDB.jsx";
class SrapeAPI extends Component{
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
    	this.callAPI = this.callAPI.bind(this);
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
		    this.setState({ value: "" });
    		this.setState({ change: "" });
   	 		this.setState({ star: 0 });
   	 		this.setState({ elementType: "" });
	    });
	}

	renderHeroNames(){
		return this.props.heroes.map((hero) => (
			<span key={hero._id}>[ {hero.name} ] </span>
		));
	}

	callAPI(){
		var store = Meteor.call("getHeroInfo");
		alert("Fetched and Scraped");
	}

	render(){
		return(
		<div className="m-2">
			<button type="button" 
				className="btn btn-primary mr-2" 
				data-toggle="modal" 
				data-target="#addHeroes"
				disabled>
				Manual Add Heroes
			</button>
			<button type="button" onClick ={this.callAPI} 
				className="btn btn-primary" >
				Scrape Api
			</button>
			<div id="addHeroes"	className="modal fade" role='dialog'>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Add hero to pool
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
										<label className="input-group-text" htmlFor="hero-name">Name:</label>
									</div>
									<input id="hero-name"
										className="form-control" 
										type="text" 
										value={this.state.change} 
										onChange={this.handleChange} 
										required />

									<div className="input-group-prepend ml-2">
										<label className="input-group-text" htmlFor="hero-class">Class:</label>
									</div>
									<select id="hero-class" 
										className="custom-select" 
										defaultValue="" 
										onChange={this.handleSelectStar}
										required>
										<option value=""	disabled>Choose...</option>
										<option value="Ranger">Ranger</option>
										<option value="Mage" >Mage</option>
										<option value="Knight" >Knight</option>
										<option value="Thief" >Thief</option>
										<option value="Soul Weaver" >Soul Weaver</option>
									</select>
								</div>
								<div className="input-group mb-3 ">
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="star-select">Natural Stars:</label>
									</div>
									<select id="star-select" 
										className="custom-select" 
										defaultValue=""
										onChange={this.handleSelectStar}
										required>
										<option value="" 	disabled>Choose...</option>
										<option value="3" >3</option>
										<option value="4" >4</option>
										<option value="5" >5</option>
									</select>

									<div className="input-group-prepend ml-2">
										<label className="input-group-text" htmlFor="element-select">Element:</label>
									</div>
									<select id="element-select" 
										className="custom-select" 
										defaultValue=""
										onChange={this.handleSelectElement}
										required>
										<option value="" 	disabled>Choose...</option>
										<option value="Fire" >Fire</option>
										<option value="Earth" >Earth</option>
										<option value="Water" >Water</option>
										<option value="Light" >Light</option>
										<option value="Dark" >Dark</option>
									</select>
								</div>
							</div>
							<div className="ml-2 mr-2"><p>
								<strong>Current Pool: </strong>{this.renderHeroNames()}
							</p></div>
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
export default withTracker(() => {
	Meteor.subscribe('heroes.all');

	return {
		heroes: heroDB.find({},{sort: {name: 1} }).fetch(),
	}
})(SrapeAPI);