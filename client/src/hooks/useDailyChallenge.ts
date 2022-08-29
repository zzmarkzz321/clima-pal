import axios from "axios";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../constants";

export type ChallengeData = {
	_id: string;
	challenge: string;
	userId: string;
	isCompleted: boolean;
} | null;

/**
 * Powers the fetching of all data for the application and state management
 * for the challenge.
 */
export const useDailyChallenge = (
	queryMondayUserId: () => Promise<{ data: object }>,
	onCompleteFetch: VoidFunction,
	onError: VoidFunction
) => {
	const [dailyChallengeData, setDailyChallengeData] =
		useState<ChallengeData>(null);

	// Provide consumers a way to update isCompleted to prevent additional calls.
	// Due to the simplicity of the app, we don't need to worry about the app getting into a stale state
	// For more complex features that get added on, this will need to chage.
	function onCompleteChallenge() {
		setDailyChallengeData(
			(prev) =>
				({
					...prev,
					isCompleted: true,
				} as ChallengeData)
		);
	}

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
			_id: dailyChallenge._id,
			challenge: dailyChallenge.name,
			userId: user._id,
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

	return { dailyChallengeData, onCompleteChallenge };
};
