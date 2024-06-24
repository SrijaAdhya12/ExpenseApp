import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	const navigate = useNavigate();
	return (
		<div className="error">
			<h1>Uh oh! We've got a problem</h1>
			<p>{error.message || error.statusText}</p>
			<div className="flex-md">
				<button className="btn btn--dark" onDoubleClick={() => navigate(-1)}>
					<ArrowUturnLeftIcon width={20} />
					<span>Go Back</span>
				</button>
				<Link to="/" className="btn btn--dark">
					<HomeIcon width={20} />
					<span>Go Home</span>
				</Link>
			</div>
		</div>
	);
};

export default Error;
