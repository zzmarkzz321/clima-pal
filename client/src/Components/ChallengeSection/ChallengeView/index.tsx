import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "monday-ui-react-core";
import ConfettiGenerator from "confetti-js";
import axios from "axios";

import { SERVER_URL } from "../../../constants";

const CompletedHeader = styled.h3`
	text-decoration: line-through;
	color: green;
	text-align: center;
	margin-top: 50px;
`;

type ChallengeViewProps = {
	isCompleted: boolean | null | undefined;
	challenge: string | null | undefined;
	userId: string | undefined;
	challengeId: string | undefined;
	onCompleteChallenge: VoidFunction;
};

const ChallengeViewContentWrapper = styled.div`
	// Calculated from the top nav being 50px;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const ChallengeView: FC<ChallengeViewProps> = ({
	isCompleted,
	challenge,
	userId,
	challengeId,
	onCompleteChallenge,
}) => {
	const [loading, setLoading] = useState(false);
	const [localCompleteState, setLocalCompleteState] = useState(false);

	const completeChallenge = () => {
		setLoading(true);
		const confetti = new ConfettiGenerator({
			width: "600",
			height: "250",
			start_from_edge: true,
		});
		new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => {
				return axios.post(
					`${SERVER_URL}/accomplishments/challenge/${challengeId}/user/${userId}`
				);
			})
			.then(() => {
				confetti.render();
				setLoading(false);
				setLocalCompleteState(true);
				// Give time for celebration animation before display completed UI
				return new Promise((resolve) => setTimeout(resolve, 3000));
			})
			.then(() => {
				onCompleteChallenge();
				confetti.clear();
			});
	};

	if (isCompleted) {
		return (
			<ChallengeViewContentWrapper>
				<CompletedHeader>{challenge}</CompletedHeader>
			</ChallengeViewContentWrapper>
		);
	}

	return (
		<ChallengeViewContentWrapper>
			<h3 style={{ textAlign: "center", marginTop: "50px" }}>
				{challenge}
			</h3>

			<Button
				loading={loading}
				success={localCompleteState}
				successText="Woo!"
				onClick={completeChallenge}
			>
				<span style={{ color: "white" }}>Complete challenge</span>
			</Button>
		</ChallengeViewContentWrapper>
	);
};
