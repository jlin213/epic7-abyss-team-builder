import React, { Component } 			from 'react';
import AddHero 							from "./AddHero.jsx";

export default class AdminButtons extends Component{
	constructor(props){
		super(props);

	}

	renderAddHeroes(){
		return(<AddHero />)
	}
	render(){
		return(
			<div id="admin-buttons">
				<div className="card w-100">
					<div className="card-body">
						{this.renderAddHeroes()}
					</div>
				</div>
			</div>
		);
	}
}