import React, { Component } from 'react';
import update from "immutability-helper";

export default class FlexBoxes extends Component{
	constructor(props){
		super(props);
		this.state = {
			click: [], 
		}; 
		this.handleClick = this.handleClick.bind(this);
	}

	//will be modified when there is a database
	generateHeroName(){
		return ["bellona", "luna"]; 
	}

	//generate the url for API call 
	generateURL(i){
		var url = new URL('http://assets.epicsevendb.com/hero/') ;
		var newURL = url + this.generateHeroName()[i] + "/icon.png" ;
		return newURL;
	}

	//this will toggle the click based on the index of the clicked icon  
	handleClick(event, value, holder) {
		if(this.state.click.includes(value)){
			const list  = this.state.click.filter(item => item !== value);
			this.setState({click: list});
		} else{
			const list = this.state.click.concat(value);			
			this.setState({click: list});
		}
	}

	//this render the hero icon based on the list of hero names/url with API call
	renderHeroIcon(){ 
		const num = Array.from(Array(parseInt(2)).keys());
		const listItems = num.map((num) => {
				var clicked = this.state.click.includes(num) ? "" : "grayscale"; 
				return <div className="border p-1 w-10 box" value = {num} key ={num+1}  onClick={this.handleClick.bind(this, num, num)}>
						<img src = {this.generateURL(num)} className = {clicked} value = {num}/>
				</div>
			 	}
			);
		return listItems;
	}
		
	render(){
		return(
			<div className="d-flex flex-row justify-content-start">
				{this.renderHeroIcon()}
			</div>
		);
	}

}
