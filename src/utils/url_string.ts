
/*
	handle url bar string
*/
export function url_string(
	url: string
): string {
	return url.replace(/%20/g, " ");
}

export function to_url_string(
	url: string
): string {
	return url.replace(/ /g, "%20");
}