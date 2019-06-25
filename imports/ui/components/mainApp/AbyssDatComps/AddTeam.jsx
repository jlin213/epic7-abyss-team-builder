import React, { Component } 			from 'react';
import { withTracker } 					from 'meteor/react-meteor-data';
import {heroDB} 						from "../../../../api/heroes/heroDB.jsx";
class AddTeam extends Component{
	constructor(props){
		super(props);
		this.state = {
			value: "", 
			change: "", 
			hero1: "", 
			hero2: "",
			hero3: "",
			hero4: "",
			url1: "",
			url2: "", 
			url3: "",
			url4: "",
		}; 

		this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		event.preventDefault();
		const id = event.target.id 
		const heronum = "hero"+ parseInt(event.target.id); 
		console.log(id)
		var url = 'http://assets.epicsevendb.com/hero/'+ event.target.value +  "/icon.png"
		console.log(url);
	   	this.setState({[id]: url, [heronum]: event.target.value}, function(){
	   		console.log(this.state.url1)
	    })
	}
	handleSubmit(event) {
		event.preventDefault();
	    this.setState({}, function(){
	    	if(this.state.hero1 != "" && this.hero2 != "" && this.state.hero3 != "" && this.state.hero4 != ""){
	    		Meteor.call('abyss.team.add', this.state.hero1 , this.state.hero2, this.state.hero3, this.state.hero4); 

	    	}
		    
	    });
	}

	renderHeroNames(){
		return this.props.heroes.map((hero) => (
			<option key={hero._id}> {hero.name} </option>
		));
	}
	render(){
		return(
		<div className="m-2">
			<button type="button" 
				className="btn btn-primary" 
				data-toggle="modal" 
				data-target="#addHeroes">
				AddTeam				
			</button>
			<div id="addHeroes"	className="modal fade" role='dialog'>
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Add Team to Abyss Level: 
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
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name-1">Hero 1:</label>
									</div>
									<select id="url1" 
										className="custom-select" 
										defaultValue="" 
										onChange={this.handleChange}
										required>
										<option> Choose... </option>

										{this.renderHeroNames()}
									</select>
								</div>	
								<div className="input-group mb-2">

									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name-2">Hero 2:</label>
									</div>
										<select id="url2" 
											className="custom-select" 
											defaultValue="" 
											onChange={this.handleChange}
											required>
											<option> Choose... </option>
											{this.renderHeroNames()}
										</select>
								</div>		
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name-3">Hero 3:</label>
									</div>
										<select id="url3" 
											className="custom-select" 
											defaultValue="" 
											onChange={this.handleChange}
											required>
											<option> Choose... </option>
											{this.renderHeroNames()}
										</select>
								</div>
								<div className="input-group mb-2">
		
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name-4">Hero 4:</label>
									</div>
										<select id="url4" 
											className="custom-select" 
											defaultValue="" 
											onChange={this.handleChange}
											required>
											<option> Choose... </option>
											{this.renderHeroNames()}
										</select>
								</div>
							</div>
							<div>
								<img src = {this.state.url1} className = "border"/>
								<img src = {this.state.url2} className = "border"/>
								<img src = {this.state.url3} className = "border"/>
								<img src = {this.state.url4} className = "border"/>
							</div>
							<div className="ml-2 mr-2"><p>
							</p></div>
							<div className="modal-footer">
								<button className="btn btn-primary" type="submit" value="Submit" onSubmit= {this.onSubmit}>Submit</button>
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
	Meteor.subscribe('hero.all');
	Meteor.subscribe('abyss.all');
	return {
		heroes: heroDB.find({}, {sort: {natStar: -1, element: 1, name: 1}}).fetch(),
	}
})(AddTeam);