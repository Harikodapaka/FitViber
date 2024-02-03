const { OAuth2Client } = require("google-auth-library");

const clientId = "";
const client = new OAuth2Client(clientId);

//Model
const { User } = require("../user/models");

module.exports = {
	Mutation: {
		authorizeGoogleUser: async (_, { token }) => {
			const { payload } = await client.verifyIdToken({
				idToken: token,
				audience: clientId,
			});
			if (payload.email_verified) {
				const user = await User.findOne({
					email: payload.email,
				});
				if (!user) {
					const newUser = new User({
						name: payload.name,
						email: payload.email,
						username: payload.email,
					});
					await newUser.save();
					return {
						message: "Login Successfull",
						success: true,
					};
				} else {
					return {
						message: "Login Successfull",
						success: true,
					};
				}
			} else {
				return {
					message: "Login Unsuccessfull",
					success: false,
				};
			}
		},
	},
};
