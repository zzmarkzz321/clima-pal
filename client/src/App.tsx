import React from "react";
import "monday-ui-react-core/dist/main.css";
import styled from "styled-components";
import { ChallengeSection } from "./Components/ChallengeSection";

const AppWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;

	margin: 0;
	font-family: "Roboto", sans-serif;
`;

export default () => {
	return (
		<AppWrapper>
			<ChallengeSection />
		</AppWrapper>
	);
};
