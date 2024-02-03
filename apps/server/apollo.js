const { ApolloServer } = require("apollo-server-express");

const { resolvers, typeDefs } = require("./graphql");

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

module.exports = apolloServer;
