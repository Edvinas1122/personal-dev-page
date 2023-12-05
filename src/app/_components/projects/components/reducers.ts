import { url_string } from '@/utils/url_string';
import {
	ArticleCardProps,
} from './card';

function matchPathToArticleName(path: string) {
	const pathArray = path.split("/");
	const articleName = pathArray[pathArray.length - 1];
	if (!articleName) {
		return "projects";
	}
	return url_string(articleName);
}

/*
	Compares a all path segments to an article title
	if mathched it means or suggest we have the card selected

*/
function findIsActiveArticle(path: string, articles: ArticleCardProps[]): string | null {
	const paths = path.split("/").map((segment) => url_string(segment));
	const article = articles.find((article) => {
		return paths.includes(url_string(article.title));
	});
	if (!article) {
		return null;
	}
	return article.title;
}

function getArticleIndexFromPath(
	path: string,
	articles: ArticleCardProps[]
) {
	const articleName = matchPathToArticleName(path);
	const articleIndex = articles.findIndex(
		(article) => article.title === articleName
	);
	return articleIndex;
}

export {
	findIsActiveArticle
};