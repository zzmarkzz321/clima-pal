import { useState, useEffect } from "react";

// TODO This should calcualte time until 9:00 am the next day
export const useCountdown = () => {
	const [h, setH] = useState(23);
	const [m, setM] = useState(59);
	const [s, setS] = useState(59);

	useEffect(() => {
		const timer = window.setInterval(() => {
			if (s === 1) {
				setS(59);

				if (m === 1) {
					setM(59);

					if (h === 0) {
						setH(23);
					} else {
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
