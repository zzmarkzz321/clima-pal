import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button, Flex } from "monday-ui-react-core";
import Completed from "monday-ui-react-core/dist/icons/Completed";

const CompletedHeader = styled.h2`
	text-decoration: line-through;
	color: green;
`;

type ChallengeViewProps = {
	isCompleted: boolean | null | undefined;
	challenge: string | null | undefined;
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
}) => {
	// TODO need to manage challengeData state in the root to avoid extra HTTP calls
	const [loading, setLoading] = useState(false);
	const [localCompleteState, setLocalCompleteState] = useState(false);

	// TODO implement
	const completeChallenge = () => {
		setLoading(true);
		new Promise((resolve) => setTimeout(resolve, 1000))
			// .then(onCompleteChallenge)
			.then(() => {
				setLoading(false);
				setLocalCompleteState(true);
			});
	};

	return (
		<ChallengeViewContentWrapper>
			{isCompleted ? (
				<Flex gap={Flex.gaps.MEDIUM}>
					<Completed color={"green"} />
					<CompletedHeader>{challenge}</CompletedHeader>
				</Flex>
			) : (
				<h3 style={{ textAlign: "center", marginTop: "50px" }}>
					{challenge}
				</h3>
			)}

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
