import React, { Component } 			from 'react';
import { heroDB } 						from "../../../../api/heroes/heroDB.jsx";
import { withTracker } 					from 'meteor/react-meteor-data';

class FlexBoxes extends Component{
	constructor(props){
		super(props);
		this.state = {
			click: [],
			clickAsIDs: [],
			toggled: false,
		}; 
		this.handleClick = this.handleClick.bind(this);
	}
	//access db and get the list of heroes name for url
	generateHeroName(){
		return this.props.heroes.map((heroes) => {
			return heroes.name.toLowerCase();
		})
	}
	//this will toggle the click based on the index of the clicked icon  
	handleClick(event, value, holder) {
		if(this.state.click.includes(value)){
			const list  = this.state.click.filter(item => item !== value);
			const list1 = this.state.clickAsIDs.filter(item => item != this.props.heroes[value].name) 
			this.setState({click: list, clickAsIDs: list1}, function(){
				console.log(this.state.clickAsIDs);
			});
		} else{
			const list = this.state.click.concat(value);	
			const list1 = this.state.clickAsIDs.concat(this.props.heroes[value].name);		
			this.setState({click: list, clickAsIDs: list1}, function(){
				console.log(this.state.clickAsIDs);
			});
		}
		this.setState({ toggled:true });
		this.props.handleDatState('filter', this.state.clickAsIDs);
		this.props.handleDatState('useFilter', true);
	}

	//this renders the hero icon based on the list of hero names/url with API call
	renderHeroIcon(){ 
		const num = Array.from(Array(parseInt(this.props.heroes.length)).keys());
		const listItems = num.map((num) => {
			var clicked = this.state.click.includes(num) ? "" : "grayscale"; 
			return <div className="border p-1 w-10 box" 
							value={num} 
							key={num+1}  
							onClick={this.handleClick.bind(this, num, num)}>
					<img src={'http://assets.epicsevendb.com/hero/' + this.generateHeroName()[num] + "/icon.png"} 
						className={clicked} 
						value={num}/>
			</div>
			}
		);
		return listItems;
	}

	toggleFilter(e){
		if (e.target.checked){

		} else {
			this.setState({click:[]});
			this.setState({clickAsIDs:[]});
		}
		this.setState({toggled:e.target.checked});
		this.props.handleDatState('useFilter', e.target.checked);
	}
	render(){
		return(
			<div className="card m-2">
				<div className="card-header d-flex justify-content-end pb-1">
					Filter Heroes   
					<label className="switch">
						<input type="checkbox" onChange={this.toggleFilter.bind(this)} checked={this.state.toggled}/>
						<span className="slider round"></span>
					</label>
				</div>
				<div className="heroes d-flex flex-wrap flex-row">
					{this.renderHeroIcon()}
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('heroes.all');
 
	return {
		heroes: heroDB.find({},{sort: {natStar: -1, element: 1, name: 1 }}).fetch(),
	}
})(FlexBoxes);


