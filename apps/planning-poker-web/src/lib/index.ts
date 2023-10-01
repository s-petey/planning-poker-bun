import { edenTreaty } from '@elysiajs/eden';
import type { App } from 'planning-poker-api';

// place files you want to import through the `$lib` alias in this folder.
const url = import.meta.env.VITE_API_REF_URL;
const port = import.meta.env.VITE_API_PORT;

if (typeof url === 'undefined' && typeof url === 'undefined') {
	throw new Error('Invalid configuration');
}

const combinedUrl = `http://${url}:${port}`;
export const app = edenTreaty<App>(combinedUrl);
