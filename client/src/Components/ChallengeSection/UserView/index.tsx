import React, { FC, useEffect, useState } from "react";
import { Spinner } from "../../../Components";
import mondaySdk from "monday-sdk-js";
import axios from "axios";
import { SERVER_URL } from "../../../constants";

type UserViewProps = {
	monday: ReturnType<typeof mondaySdk>;
	userId: string | undefined;
};

export const UserView: FC<UserViewProps> = ({ monday, userId }) => {
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState(null);
	const [totalAccomplishments, setTotalAccomplishments] = useState(null);

	useEffect(() => {
		// TODO clean this up.
		monday
			.api(`query { me { name } }`)
			.then((res) => {
				setName((res?.data as any)?.me?.name);
			})
			.then(() => {
				return axios.get(
					`${SERVER_URL}/accomplishments/user/${userId}/total`
				);
			})
			.then((res) => {
				setTotalAccomplishments(res.data.totalAccomplishments);
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
			<p>You Completed: {totalAccomplishments} challenges</p>
		</>
	);
};
