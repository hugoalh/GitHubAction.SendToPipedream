/*==================
[GitHub Action] Send To Pipedream
	Language:
		NodeJS/12.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	githubAction = {
		core: require("@actions/core"),
		github: require("@actions/github")
	},
	jsonFlatten = require("flat").flatten,
	pipedreamSDK = require("@pipedreamhq/sdk"),
	regexpEscape = require("escape-string-regexp");
(async () => {
	githubAction.core.info(`Import workflow argument. ([GitHub Action] Send To Pipedream)`);
	let payload = githubAction.core.getInput("payload"),
		sdkKey = githubAction.core.getInput("key"),
		variableSystem = {
			join: githubAction.core.getInput("variable_join"),
			prefix: githubAction.core.getInput("variable_prefix"),
			suffix: githubAction.core.getInput("variable_suffix")
		};
	githubAction.core.info(`Analysis workflow argument. ([GitHub Action] Send To Pipedream)`);
	if (advancedDetermine.isString(payload) !== true) {
		throw new TypeError(`Argument "payload" must be type of string (non-nullable)! ([GitHub Action] Send To Pipedream)`);
	};
	if (advancedDetermine.isStringSingleLine(sdkKey, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Argument "key" must be type of string (non-nullable)! ([GitHub Action] Send To Pipedream)`);
	};
	if (advancedDetermine.isStringSingleLine(variableSystem.join, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Argument "variable_join" must be type of string (non-nullable)! ([GitHub Action] Send To Pipedream)`);
	};
	if (advancedDetermine.isStringSingleLine(variableSystem.prefix, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Argument "variable_prefix" must be type of string (non-nullable)! ([GitHub Action] Send To Pipedream)`);
	};
	if (advancedDetermine.isStringSingleLine(variableSystem.suffix, { allowWhitespace: false }) !== true) {
		throw new TypeError(`Argument "variable_suffix" must be type of string (non-nullable)! ([GitHub Action] Send To Pipedream)`);
	};
	if (advancedDetermine.isJSON(payload) !== false) {
		githubAction.core.debug(`Payload (Stage DP): ${JSON.stringify(payload)} ([GitHub Action] Send To Pipedream)`);
	} else if (advancedDetermine.isStringifyJSON(payload) !== false) {
		githubAction.core.info(`Construct payload (stage MP). ([GitHub Action] Send To Pipedream)`);
		payload = JSON.parse(payload);
		githubAction.core.debug(`Payload (Stage MP): ${JSON.stringify(payload)} ([GitHub Action] Send To Pipedream)`);
	} else if (advancedDetermine.isStringSingleLine(payload) === true && payload.search(/\.\.\//gu) === -1 && payload.search(/\.(jsonc?)|(ya?ml)$/gu) !== -1) {
		payload = await require("./externalpayload.js")(payload);
	} else {
		throw new SyntaxError(`Argument "payload"'s value is not match the require pattern! ([GitHub Action] Send To Pipedream)`);
	};
	githubAction.core.info(`Import variable list. ([GitHub Action] Send To Pipedream)`);
	variableSystem.list = {
		external: githubAction.core.getInput(`variable_list_external`),
		payload: githubAction.github.context.payload
	};
	githubAction.core.info(`Analysis external variable list. ([GitHub Action] Send To Pipedream)`);
	if (advancedDetermine.isJSON(variableSystem.list.external) === false) {
		switch (advancedDetermine.isString(variableSystem.list.external)) {
			case false:
				throw new TypeError(`Argument "variable_list_external" must be type of object JSON! ([GitHub Action] Send To Pipedream)`);
			case null:
				githubAction.core.info(`External variable list is empty. ([GitHub Action] Send To Pipedream)`);
				variableSystem.list.external = {};
				break;
			case true:
				if (advancedDetermine.isStringifyJSON(variableSystem.list.external) === false) {
					throw new TypeError(`Argument "variable_list_external" must be type of object JSON! ([GitHub Action] Send To Pipedream)`);
				};
				variableSystem.list.external = JSON.parse(variableSystem.list.external);
				break;
			default:
				throw new Error();
		};
	};
	githubAction.core.info(`Tokenize variable list. ([GitHub Action] Send To Pipedream)`);
	variableSystem.list.external = jsonFlatten(
		variableSystem.list.external,
		{
			delimiter: variableSystem.join
		}
	);
	variableSystem.list.payload = jsonFlatten(
		variableSystem.list.payload,
		{
			delimiter: variableSystem.join
		}
	);
	githubAction.core.info(`Replace variable in the data. ([GitHub Action] Send To Pipedream)`);
	function variableReplace(variableKey, variableValue) {
		function indent(delta) {
			if (advancedDetermine.isString(delta) === true) {
				delta = delta.replace(variableKey, variableValue);
			} else if (advancedDetermine.isArray(delta) === true) {
				delta.forEach((element, index) => {
					delta[index] = indent(element);
				});
			} else if (advancedDetermine.isJSON(delta) === true) {
				Object.keys(delta).forEach((element) => {
					delta[element] = indent(delta[element]);
				});
			};
			return delta;
		};
		payload = indent(payload);
	};
	Object.keys(variableSystem.list.payload).forEach((keyPayload) => {
		variableReplace(
			new RegExp(
				regexpEscape(`${variableSystem.prefix}payload${variableSystem.join}${keyPayload}${variableSystem.suffix}`),
				"gu"
			),
			variableSystem.list.payload[keyPayload]
		);
	});
	Object.keys(variableSystem.list.external).forEach((keyExternal) => {
		variableReplace(
			new RegExp(
				regexpEscape(`${variableSystem.prefix}external${variableSystem.join}${keyExternal}${variableSystem.suffix}`),
				"gu"
			),
			variableSystem.list.external[keyExternal]
		);
	});
	githubAction.core.debug(`Network Request Payload: ${payload} ([GitHub Action] Send To Pipedream)`);
	githubAction.core.info(`Send network request to Pipedream. ([GitHub Action] Send To Pipedream)`);
	let response = await pipedreamSDK.sendEvent(sdkKey, payload);
	githubAction.core.info(`Receive network response from Pipedream. ([GitHub Action] Send To Pipedream)`);
	if (response.status !== 200) {
		githubAction.core.warning(`Receive status code ${response.status}! May cause error in the beyond. ([GitHub Action] Send To Pipedream)`);
	};
	let responseText = await response.text();
	if (response.ok === true) {
		githubAction.core.debug(`${response.status} ${responseText} ([GitHub Action] Send To Pipedream)`);
	} else {
		throw new Error(`${response.status} ${responseText} ([GitHub Action] Send To Pipedream)`);
	};
})().catch((error) => {
	githubAction.core.error(error);
	process.exit(1);
});
