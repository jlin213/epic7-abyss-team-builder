const { ApolloServer, gql } = require('apollo-server-express');
import schema from "./schema.jsx"

// The GraphQL schema

const server = new ApolloServer({schema});


server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
})

