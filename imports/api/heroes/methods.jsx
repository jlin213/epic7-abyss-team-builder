import { check } 								from 'meteor/check';
import { Meteor } 								from 'meteor/meteor';
import { heroDB } 								from './heroDB.jsx';



Meteor.methods ({
	'Hero.add'( name, natStar, element){
		if (!this.userId) {	
			// throw new Meteor.Error('insert not-authorized, Please log in first.');	
		}
		check(name, String);
		check(natStar, Number);
		check(element, String);

		heroDB.insert({
			name: name,
			natStar: natStar,
			element: element,
		});
	},


});
