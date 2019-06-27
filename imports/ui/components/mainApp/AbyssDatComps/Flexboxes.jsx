import React, { Component } 			from 'react';
import { heroDB } 						from "../../../../api/heroes/heroDB.jsx";
import { withTracker } 					from 'meteor/react-meteor-data';

class FlexBoxes extends Component{
	constructor(props){
		super(props);
		this.state = {
			click: [],
			clickAsIDs: [],
			toggledFrom: false,
			toggledContains: false,
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
				// console.log(this.state.clickAsIDs);
				this.props.handleDatState('filter', this.state.clickAsIDs);
			});
		} else{
			const list = this.state.click.concat(value);	
			const list1 = this.state.clickAsIDs.concat(this.props.heroes[value].name);		
			this.setState({click: list, clickAsIDs: list1}, function(){
				// console.log(this.state.clickAsIDs);
				this.props.handleDatState('filter', this.state.clickAsIDs);
			});
		}
		if (!this.state.toggledFrom) {
			this.setState({ toggledContains: true });
			this.props.handleDatState('useFilterContains', true);
		}
	}

	//this renders the hero icon based on the list of hero names/url with API call
	renderHeroIcon(){ 
		const num = Array.from(Array(parseInt(this.props.heroes.length)).keys());
		const listItems = num.map((num) => {
			var clicked = this.state.click.includes(num) ? "" : "grayscale"; 
			return <div className="filter-icon border w-10 box" 
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
			switch(e.target.value){
				case "contains":
					this.setState({toggledFrom:false});
					this.props.handleDatState('useFilterFrom', false);
					break;
				case "from":
					this.setState({toggledContains:false});
					this.props.handleDatState('useFilterContains', false);
					break;
			}
		} else {
			this.setState({click:[]});
			this.setState({clickAsIDs:[]});
			this.props.handleDatState('filter', []);
		}
		switch(e.target.value){
			case "contains":
				this.setState({toggledContains:e.target.checked});
				this.props.handleDatState('useFilterContains', e.target.checked);
				break;
			case "from":
				this.setState({toggledFrom:e.target.checked});
				this.props.handleDatState('useFilterFrom', e.target.checked);
				break;
		}
	}
	render(){
		return(
			<div className=" card m-2">
				<div className="d-flex justify-content-around card-header d-flex p-2">
					<span className="text-center">Filter 
					Teams:</span> 
					<div className="text-center">
						Contains
						<label className="switch">
							<input type="checkbox" 
								value="contains" 
								onChange={this.toggleFilter.bind(this)} 
								checked={this.state.toggledContains}/>
							<span className="slider round"></span>
						</label>
					</div>
					<div className="text-center">
						Comprise
						<label className="switch">
							<input type="checkbox" 
								value="from" 
								onChange={this.toggleFilter.bind(this)} 
								checked={this.state.toggledFrom}/>
							<span className="slider round"></span>
						</label>
					</div>
				</div>
				<div className="hero-filter d-flex flex-wrap flex-row" hidden>
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


