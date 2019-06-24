import { check } 								from 'meteor/check';
import { Meteor } 								from 'meteor/meteor';
import { abyssDB } 								from './abyssDB.jsx';


Meteor.methods ({
	'abyss.add'(level){
		if (!this.userId) {	
			throw new Meteor.Error('insert not-authorized, Please log in first.');	
		}
		check(level, Number);

		abyssDB.insert({
			level: level,
			teams: [],
		});
	},
	'abyss.team.add'(level, team){
		if (!this.userId) {	
			throw new Meteor.Error('insert not-authorized, Please log in first.');	
		}
		check(level, Number);
		abyssDB.update({
			teams: team,
		});
	},

});
