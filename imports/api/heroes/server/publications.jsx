import { Meteor } from 'meteor/meteor';
import { heroDB } from '../heroDB.jsx';


if (Meteor.isServer) {
	// This code only runs on the server 
	
	Meteor.publish('heroes.all', function() {
		return heroDB.find();
	});
}