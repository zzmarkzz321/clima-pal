require("dotenv").config();

import { Db, MongoClient } from "mongodb";
const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dm-af1";

type DBReturn = {
	load: () => Db | null | undefined;
	connect: () => void;
	getClient: () => MongoClient | null;
};

const DB: DBReturn = (function () {
	const databaseName = process.env.MONGODB_URI ? "Prod" : "Dev";
	const url: string = MONGODB_URI;
	let database: Db | null = null;
	let client: MongoClient | null = null;

	return {
		load: () => {
			if (database) {
				return database;
			}

			DB.connect();
		},
		connect: async () => {
			if (client) {
				throw "Connection has already been established";
			}

			console.info("Attempting to connect to mongodb");
			try {
				client = await MongoClient.connect(MONGODB_URI, {
					serverSelectionTimeoutMS: 60000,
				});
				console.info("Connected to MongoDB Instance at %s", url);

				database = client.db(databaseName);

				return DB.load();
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
		getClient: () => client,
	};
})();

export default DB;
