import React from "react";

import { useDailyChallengeCountdown } from "../../hooks";

export const Countdown = () => {
	const { h, m, s } = useDailyChallengeCountdown();
	return (
		<p style={{ color: "#51994c" }}>
			Challenge resets in {`${h} hours ${m} minutes and ${s} seconds`}
		</p>
	);
};
