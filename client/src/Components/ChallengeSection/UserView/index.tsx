import React, { FC, useEffect, useState } from "react";
import { Skeleton } from "monday-ui-react-core";
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
				setTimeout(() => {
					setLoading(false);
				}, 500);
			})
			.catch((e) => {
				console.log(e);
			});
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return (
			<div>
				<div style={{ marginTop: "20px" }}>
					<Skeleton
						type={Skeleton.types.TEXT}
						size={Skeleton.sizes.TEXT.MEDIUM}
						width={500}
					/>
				</div>
				<div style={{ marginTop: "30px" }}>
					<Skeleton
						type={Skeleton.types.TEXT}
						size={Skeleton.sizes.TEXT.MEDIUM}
						width={500}
					/>
				</div>
				<div style={{ marginTop: "30px" }}>
					<Skeleton
						type={Skeleton.types.TEXT}
						size={Skeleton.sizes.TEXT.MEDIUM}
						width={500}
					/>
				</div>

				{/* <div style={{ marginTop: "10px" }}>
					<div style={{ marginTop: "10px" }}>
						<Skeleton
							type={Skeleton.types.TEXT}
							size={Skeleton.sizes.TEXT.MEDIUM}
						/>
					</div>
					<div style={{ marginTop: "10px" }}>
						<Skeleton
							type={Skeleton.types.TEXT}
							size={Skeleton.sizes.TEXT.MEDIUM}
						/>
					</div>
					<div style={{ marginTop: "10px" }}>
						<Skeleton
							type={Skeleton.types.TEXT}
							size={Skeleton.sizes.TEXT.MEDIUM}
						/>
					</div>
				</div> */}
			</div>
		);
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
