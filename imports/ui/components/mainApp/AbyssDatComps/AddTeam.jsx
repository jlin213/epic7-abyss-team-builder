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
			guardian: "",
		}; 

		this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.handleSelectGuardian = this.handleSelectGuardian.bind(this);
	}
	handleChange(event){
		event.preventDefault();
		const urlKey = "url" + event.target.id; 
		const heronum = "hero"+ event.target.id; 
		var url = 'http://assets.epicsevendb.com/hero/'+ event.target.value +  "/icon.png"
	   	this.setState({[urlKey]: url, [heronum]: event.target.value}, function(){
	   		console.log(this.state.url1)
	    })
	}
	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.hero1)
		console.log(this.state.guardian) 
	    if(this.state.hero1 != "" && this.state.hero2 != "" && this.state.hero3 != "" && this.state.hero4 != "" && this.state.guardian!= ""){
    		Meteor.call('abyss.team.add', this.props.floor, this.state.hero1 , this.state.hero2, this.state.hero3, this.state.hero4, this.state.guardian); 
    		console.log('abyss'); 
	    	   
	    };
	}
	handleSelectGuardian(event){
		event.preventDefault();
		this.setState({guardian: event.target.value} );
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
									<select id="1" 
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
										<select id= "2" 
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
										<select id="3" 
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
										<select id="4" 
											className="custom-select" 
											defaultValue="" 
											onChange={this.handleChange}
											required>
											<option> Choose... </option>
											{this.renderHeroNames()}
										</select>
								</div>
								<div className = "input-group mb-2">
									<div className="input-group-prepend">
											<label className="input-group-text" htmlFor="guardian-select">Guardian:</label>
									</div>
									<select className="custom-select" id="star-select" onChange = {this.handleSelectGuardian}>
											<option >Choose...</option>
											<option value="Arky" onChange={this.handleSelectGuardian}>Arky</option>
											<option value="Zeaon" onChange={this.handleSelectGuardian}>Zeaon</option>
											<option value="Kromcruz" onChange={this.handleSelectGuardian}>Kromcruz</option>
									</select>
								</div>
							</div>
							<div className="row">
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