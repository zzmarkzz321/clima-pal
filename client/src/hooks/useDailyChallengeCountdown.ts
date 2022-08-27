import { useState, useEffect } from "react";

const RESET_HOUR = 9;

// TODO This should calcualte time until 9:00 am the next day
export const useDailyChallengeCountdown = () => {
	const currentDate = new Date();
	const [h, setH] = useState(RESET_HOUR - 1 - currentDate.getHours());
	const [m, setM] = useState(59 - currentDate.getMinutes());
	const [s, setS] = useState(59 - currentDate.getSeconds());

	useEffect(() => {
		const timer = window.setInterval(() => {
			if (s === 1 && m !== 0 && h !== 0) {
				setS(59);

				if (m === 1 && h !== 0) {
					setM(59);

					if (h !== 0) {
						setH(h - 1);
					}
				} else {
					setM(m - 1);
				}
			} else {
				setS(s - 1);
			}
		}, 1000);

		return () => {
			window.clearInterval(timer);
		};
	});

	return { h, m, s };
};
