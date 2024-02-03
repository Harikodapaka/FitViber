const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
	extend type Query {
		getUser(name: String): user
	}

	type user {
		name: String
		username: String
	}
`;
module.exports = { userTypeDefs };
