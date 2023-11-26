import {
	Mount
} from "@/utils/module"
import {
	Suspense
} from "react";

export default function Template({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<Suspense>
		<Mount.Div
			animate={{
				opacity: 1,
				transition: {
					duration: 0.2,
					delay: 0.1
				}
			}}
			initial={{
				opacity: 0,
			}}
			// exit={{
			// 	opacity: 0,
			// 	transition: {
			// 		duration: 0.5,
			// 		delay: 0.1
			// 	}
			// }}
		>
			{children}
		</Mount.Div>
		</Suspense>
	);
}