import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	return {
		server:
			mode === 'development'
				? {
						proxy: {
							'/socket': {
								target: 'ws://127.0.0.1:3000',
								// '/api': `http://${process.env.VITE_API_URL}:${process.env.VITE_API_PORT}`
								ws: true
							},

							'/api': 'http://127.0.0.1:3000'
						}
				  }
				: {},
		plugins: [sveltekit()]
	};
});
