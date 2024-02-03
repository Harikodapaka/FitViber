const { Schema, model } = require("mongoose");

module.exports.User = model(
	"User",
	Schema(
		{
			name: String,
			username: String,
			email: String,
		},
		{ timestamps: true }
	)
);
