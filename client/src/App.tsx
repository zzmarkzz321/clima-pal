import React from "react";
import "monday-ui-react-core/dist/main.css";
import { Example } from "./Components";
import styled from "styled-components";

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
			<Example />
		</AppWrapper>
	);
};
