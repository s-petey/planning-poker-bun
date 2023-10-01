import { edenTreaty } from '@elysiajs/eden';
import type { App } from 'planning-poker-api';
import { VITE_FULL_API_URL, VITE_API_PORT, VITE_API_REF_URL } from '$env/static/public';

// place files you want to import through the `$lib` alias in this folder.
let combinedUrl = VITE_FULL_API_URL;

if (
	typeof combinedUrl !== 'string' ||
	(typeof combinedUrl === 'string' && combinedUrl.length === 0)
) {
	const url = VITE_API_REF_URL;
	const port = VITE_API_PORT;
	combinedUrl = `http://${url}:${port}`;
}

export const app = edenTreaty<App>(combinedUrl);
