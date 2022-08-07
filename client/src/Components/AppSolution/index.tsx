import React, { FC, ReactElement, useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

type AppSolutionProps = { children?: ReactElement | null };

/**
 * Example of the monday sdk in action.
 */
export const AppSolution: FC<AppSolutionProps> = () => {
	const [settings, setSettings] = useState({});
	const [context, setContext] = useState({});
	const [name, setName] = useState(null);

	useEffect(() => {
		//   // TODO: set up event listeners
		monday.listen("settings", (res) => {
			setSettings(res.data);
		});
		monday.api(`query { me { name } }`).then((res) => {
			// TODO figure out how to derive types from query instead of casting
			setName((res.data as any).me.name);
		});
	});

	return (
		<div>
			<p>Hi, {name}</p>
		</div>
	);
};
