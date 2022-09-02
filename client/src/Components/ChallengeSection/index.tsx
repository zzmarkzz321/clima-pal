import React, { useState } from "react";

import styled from "styled-components";
import PersonRound from "monday-ui-react-core/dist/icons/PersonRound";
import LearnMore from "monday-ui-react-core/dist/icons/LearnMore";
import Emoji from "monday-ui-react-core/dist/icons/Emoji";
import mondaySdk from "monday-sdk-js";

import { Countdown } from "../Countdown";
import { SectionWrapper } from "../../Components";

import { useDailyChallenge } from "../../hooks/useDailyChallenge";

import { LoadingView } from "./LoadingView";
import { ChallengeView } from "./ChallengeView";
import { UserView } from "./UserView";
import { FAQView } from "./FaqView";

const monday = mondaySdk();

const Group = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const IconGroup = styled(Group)`
	width: 100px;
`;

type ViewOptions = "Loading" | "Challenge" | "User" | "FAQ" | "Error";

const NavIcons = styled.span`
	cursor: pointer;
`;

export const ChallengeSection = () => {
	const [currentView, setCurrentView] = useState<ViewOptions>("Loading");
	const { dailyChallengeData, onCompleteChallenge } = useDailyChallenge(
		() => {
			return monday.api(`query { me { id } }`);
		},
		() => setCurrentView("Challenge"),
		() => setCurrentView("Error")
	);

	const renderView = () => {
		switch (currentView) {
			case "Loading":
				return <LoadingView />;
			case "Challenge":
				return (
					<ChallengeView
						isCompleted={dailyChallengeData?.isCompleted}
						challenge={dailyChallengeData?.challenge}
						userId={dailyChallengeData?.userId}
						challengeId={dailyChallengeData?._id}
						onCompleteChallenge={onCompleteChallenge}
					/>
				);
			case "User":
				// Limitation with ReturnType for overloaded functions
				return (
					<UserView
						monday={monday as any}
						userId={dailyChallengeData?.userId}
					/>
				);
			case "FAQ":
				return <FAQView />;
			case "Error":
				// TODO render maintenance mode ui
				return <div>error TODO</div>;
		}
	};

	return (
		<>
			<SectionWrapper>
				<Group>
					<Countdown />
					<IconGroup>
						<NavIcons>
							<Emoji
								onClick={() => setCurrentView("Challenge")}
							/>
						</NavIcons>
						<NavIcons>
							<PersonRound
								onClick={() => setCurrentView("User")}
							/>
						</NavIcons>
						<NavIcons>
							<LearnMore onClick={() => setCurrentView("FAQ")} />
						</NavIcons>
					</IconGroup>
				</Group>

				{renderView()}
			</SectionWrapper>
		</>
	);
};
