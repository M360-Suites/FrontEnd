import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { fr } from "../assets/index";

const OnboardingLayout = () => {
	return (
		<div className='w-full'>
			<Outlet />
		</div>
	);
};

export default OnboardingLayout;
