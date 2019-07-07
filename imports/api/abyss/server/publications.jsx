import { Meteor } from 'meteor/meteor';
import { abyssDB } from '../abyssDB.jsx';
import { abyssCommentsDB } from '../abyssDB.jsx';

if (Meteor.isServer) {
	// This code only runs on the server 
	
	Meteor.publish('abyss.all', function() {
		return abyssDB.find();
	});

	Meteor.publish('abyss.comments.teamID', function(teamID) {
		return abyssCommentsDB.find({ teamID:teamID });
	});

	Meteor.publish('userCount', function() {
		return Meteor.users.find({});
	});

	Meteor.publish('abyss.commentsCount', function(){
		return abyssCommentsDB.find({});
	});
}