import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', change: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event){
    this.setState({change: event.target.value});
    event.preventDefault();
  }

  handleSubmit(event) {
    this.setState({value: this.state.change});
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.change} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <p> You have entered {this.state.value} </p>
      </div>
      
    );

  }
}
export default Form; 