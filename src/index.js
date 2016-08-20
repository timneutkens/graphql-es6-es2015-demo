import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} from 'graphql'
import graphqlHTTP from 'express-graphql'
import express from 'express'

const data = require('./data.json')

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: GraphQLString }
      },
      // The resolve function describes how to "resolve" or fulfill
      // the incoming query.
      // In this case we use the `id` argument from above as a key
      // to get the User from `data`
      resolve: (_, { id }) => {
        return data[id]
      }
    }
  }
})

const schema = new GraphQLSchema({ query: queryType })

express()
  .use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))
  .listen(3000)

console.log('GraphQL server running go to http://localhost:3000/graphql to try GraphiQL')
