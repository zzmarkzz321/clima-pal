import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongo from "./utils/mongo";

const app = express();
const port = process.env.PORT || 3001;

async function start() {
	await mongo.connect();

	app.use(helmet());
	app.use(bodyParser.json());
	app.use(cors());
	app.use(morgan("combined"));

	// Test endpoint to check if things work
	app.get("/", async (_, res) => {
		const db = mongo.load();
		const allChallenges = await db
			?.collection("challenges")
			.find({})
			.toArray();
		res.send(JSON.stringify(allChallenges, null, 4));
	});

	// Records
	// Challenges (available challenges)
	// Users (Maps to a monday.com user)
	// Accomplishments (Tied to users to record which challenge they completed)

	app.put("challenges/:challengeId", () => {
		// Once 9am hits, update current challenge active field to false and selecting a new challenge by setting active to true
		// This endpoint does the mutation. Timing can be done via aws
	});

	app.post("/accomplishments/challenge/:challengeId/user/:userId", () => {
		// Creating an accomplishment record for a user
	});

	app.post("users", () => {
		// Creating a user record for new players
	});

	app.listen(port, () => {
		console.log(`listening on port ${port}`);
	});
}

start();
