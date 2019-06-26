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
		try {
			abyssDB.update( 
				{team: {}}, 
				{
					$setOnInsert: 	{
						team: {
							level: floornum,
							slot1: hero1, 
							slot2: hero2, 
							slot3: hero3, 
							slot4: hero4, 
							guardian: guardian,
			            	upvotes:[],
			            	downvotes:[],
			            	score: 0, 
					}

					}
				}
				,{upsert: true}
			)
		}catch(e){
			throw new Meteor.Error("duplicate-error");
		}
		abyssDB.rawCollection().createIndex({
			"team.slot1" : 1,
			"team.slot2" : 1,
			"team.slot3" : 1,
			"team.slot4" : 1,
			}, 
			{unique: true}
		); 
    } 

    
});
