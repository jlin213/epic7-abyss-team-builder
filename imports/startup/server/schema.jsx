import gql from "graphql-tag";
// import merge from "lodash/merge";
import heroResolver from "./resolvers";
import Hero from "./hero.graphql";
const { makeExecutableSchema } = require('apollo-server');

const testSchema = `
type Query{
	hero: [Hero]
}
`
const typeDefs = [Hero, testSchema];

// const resolvers = {
// 	Query: {
// 		hello(){
// 			return "Hello" ;
// 		}
// 	}
// }

const resolvers = heroResolver; 

const schema = makeExecutableSchema({
  typeDefs, 
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })

});

export default schema;
