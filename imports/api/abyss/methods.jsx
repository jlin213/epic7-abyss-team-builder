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
			teams: {},
		});
	},
	'abyss.team.add'(floornum, hero1, hero2, hero3, hero4, guardian) {
		abyssDB.insert({
			team: {
				level: floornum,
				slot1: hero1, 
				slot2: hero2, 
				slot3: hero3, 
				slot4: hero4, 
				guardian: '',
            	upvotes:[],
            	downvotes:[],
            	score: 0, 
				}
			}	

		)
    } 
    
});
