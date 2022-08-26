import axios from "axios";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";

/**
 * Before fetching any data, check if the user exists through GET /users
 * If none exist, create one (done in the same service in the api)
 *
 * (Combine into one endpoint - /users/:mondayUserId/challenge): The initial fetch we do for challenge data should be composed of:
 * 1. The daily challenge
 * 2. Did the user complete the challenge? Fetch accomplishments by mondayUserId
 */
export const useDailyChallenge = (
	queryMondayUserId: () => Promise<{ data: object }>
) => {
	const [dailyChallengeData, setDailyChallengeData] = useState<{
		challenge: string;
		isCompleted: boolean;
	} | null>(null);
	const [error, setError] = useState<any>(null);

	async function fetchDailyChallenge() {
		const mondayUserId = ((await queryMondayUserId())?.data as any)?.me?.id;

		if (!mondayUserId) {
			setError("unable to fetch mondayUserId");
			// Return early and display an error saying something broke
			return Promise.resolve({});
		}

		let { user } = (
			await axios.get(
				`${SERVER_URL}/users/monday-user-id/${mondayUserId}`
			)
		).data;

		// If the user doesn't exist in our system, create one.
		if (!user) {
			user = (
				await axios({
					method: "POST",
					url: `${SERVER_URL}/users`,
					data: {
						mondayUserId,
					},
				})
			).data.user;
		}

		const { dailyChallenge } = (
			await axios.get(`${SERVER_URL}/challenges/daily`)
		).data;

		const { accomplishment } = (
			await axios.get(
				`${SERVER_URL}/accomplishments/challenge/${dailyChallenge._id}/user/${user._id}`
			)
		).data;

		setDailyChallengeData({
			challenge: dailyChallenge.name,
			isCompleted: Boolean(accomplishment),
		});
	}

	useEffect(() => {
		fetchDailyChallenge().catch((error) => {
			setError(error);
		});
	}, []);

	return { error, dailyChallengeData };
};
