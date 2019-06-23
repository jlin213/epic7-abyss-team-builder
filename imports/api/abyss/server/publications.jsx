import { Meteor } from 'meteor/meteor';
import { abyssDB } from '../abyssDB.jsx';


if (Meteor.isServer) {
	// This code only runs on the server 
	
	Meteor.publish('abyss.all', function() {
		return abyssDB.find();
	});
}