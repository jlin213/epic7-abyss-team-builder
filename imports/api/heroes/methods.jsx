import { check } 								from 'meteor/check';
import { Meteor } 								from 'meteor/meteor';
import { heroDB } 								from './heroDB.jsx';
import { HTTP } from 'meteor/http'; 



Meteor.methods ({
	'hero.add'( name, natStar, element){
		if (!this.userId) {	
			// throw new Meteor.Error('insert not-authorized, Please log in first.');	
		}
		check(name, String);
		check(natStar, Number);
		check(element, String);

		heroDB.upsert({name: name},
		{
			name: name,
			natStar: natStar,
			element: element,
		});
	},
    'getHeroInfo' : function() {  
        HTTP.call('GET', 'https://epicsevendb-apiserver.herokuapp.com/api/hero', {
          data: { some: 'json', stuff: 1 }
        }, (error, result) => {
            if (!error) {
                for( var x = 0 ; x < result.data.results.length ; x++ ){
                    if(result.data.results[x]._id != "nilgal"){
                        heroDB.upsert({name: result.data.results[x]._id},
                            {   
                            name: result.data.results[x]._id,
                            natStar: result.data.results[x].rarity,
                            element: result.data.results[x].element,    
                            },

                        );
                    }   
                }
            };
        })
    }

});


