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
			duplicateError: false,
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
	    })

	}
	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.hero1)
		console.log(this.state.guardian) 
	    if(this.state.hero1 != "" && this.state.hero2 != "" && this.state.hero3 != "" && this.state.hero4 != "" && this.state.guardian!= ""){

    		Meteor.call('abyss.team.add', this.props.floor, this.state.hero1 , this.state.hero2, this.state.hero3, this.state.hero4, this.state.guardian); 
    		$('[id^="addHeroes"]').modal('hide');

    		this.setState({
	    		hero1: "", 
				hero2: "",
				hero3: "",
				hero4: "",
				url1: "",
				url2: "", 
				url3: "",
				url4: "",
				guardian: "",
    		})
	    	   
	    };
	}
	handleSelectGuardian(event){
		event.preventDefault();
		this.setState({guardian: event.target.value} );
	}

	renderHeroNames(name1, name2, name3 ){

		return this.props.heroes.map((hero) => 
			{
			if(hero.name != name1 && hero.name!= name2 && hero.name!= name3){ 
			return <option key={hero._id} value = {hero.name} > {hero.nameCleaned} </option>
			}
			else {
				return <option key = {hero._id} value= {hero.name} disabled> {hero.nameCleaned} </option>
			}
			}
		);
	}
	render(){
		const duplicateError = this.state.duplicateError; 
		let text; 

		if(duplicateError){
			text = <h2> This team already exists. Duplicate team is not allowed. </h2>
		}
		return(
		<div className="m-2">
			<button type="button" 
				className="btn btn-primary btn-block" 
				data-toggle="modal" 
				data-target="#addHeroes">
				Add Team				
			</button>
			<div id="addHeroes"	className="modal fade data-keyboard data-backdrop" role='dialog'>
				<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Add Team to Abyss Level {this.props.floor}: 
							</h5>
							<button type="button" 
								className="close" 
								data-dismiss="modal" 
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div>
							{text} 
						</div>
						<form onSubmit={this.handleSubmit}>
							<div className="modal-body" id = "hero-select">
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name-1">Hero 1:</label>
									</div>
									<select id="1" 
										className="custom-select" 
										defaultValue="" 
										value = {this.state.hero1}
										onChange={this.handleChange}
										required>
										<option value = ""> Choose... </option>

										{this.renderHeroNames(this.state.hero2, this.state.hero3, this.state.hero4)}
									</select>
								</div>	
								<div className="input-group mb-2">

									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name-2">Hero 2:</label>
									</div>
										<select id= "2" 
											className="custom-select" 
											defaultValue="" 
											value = {this.state.hero2}
											onChange={this.handleChange}
											required>
											<option value = ""> Choose... </option>
											{this.renderHeroNames(this.state.hero1, this.state.hero3, this.state.hero4)}
										</select>
								</div>		
								<div className="input-group mb-2">
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name-3">Hero 3:</label>
									</div>
										<select id="3" 
											className="custom-select" 
											defaultValue="" 
											value = {this.state.hero3}
											onChange={this.handleChange}
											required>
											<option value = ""> Choose... </option>
											{this.renderHeroNames(this.state.hero1, this.state.hero2, this.state.hero4)}
										</select>
								</div>
								<div className="input-group mb-2">
		
									<div className="input-group-prepend">
										<label className="input-group-text" htmlFor="hero-name-4">Hero 4:</label>
									</div>
										<select id="4" 
											className="custom-select" 
											defaultValue="" 
											value = {this.state.hero4}
											onChange={this.handleChange}
											required>
											<option value = ""> Choose... </option>
											{this.renderHeroNames(this.state.hero1, this.state.hero2, this.state.hero3)}
										</select>
								</div>
								<div className = "input-group mb-2">
									<div className="input-group-prepend">
											<label className="input-group-text" htmlFor="guardian-select">Guardian:</label>
									</div>
									<select className="custom-select" 
									id="guardian-select"
									value = {this.state.guardian} 
									onChange = {this.handleSelectGuardian}>
											<option  value = "">Choose...</option>
											<option value="Arky" onChange={this.handleSelectGuardian}>Arky</option>
											<option value="Zeaon" onChange={this.handleSelectGuardian}>Zeaon</option>
											<option value="Kromcruz" onChange={this.handleSelectGuardian}>Kromcruz</option>
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
		heroes: heroDB.find({}, {sort: {name: 1}}).fetch(),
	}
})(AddTeam);