import React from "react";
import ContentLoader from "react-content-loader";


export const StudentListLoader = () => {
	return (
		<ContentLoader
			speed={2}
			width={300}
			height={200}
			viewBox="0 0 300 200"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="0" y="0" rx="3" ry="3" width="300" height="20" /> 
			<rect x="0" y="30" rx="3" ry="3" width="300" height="20" /> 
			<rect x="0" y="60" rx="3" ry="3" width="300" height="20" /> 
			<rect x="0" y="90" rx="3" ry="3" width="300" height="20" /> 
			<rect x="0" y="120" rx="3" ry="3" width="300" height="20" /> 
			<rect x="0" y="150" rx="3" ry="3" width="300" height="20" /> 
			<rect x="0" y="180" rx="3" ry="3" width="300" height="20" /> 
		</ContentLoader>
	);
};
