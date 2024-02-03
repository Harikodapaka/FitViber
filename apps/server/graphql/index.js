const { gql } = require("apollo-server-express");
const { authTypeDefs } = require("./auth/typedefs");
const authResolvers = require("./auth/resolvers");
const userResolvers = require("./user/resolvers");
const { userTypeDefs } = require("./user/typedefs");

const typeDefs = gql`
	type Query {
		_: String
	}
	type Mutation {
		_: String
	}
`;
module.exports = {
	typeDefs: [typeDefs, authTypeDefs, userTypeDefs],
	resolvers: [authResolvers, userResolvers],
};
