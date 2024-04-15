import React from "react";
import ContentLoader from "react-content-loader";

export const CardLoader = () => {

	return (
		<ContentLoader
			speed={2}
			width={2000}
			height={600}
			viewBox="0 0 2000 600"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="0" y="0" rx="3" ry="3" width="2000" height="60" />
			<rect x="0" y="70" rx="3" ry="3" width="2000" height="60" />
			<rect x="0" y="140" rx="3" ry="3" width="2000" height="60" />
			<rect x="0" y="210" rx="3" ry="3" width="2000" height="60" />
			<rect x="0" y="280" rx="3" ry="3" width="2000" height="60" />
		</ContentLoader>
	);
};