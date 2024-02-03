const express = require("express");
const cors = require("cors");
const app = express();

const whitelist = ["http://localhost:9091"];
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

app.use(express.json());
app.use(cors());

module.exports = app;
