/*==================
[GitHub Action] Send To Pipedream - External Payload
	Language:
		NodeJS/12.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	githubAction = {
		core: require("@actions/core"),
		github: require("@actions/github")
	};
async function externalPayload(payload) {
	githubAction.core.info(`Import workflow argument (stage XP). ([GitHub Action] Send To Pipedream)`);
	let githubToken = githubAction.core.getInput("github_token");
	githubAction.core.info(`Analysis workflow argument (stage XP). ([GitHub Action] Send To Pipedream)`);
	if (advancedDetermine.isString(githubToken) === false) {
		throw new TypeError(`Argument "github_token" must be type of string! ([GitHub Action] Send To Pipedream)`);
	};
	githubAction.core.info(`Send network request to GitHub. ([GitHub Action] Send To Pipedream)`);
	const octokit = githubAction.github.getOctokit(githubToken);
	let [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY.split("/");
	let data = await octokit.repos.getContent({
		owner: repositoryOwner,
		path: payload,
		repo: repositoryName
	});
	githubAction.core.info(`Receive network response from GitHub. ([GitHub Action] Send To Pipedream)`);
	if (data.status !== 200) {
		githubAction.core.warning(`Receive status code ${data.status}! May cause error in the beyond. ([GitHub Action] Send To Pipedream)`);
	};
	githubAction.core.info(`Analysis network response from GitHub. ([GitHub Action] Send To Pipedream)`);
	let content;
	switch (data.data.encoding) {
		case "base64":
			content = Buffer.from(data.data.content, "base64").toString();
			break;
		case "utf8":
		case "utf-8":
			content = data.data.content;
			break;
		default:
			throw new Error(`File is not exist, or using unsupported encoding! ([GitHub Action] Send To Pipedream)`);
	};
	githubAction.core.info(`Construct payload (stage XP). ([GitHub Action] Send To Pipedream)`);
	const dynamicRequire = require("./dynamicrequire.js");
	let result;
	if (payload.search(/\.json$/gu) !== -1) {
		result = JSON.parse(content);
	} else if (payload.search(/\.jsonc$/gu) !== -1) {
		const JSONC = dynamicRequire("jsonc");
		result = JSONC.parse(content);
	} else {
		const YAML = dynamicRequire("yaml");
		result = YAML.parse(content);
	};
	githubAction.core.debug(`Payload (stage XP): ${JSON.stringify(result)} ([GitHub Action] Send To Pipedream)`);
	return result;
};
module.exports = externalPayload;
