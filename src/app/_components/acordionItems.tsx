// ""

// export function RetractableAccordion({
// 	skills,
// }: {
// 	skills: Skill[];
// }) {
// 	const { hovered, ref } = useHover();
// 	return (
// 		<>
// 			<div
// 				ref={ref}
// 				style={{
// 					position: 'relative',
// 					// background: 'black',
// 					height: rem(20),
// 					width: "100%"
// 				}}
// 			>
// 			<motion.ol
// 				variants={animation}
// 				initial="retracted"
// 				style={{
// 					listStyle: 'none',
// 					position: 'absolute',
// 					height: rem(20),
// 					top: rem(-20),
// 					marginTop: rem(10),
// 					marginBottom: rem(10),
// 				}}
// 				animate={hovered ? 'expanded' : 'retracted'}
				
// 			>
// 				{skills.map((skill) => {
// 					const calculate_expand_distance = (index: number) => {
// 						return index * 40;
// 					};
// 					return skills.map((project, index) => {
// 						const distance_to_expand = calculate_expand_distance(index);
// 						return (
// 							<motion.li
// 								style={{
// 									position: "absolute",
// 									left: `${index * 16}px`,
// 									zIndex: index + 10,
// 									top: 0,
// 								}}
// 								variants={{
// 									retracted: {
// 										left: `${index * 16}px`,
// 									},
// 									expanded: {
// 										opacity: 1,
// 										left: `${distance_to_expand}px`,
// 									},
// 								}}
// 								key={project.title}
// 							>
// 							<SkillItem
// 								{...{
// 									title: project.title,
// 									image: project.image,
// 									image_type: project.image_type,
// 									description: project.description,
// 									url: project.url,
// 									textColor: "dimmed",
// 									hideUndertitle: true,
// 									bordered: true,
// 								}}
// 								/>
// 							</motion.li>
// 						)
// 					})
// 				})}
// 			</motion.ol>
// 			</div>
// 		</>
// 	);
// }