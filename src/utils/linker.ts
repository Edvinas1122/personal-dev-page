function linker<T extends {title: string}>(prefix: string) {
	return (item: T) => (`/${prefix}/${item.title}`);
}

export {
	linker
};