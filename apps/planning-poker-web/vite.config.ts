import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		server: {
			proxy: {
				'/socket': {
					target: `ws://${process.env.VITE_API_REF_URL}:${process.env.VITE_API_PORT}`,
					ws: true
				},

				'/api': `http://${process.env.VITE_API_REF_URL}:${process.env.VITE_API_PORT}`
			}
		},
		plugins: [sveltekit()]
	};
});
