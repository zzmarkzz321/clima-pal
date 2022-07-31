import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

type AppSolutionProps = { children?: ReactElement | null };

/**
 * Example of the monday sdk in action.
 */
export const AppSolution: FC<AppSolutionProps> = (props) => {
	const [settings, setSettings] = useState({});
	const [context, setContext] = useState({});
	const [name, setName] = useState({});

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
			{/* TODO super weird error */}
			<p>{name as ReactNode}</p>
		</div>
	);
};
