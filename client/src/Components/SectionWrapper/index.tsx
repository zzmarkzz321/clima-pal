import React, { ReactNode } from "react";
import styled from "styled-components";

type SectionWrapperProps = {
	children: ReactNode;
};

const ContentWrapper = styled.div`
	width: 600px;
`;

const Content = styled.div`
	height: 250px;
`;

const Box = styled.div`
	background-color: #1c1824;
	border: solid 1px black;
	border-radius: 5px;
	padding: 10px;

	color: white;
`;

export const SectionWrapper = ({ children }: SectionWrapperProps) => {
	return (
		<ContentWrapper>
			<Box>
				<Content>{children}</Content>
			</Box>
		</ContentWrapper>
	);
};
