import axios from "axios";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";

/**
 * Before fetching any data, check if the user exists through /users/:mondayUserId
 * If none exist, create one (done in the same service in the api)
 *
 * (Combine into one endpoint - /users/:mondayUserId/challenge): The initial fetch we do for challenge data should be composed of:
 * 1. The daily challenge
 * 2. Did the user complete the challenge? Fetch accomplishments by mondayUserId
 */
export const useDailyChallenge = () => {
	const [dailyChallege, setDailyChallenge] = useState(null);
	const [error, setError] = useState(null);

	async function fetchDailyChallenge() {
		const { dailyChallenge } = (
			await axios.get(`${SERVER_URL}/challenges/daily`)
		).data;
		setDailyChallenge(dailyChallenge);
	}

	useEffect(() => {
		fetchDailyChallenge().catch((error) => {
			setError(error);
		});
	});

	return { error, dailyChallege };
};
