import React, { Component } 			from 'react';
import { heroDB } 						from "../../../../api/heroes/heroDB.jsx";
import { withTracker } 					from 'meteor/react-meteor-data';

class FlexBoxes extends Component{
	constructor(props){
		super(props);
		this.state = {
			click: [],
			clickAsIDs: [],
			toggledContains: false,
			toggledComprise: false,
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
		if (!this.state.toggledComprise) {
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
					this.setState({toggledComprise:false});
					this.props.handleDatState('useFilterComprise', false);
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
				this.setState({toggledComprise:e.target.checked});
				this.props.handleDatState('useFilterComrpise', e.target.checked);
				break;
		}
	}
	render(){
		let $containsMsg = "";
		if (this.state.toggledContains){
			$containsMsg = (<div className="alert alert-info m-0" role="alert"> 
				Show teams that contain selected heroes.
			</div>)
		}
		let $compriseMsg = "";
		if (this.state.toggledComprise){
			$compriseMsg = (<div className="alert alert-info m-0" role="alert"> 
				Show teams comprised of select heroes <span className="font-italic">(select at least 4)</span>
			</div>)
		}
		if(this.state.click.length == 0 && this.state.toggledContains == true){
			this.setState({toggledContains: false})
		}
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
								checked={this.state.toggledComprise}/>
							<span className="slider round"></span>
						</label>
					</div>
				</div>
				{$compriseMsg}
				{$containsMsg}
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


