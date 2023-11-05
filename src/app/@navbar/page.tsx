import {
	HeaderSearch,
	HeaderSearchProps
} from "@/components/header/header";


export default function Navbar() {

	const sections = [
		"Main",
		"Projects",
		"Journal",
		"Contact",
	];

	return (
		<>
			<HeaderSearch
				sections={sections}
			/>
		</>
	);
}