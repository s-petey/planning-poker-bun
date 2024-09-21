import type { App } from 'planning-poker-api';
import { env } from '$env/dynamic/public';
import { treaty } from '@elysiajs/eden';

// place files you want to import through the `$lib` alias in this folder.
let combinedUrl = env.VITE_FULL_API_URL;

if (
	typeof combinedUrl !== 'string' ||
	(typeof combinedUrl === 'string' && combinedUrl.length === 0)
) {
	const url = env.VITE_API_REF_URL;
	const port = env.VITE_API_PORT;
	combinedUrl = `http://${url}:${port}`;
}

export const app = treaty<App>(combinedUrl);
