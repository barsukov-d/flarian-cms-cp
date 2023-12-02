import { generate } from 'openapi-typescript-codegen';

const OPEN_API_URL = 'http://localhost:3031/api-docs-json';

const getApiDoc = async () => {
	await generate({
		input: OPEN_API_URL,
		output: 'src/http-client/',
		useOptions: true,
		base: 'http://localhost:3031/api',
	});
};

getApiDoc().then(() => console.log('Finished'));
