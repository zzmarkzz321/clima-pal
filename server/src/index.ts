import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (_, res) => {
	res.send("hello world");
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

app.listen(3001, () => {
	console.log("listening on port 3001");
});
