import React, { FC, useEffect, useState } from "react";
import { Spinner } from "../../../Components";
import mondaySdk from "monday-sdk-js";

type UserViewProps = {
	monday: ReturnType<typeof mondaySdk>;
};

const userAccomplishmentsTotal = 1;

export const UserView: FC<UserViewProps> = ({ monday }) => {
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState(null);

	// TODO
	// Grab accomplishments TOTAL from user record

	useEffect(() => {
		monday
			.api(`query { me { name } }`)
			.then((res) => {
				setName((res?.data as any)?.me?.name);
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
			});
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<p>
				Hey,{" "}
				<span style={{ color: "#51994c" }}>{name || "Friend"}</span>!
			</p>
			<p style={{ fontStyle: "italic" }}>
				Did you know that the average American produces around 21.8 tons
				of CO2 emission each year?
			</p>
			<p>You Completed: {userAccomplishmentsTotal} challenges</p>
		</>
	);
};
