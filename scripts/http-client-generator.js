import { generate } from 'openapi-typescript-codegen';

const OPEN_API_URL = 'http://sky-web.site:3031/api-docs-json';

const getApiDoc = async () => {
	await generate({
		input: OPEN_API_URL,
		output: 'src/http-client/',
		useOptions: true,
		base: 'http://sky-web.site:3031/api',
	});
};

getApiDoc().then(() => console.log('Finished'));
