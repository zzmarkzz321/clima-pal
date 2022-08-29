import React from "react";
import "monday-ui-react-core/dist/main.css";
import styled from "styled-components";
import { ChallengeSection } from "./Components";

const AppWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;

	margin: 0;
	font-family: "Roboto", sans-serif;
`;

const Canvas = styled.canvas`
	position: absolute;
	pointer-events: none;
`;

export default () => {
	return (
		<AppWrapper>
			<ChallengeSection />
			<Canvas id="confetti-holder" />
		</AppWrapper>
	);
};
