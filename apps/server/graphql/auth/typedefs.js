const { gql } = require("apollo-server-express");

const authTypeDefs = gql`
	extend type Mutation {
		authorizeGoogleUser(token: String): successInfo
	}
	type successInfo {
		message: String
		success: Boolean
	}
`;
module.exports = { authTypeDefs };
