import heroDB from "./heroDB";

heroDB.insert({
	name: "Luna"
});

export default {
	Query: {
		hero(){
			return heroDB.find({}).fetch();
		}
	}
};