const { User } = require("../user/models");

module.exports = {
	Query: {
		getUser: async (_, { name }) => {
			const user = await User.findOne({
				name: name,
			});
			if (user) {
				return user;
			}

			return null;
		},
	},
};
