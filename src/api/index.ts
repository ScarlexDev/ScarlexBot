import fetch from 'node-fetch';
import express from "express"; 
import  config from "../../config";
const app = express();

app.get('/', async ({ query }, response: any) => {
	const { code } = query;

	if (code) {
		try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: config.id,
					client_secret: config.clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${3001}`,
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData: any = await oauthResult.json();

			const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			console.log(await userResult.json());
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

	return response.sendFile('index.html', { root: './src/api' });
});

app.listen(3001, () => console.log(`App listening at http://localhost:${3001}`));
