import axios from "axios";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";

export type ChallengeData = {
	challenge: string;
	isCompleted: boolean;
} | null;

/**
 * Before fetching any data, check if the user exists through GET /users
 * If none exist, create one (done in the same service in the api)
 *
 * (Combine into one endpoint - /users/:mondayUserId/challenge): The initial fetch we do for challenge data should be composed of:
 * 1. The daily challenge
 * 2. Did the user complete the challenge? Fetch accomplishments by mondayUserId
 */
export const useDailyChallenge = (
	queryMondayUserId: () => Promise<{ data: object }>,
	onCompleteFetch: VoidFunction,
	onError: VoidFunction
) => {
	const [dailyChallengeData, setDailyChallengeData] =
		useState<ChallengeData>(null);
	async function fetchDailyChallenge() {
		const mondayUserId = ((await queryMondayUserId())?.data as any)?.me?.id;

		if (!mondayUserId) {
			onError();
			// Return early and display an error saying something broke
			return Promise.resolve({});
		}

		let { user } = (
			await axios.get(
				`${SERVER_URL}/users/monday-user-id/${mondayUserId}`
			)
		).data;

		console.log("getuser", { user });

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
		fetchDailyChallenge()
			.then(onCompleteFetch)
			// TODO We should log these errors
			.catch(onError);
		// Dependencies are expected to remain stable and we only want this invoked on mount.
		// eslint-disable-next-line
	}, []);

	return { dailyChallengeData };
};
