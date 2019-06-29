import { check } 								from 'meteor/check';
import { Meteor } 								from 'meteor/meteor';
import { abyssDB, abyssCommentsDB } 			from './abyssDB.jsx';

process.env.HTTP_FORWARDED_COUNT = 1;

Meteor.methods ({
	'abyss.team.add'(floornum, hero1, hero2, hero3, hero4, guardian) {
		if (!this.userId) {	
			throw new Meteor.Error('insert not-authorized, Please log in first.');	
		}
		try {
			abyssDB.update( 
				{team: {}}, 
				{
					$setOnInsert: 	{
						team: {
							createdby: Meteor.user().username,
							createdOn: new Date(),
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
	}, 
	'vote.team'(teamID, updown){
		let clientIPadr = this.connection.clientAddress;
		let tempTeamUps = abyssDB.find({_id:teamID}).fetch()[0].team.upvotes;
		let tempTeamDowns = abyssDB.find({_id:teamID}).fetch()[0].team.downvotes;
		switch(updown){
			case 'up':
				if (tempTeamUps.includes(clientIPadr)){
					abyssDB.update(teamID, {
						$pull: { 'team.upvotes' : clientIPadr},
						$inc: { 'team.score': -1 }
					});
				} else {
					abyssDB.update(teamID, {
						$push: { 'team.upvotes' : clientIPadr},
						$inc: { 'team.score': 1 }
					});
				}
				if (tempTeamDowns.includes(clientIPadr)){
					abyssDB.update(teamID, {
						$pull: { 'team.downvotes' : clientIPadr},
						$inc: { 'team.score': 1 }
					});
				} // no double voting
				break;
			case 'down':
				if (tempTeamDowns.includes(clientIPadr)){
					abyssDB.update(teamID, {
						$pull: { 'team.downvotes' : clientIPadr},
						$inc: { 'team.score': 1 }
					});
				} else {
					abyssDB.update(teamID, {
						$push: { 'team.downvotes' : clientIPadr},
						$inc: { 'team.score': -1 }
					});
				}
				if (tempTeamUps.includes(clientIPadr)){
					abyssDB.update(teamID, {
						$pull: { 'team.upvotes' : clientIPadr},
						$inc: { 'team.score': -1 }
					});
				} // no double voting
				break;
		}
	},
	'comment.add'(teamID, msg){
		if (!this.userId) {	
			throw new Meteor.Error('insert not-authorized, Please log in first.');	
		}
		check(msg, String);
		abyssCommentsDB.insert({
			createdBy: Meteor.userId(),
			createdByUsername: Meteor.user().username,
			dateCreated: new Date(),
			teamID: teamID,
			comment: msg,
			upvotes:[],
			downvotes:[],
			score: 0, 
		})
	},
	// ok this is lazy copy pasta but still . . . 
	'vote.comment'(commentID, updown){
		let clientIPadr = this.connection.clientAddress;
		let tempTeamUps = abyssCommentsDB.find({_id:commentID}).fetch()[0].upvotes;
		let tempTeamDowns = abyssCommentsDB.find({_id:commentID}).fetch()[0].downvotes;
		switch(updown){
			case 'up':
				if (tempTeamUps.includes(clientIPadr)){
					abyssCommentsDB.update(commentID, {
						$pull: { 'upvotes' : clientIPadr},
						$inc: { 'score': -1 }
					});
				} else {
					abyssCommentsDB.update(commentID, {
						$push: { 'upvotes' : clientIPadr},
						$inc: { 'score': 1 }
					});
				}
				if (tempTeamDowns.includes(clientIPadr)){
					abyssCommentsDB.update(commentID, {
						$pull: { 'downvotes' : clientIPadr},
						$inc: { 'score': 1 }
					});
				} // no double voting
				break;
			case 'down':
				if (tempTeamDowns.includes(clientIPadr)){
					abyssCommentsDB.update(commentID, {
						$pull: { 'downvotes' : clientIPadr},
						$inc: { 'score': 1 }
					});
				} else {
					abyssCommentsDB.update(commentID, {
						$push: { 'downvotes' : clientIPadr},
						$inc: { 'score': -1 }
					});
				}
				if (tempTeamUps.includes(clientIPadr)){
					abyssCommentsDB.update(commentID, {
						$pull: { 'upvotes' : clientIPadr},
						$inc: { 'score': -1 }
					});
				} // no double voting
				break;
		}
	},
	'getIp'(){
		return this.connection.clientAddress;
	}
});
