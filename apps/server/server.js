const mongoose = require("mongoose");

const app = require("./app");
const apolloServer = require("./apollo");
const MONGO_LOCAL_URL = "";

async function startServer() {
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
}
startServer();
mongoose
	.connect(MONGO_LOCAL_URL)
	.then(() => console.log("MongoDB is running successfully!"))
	.catch((err) => console.log("MongoDB connection failed"));

const port = 9999;

app.listen(port, () => {
	console.log(`app is running on port ${port}`);
	console.log(`Graphql Endpoint is : ${apolloServer.graphqlPath}`);
});
