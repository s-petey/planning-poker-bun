import { edenTreaty } from '@elysiajs/eden';
import type { App } from 'planning-poker-api';
import env from '$env/static/public';

// place files you want to import through the `$lib` alias in this folder.
let combinedUrl = env?.VITE_FULL_API_URL;

if (combinedUrl === undefined) {
	const url = env?.VITE_API_REF_URL;
	const port = env?.VITE_API_PORT;
	combinedUrl = `http://${url}:${port}`;
}

export const app = edenTreaty<App>(combinedUrl);
