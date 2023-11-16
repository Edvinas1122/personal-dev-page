"use client";

import { TypeAnimation } from 'react-type-animation';

const text_as_code = `webSocketService.registerEventHandler(
	"client-ping",
	[&webSocketService, mainChannel](const String& message) {
		webSocketService.sendMessage("client-pong",
			mainChannel,
			"{\"message\":\"online\"}"
		);
	}
);`;

function TyperHeader({
	className,
	codeClassName,
}: {
	className?: string;
	codeClassName?: string;
}) {
	return (
		<>
		<div
			className={className}
			style={{
				position: "absolute",
				height: "100vh",
				width: "100vw",
				zIndex: 3,
				top: 0,
			}}
		></div>
		<TypeAnimation 
			className={codeClassName}
			sequence={[
				text_as_code,
				3000,
				"",
				1000,
				// 1000,
				// "Full stack developer",
				// 1000,
				// "Craft enthusiast",
				// 1000,
				// "Software development practitioner",
				// 1000,
			]}
			speed={{type: 'keyStrokeDelayInMs', value: 32}}
			omitDeletionAnimation={true}
			style={{
				zIndex: 2,
				width: "100%",
				height: "100%",
				whiteSpace: 'pre-line',
			}}
			wrapper="span"
			cursor={true}
			repeat={Infinity}
		/>
		<div
			style={{
				position: "absolute",
				height: "100vh",
				width: "100vw",
				zIndex: 1,
				top: 0,
				backgroundColor: "black",
			}}
		></div>
		</>
	)
}

export {TyperHeader};