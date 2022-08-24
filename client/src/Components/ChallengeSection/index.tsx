import React, { FC, useEffect, useState } from "react";
import { Heading, Button, Flex, Divider, Skeleton } from "monday-ui-react-core";
import { SectionWrapper } from "../SectionWrapper";
import styled from "styled-components";
import PersonRound from "monday-ui-react-core/dist/icons/PersonRound";
import LearnMore from "monday-ui-react-core/dist/icons/LearnMore";
import Emoji from "monday-ui-react-core/dist/icons/Emoji";
import Completed from "monday-ui-react-core/dist/icons/Completed";
import mondaySdk from "monday-sdk-js";
import { useCountdown } from "../../hooks";
const monday = mondaySdk();

// TODO Implement
const fetchChallengeData = () => {
	return Promise.resolve({
		challenge: "Walk 5000 steps",
		isCompleted: false,
	});
};

const Group = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const IconGroup = styled(Group)`
	width: 100px;
`;

const CompletedHeader = styled.h2`
	text-decoration: line-through;
	color: green;
	opacity: 0.5;
	font-style: italic;
`;

const LoadingView: FC<{}> = () => {
	return <p> Loading </p>;
};

type ChallengeViewProps = {
	isCompleted: boolean;
	challenge: string;
	onCompleteChallenge: () => Promise<void>;
};
const ChallengeView: FC<ChallengeViewProps> = ({
	isCompleted,
	challenge,
	onCompleteChallenge,
}) => {
	const [loading, setLoading] = useState(false);

	const completeChallenge = () => {
		setLoading(true);
		new Promise((resolve) => setTimeout(resolve, 1000))
			.then(onCompleteChallenge)
			.then(() => {
				setLoading(false);
			});
	};

	return (
		<>
			{isCompleted ? (
				<Flex gap={Flex.gaps.MEDIUM}>
					<Completed color={"green"} />
					<CompletedHeader>{challenge}</CompletedHeader>
				</Flex>
			) : (
				<Heading type={Heading.types.h2} value={challenge} />
			)}

			<Button
				loading={loading}
				success={isCompleted}
				successText="Woo!"
				onClick={completeChallenge}
			>
				Complete challenge
			</Button>
		</>
	);
};

type UserViewProps = {};

const userAccomplishments = [
	{
		badge: (
			<span aria-label="a rocket blasting off" role="img">
				&#128512;
			</span>
		),
		challenge: {
			_id: "some-od",
			name: "Walk 5000 steps",
			completedOn: new Date(),
		},
	},
];

const UserView: FC<UserViewProps> = () => {
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState(null);

	useEffect(() => {
		// TODO
		// Grab accomplishments from user record
		monday
			.api(`query { me { name } }`)
			.then((res) => {
				setName((res?.data as any)?.me?.name);
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	if (loading) {
		return (
			<div>
				<div style={{ marginTop: "10px" }}>
					<Skeleton
						type={Skeleton.types.TEXT}
						size={Skeleton.sizes.TEXT.MEDIUM}
						width={400}
					/>
				</div>
				<div style={{ marginTop: "10px" }}>
					<Skeleton
						type={Skeleton.types.TEXT}
						size={Skeleton.sizes.TEXT.MEDIUM}
						width={400}
					/>
				</div>

				<div style={{ marginTop: "10px" }}>
					<div style={{ marginTop: "10px" }}>
						<Skeleton
							type={Skeleton.types.TEXT}
							size={Skeleton.sizes.TEXT.MEDIUM}
						/>
					</div>
					<div style={{ marginTop: "10px" }}>
						<Skeleton
							type={Skeleton.types.TEXT}
							size={Skeleton.sizes.TEXT.MEDIUM}
						/>
					</div>
					<div style={{ marginTop: "10px" }}>
						<Skeleton
							type={Skeleton.types.TEXT}
							size={Skeleton.sizes.TEXT.MEDIUM}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<p>{`Hey, ${name}. Complete challenges to collect badges!`}</p>
			<p>Total Challenges Completed: {userAccomplishments.length}</p>
			<Divider />
			<ul>
				{userAccomplishments.map(({ badge, challenge }, key) => (
					<li
						key={`user-${key}`}
					>{`${challenge.name} - ${challenge.completedOn}`}</li>
				))}
			</ul>
		</>
	);
};

type FAQViewProps = {};
const FAQView: FC<FAQViewProps> = () => {
	return <p> FAQ </p>;
};

const initialChallengeDataState = {
	challenge: "",
	isCompleted: false,
};

type ViewOptions = "Loading" | "Challenge" | "User" | "FAQ";

export const ChallengeSection = () => {
	const [currentView, setCurrentView] = useState<ViewOptions>("Loading");
	const [challengeData, setChallengeData] = useState(
		initialChallengeDataState
	);
	const { h, m, s } = useCountdown();

	useEffect(() => {
		// TODO
		// Grab users info from monday api and check if they are in the DB
		// If they aren't create a user record.
		fetchChallengeData().then((res) => {
			const { challenge, isCompleted } = res;
			setCurrentView("Challenge");
			setChallengeData({
				challenge,
				isCompleted,
			});
		});
	}, []);

	// TODO Implement
	const markChallengeComplete = () => {
		// TODO Make request to set challenge as completed
		return Promise.resolve({});
	};

	// TODO Implement
	const onCompleteChallenge = async () => {
		await markChallengeComplete();
		setChallengeData((prev) => ({ ...prev, isCompleted: true }));
	};

	const renderView = () => {
		switch (currentView) {
			case "Loading":
				return <LoadingView />;
			case "Challenge":
				return (
					<ChallengeView
						isCompleted={challengeData.isCompleted}
						challenge={challengeData.challenge}
						onCompleteChallenge={onCompleteChallenge}
					/>
				);
			case "User":
				return <UserView />;
			case "FAQ":
				return <FAQView />;
		}
	};

	return (
		<>
			<SectionWrapper>
				<Group>
					<p>
						Challenge resets in{" "}
						{`${h} hours ${m} minutes and ${s} seconds`}
					</p>

					<IconGroup>
						<Emoji onClick={() => setCurrentView("Challenge")} />
						<PersonRound onClick={() => setCurrentView("User")} />
						<LearnMore onClick={() => setCurrentView("FAQ")} />
					</IconGroup>
				</Group>

				<div>{renderView()}</div>
			</SectionWrapper>
		</>
	);
};
