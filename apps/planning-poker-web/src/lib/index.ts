import { edenTreaty } from '@elysiajs/eden';
import type { App } from 'planning-poker-api';

// place files you want to import through the `$lib` alias in this folder.
let combinedUrl = process?.env?.VITE_FULL_API_URL ?? import.meta.env.VITE_FULL_API_URL;

if (combinedUrl === undefined) {
	const url = process?.env?.VITE_API_REF_URL ?? import.meta.env.VITE_API_REF_URL;
	const port = process?.env?.VITE_API_PORT ?? import.meta.env.VITE_API_PORT;
	combinedUrl = `http://${url}:${port}`;
}

export const app = edenTreaty<App>(combinedUrl);
