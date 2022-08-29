import React from "react";
import { Loader } from "monday-ui-react-core";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 50px;
`;

export const Spinner = () => {
	return (
		<SpinnerWrapper>
			<Loader size={30} />
		</SpinnerWrapper>
	);
};
