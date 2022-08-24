import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongo from "./utils/mongo";
import { ObjectId } from "mongodb";
import { generateDefaultDocFields } from "./utils/misc";

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
		res.send("Hello!");
	});

	app.get("challenges/daily", async (_, res) => {
		const db = mongo.load();
		const dailyChallenge = await db?.collection("challenges").findOne({
			active: true,
		});

		res.send({ dailyChallenge });
	});

	app.put("challenges/:challengeId", async (req, res) => {
		// Once 9am PST (use UTC) hits, update current challenge active field to false and selecting a new challenge by setting active to true
		// This endpoint does the mutation. Timing can be done via a morning job
		const { challengeId } = req.params;

		const db = mongo.load();
		await db?.collection("challenges").updateOne(
			{
				challengeId: new ObjectId(challengeId),
			},
			{
				$set: {
					active: false,
					completed: true,
					updatedAt: new Date(),
				},
			}
		);

		await db?.collection("challenges").updateOne(
			{
				completed: false,
			},
			{
				$set: {
					active: true,
				},
			}
		);
	});

	app.post(
		"/accomplishments/challenge/:challengeId/user/:userId",
		async (req, res) => {
			// Creating an accomplishment record for a user
			const { challengeId, userId } = req.params;

			const db = mongo.load();
			await db?.collection("accomplishments").insertOne({
				challengeId,
				userId,
				completedOn: new Date(),
				...generateDefaultDocFields(),
			});

			res.sendStatus(200);
		}
	);

	app.post("users", async (req, res) => {
		// Creating a user record for new players
		const { mondayUserId } = req.body;

		const db = mongo.load();
		await db?.collection("users").insertOne({
			mondayUserId,
			...generateDefaultDocFields(),
		});

		res.sendStatus(200);
	});

	app.listen(port, () => {
		console.log(`listening on port ${port}`);
	});
}

start();
