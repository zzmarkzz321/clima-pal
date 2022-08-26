import React, { ReactNode } from "react";
import { Box } from "monday-ui-react-core";
import styled from "styled-components";

type SectionWrapperProps = {
	children: ReactNode;
};

const ContentWrapper = styled.div`
	max-width: 600px;
`;

const Content = styled.div``;

export const SectionWrapper = ({ children }: SectionWrapperProps) => {
	return (
		<ContentWrapper>
			<Box
				border={Box.borders.DEFAULT}
				rounded={Box.roundeds.SMALL}
				padding={Box.paddings.SMALL}
				backgroundColor={Box.backgroundColors.PRIMARY_BACKGROUND_COLOR}
			>
				<Content>{children}</Content>
			</Box>
		</ContentWrapper>
	);
};
