import React from "react";
import { fetchData } from "../Helpers";
import { Outlet, useLoaderData } from "react-router-dom";
import wave from "../assets/wave.svg";
import N from "../components/N";

export const mainLoader = () => {
	const userName = fetchData("userName");
	return { userName };
};

const Main = () => {
	const { userName } = useLoaderData();
	return (
		<div className="layout">
			<N userName={userName} />
			<main>
				<Outlet />
			</main>
			<img src={wave} />
		</div>
	);
};

export default Main;
