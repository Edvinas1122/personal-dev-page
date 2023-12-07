import {
	Octokit
} from "octokit";

function reduceDrama({
	values
}: {
	values: {[key:string]: number}
}) {
    // Halve the values
    const reducedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, Math.round(value / 1.6)])
    );

    // Calculate the total amount after halving and rounding
    const totalAmount = Object.values(reducedValues).reduce((sum, value) => sum + value, 0);

    // Calculate the missing amount to reach 100
    const missingAmount = 100 - totalAmount;

    // Distribute the missing amount evenly and round
    const averageToAdd = missingAmount / Object.keys(reducedValues).length;
    let updatedValues = Object.fromEntries(
        Object.entries(reducedValues).map(([key, value]) => [key, Math.round(value + averageToAdd)])
    );

    // Correct for any rounding errors to ensure the total is exactly 100
    const correctedTotal = Object.values(updatedValues).reduce((sum, value) => sum + value, 0);
    if (correctedTotal !== 100) {
        const largestKey = Object.keys(updatedValues).reduce((a, b) => updatedValues[a] > updatedValues[b] ? a : b);
        updatedValues[largestKey] += 100 - correctedTotal;
    }

    return updatedValues;
}

function makeMeMoreATechnician({
    values
}: {
    values: { [key: string]: number } & {
        "C++"?: number,
        "HTML"?: number,
        "CSS"?: number
    }
}) {
    const newValues = { ...values };
    if (newValues["C++"] !== undefined && newValues["HTML"] !== undefined && newValues["CSS"] !== undefined) {
        newValues["C++"] += newValues["HTML"] + newValues["CSS"];
    }
    delete newValues["HTML"];
    delete newValues["CSS"];

    return newValues;
}

export async function getGitHubStats({
	user_name
}: {
	user_name: string
}) {
	"use server";
	const octokit = new Octokit({
		auth: process.env.GITHUB_INTEGRATION_TOKEN
	});
	octokit.request.defaults({
		next: {revalidate: 36000}
	})
	const all_repos = await octokit
		.request(`GET /users/${user_name}/repos`, {
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			}
		});
	const not_forked_repos = all_repos.data.filter((repo: any) => {
		return !repo.fork;
	});
	const languages_used = await Promise.all(
		not_forked_repos.map(async (repo: any) => {
			const repo_languages = await octokit.rest.repos.listLanguages({
				owner: repo.owner.login,
				repo: repo.name
			});
			return repo_languages.data;
		})
	);
	type Languages = {[lang: string]: number};
	const languages: Languages = languages_used.reduce((acc: any, curr: any) => {
		for (const [key, value] of Object.entries(curr)) {
			if (acc[key]) {
				acc[key] += value;
			} else {
				acc[key] = value;
			}
		}
		return acc;
	}, {});
	const totalBytes = Object.values(languages)
		.reduce((total, current) => total + current, 0);
	const languagePercentages: Languages = Object.entries(languages)
		.map(([language, bytes]): [string, number] => [language, Math.round((bytes / totalBytes) * 100)])
		.sort((a, b) => (b as [string, number])[1] - (a as [string, number])[1]) // Type assertion
		.reduce((obj: Languages, [language, percentage]) => {
			obj[language] = percentage;
			return obj;
		}, {});
	return {
		repos: not_forked_repos.length,
		language_info: makeMeMoreATechnician({
			values: reduceDrama({values: languagePercentages})
		}),
	}
}