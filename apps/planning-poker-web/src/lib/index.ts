import { edenTreaty } from '@elysiajs/eden';
import type { App } from 'planning-poker-api';

// place files you want to import through the `$lib` alias in this folder.

// TODO: Handle env or something for url.
export const app = edenTreaty<App>('http://localhost:5173');