import {
	ArchitecturePreviewGrid,
} from "./components/module";
import {
	animation
} from "./config"
import {
	Variants
} from "framer-motion"

export interface GenericCardRequisits {
	title: string;
	// variants: Variants;
}

/*
	To display selection grid, we need
	@param retrieveSelection is and async fetcher
	@reducer is an adapter to card's props
	@card is the component generated from list of processed params

	dependencies include:
		- framer motion animation variant consumers
*/
export default async function SelectionDisplay<
	OUTPUT extends GenericCardRequisits,
	INPUT>
({
	retrieveSelection,
	reducer,
	Card,
	linker,
}:{
	retrieveSelection: <OUTPUT>(
			reducer: (item: INPUT)=>OUTPUT
		) => Promise<OUTPUT[]>,
	reducer: (item: INPUT)=>OUTPUT,
	Card: React.ComponentType<OUTPUT & {
		variants: Variants,
		link: string
	}>,
	linker: (item: OUTPUT) => string;
}) {

	const tables = await retrieveSelection<OUTPUT>(
		reducer
	);

	const GridItems = tables.map((table_props: OUTPUT) => {
		if (!table_props.title) return;
		return <Card
					key={table_props.title}
					{...table_props}
					variants={animation.item}
					link={linker(table_props)}
				/>;
	});

	return (
		<>
			<ArchitecturePreviewGrid
				variant={animation.container}
			>
				<>
					{GridItems}
				</>
			</ArchitecturePreviewGrid>
		</>
	)
}
