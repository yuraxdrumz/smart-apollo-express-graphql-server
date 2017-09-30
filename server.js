import Schema, { allResolvers } from './server/scheme.js'
import express from 'express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

const PORT = 3000;
const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: allResolvers
});
// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: executableSchema , rootValue:allResolvers}));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
app.listen(PORT,()=>console.log(`Apollo-express server listening on port ${PORT}`));
