import { Image } from '@mantine/core';

type externalImageBlock = {
	type: "external";
	external: {
		url: string;
	};
};

type fileImageBlock = {
	type: "file";
	file: {
		url: string;
		expiry_time: string;
	};
};

type image = externalImageBlock | fileImageBlock;


export default function handle_image({
	image,
}: {
	image: image
}) {


	if (image.type === "external") {
		return (
			<Image
				src={image.external.url}
				alt="Notion Image"
			/>
		);
	}


	if (image.type === "file") {
		return (
			<Image
				src={image.file.url}
				alt="Notion Image"
			/>
		);
	}

	return null;
}