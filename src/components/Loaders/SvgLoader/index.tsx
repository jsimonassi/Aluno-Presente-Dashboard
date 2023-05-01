import React from "react";
import ContentLoader from "react-content-loader";

interface SvgLoaderProps {
    height?: number;
    width?: number;
}

const SvgLoader = (props: SvgLoaderProps) => (
	<ContentLoader 
		speed={2}
		width={400}
		height={200}
		viewBox="0 0 400 200"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="14" y="5" rx="16" ry="16" width={props.width ?? "351"} height={props.height ?? "167"} />
	</ContentLoader>
);

export default SvgLoader;

