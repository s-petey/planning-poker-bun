import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
	return {
		server:
			mode === 'development'
				? {
						proxy: {
							'/api': 'http://0.0.0.0:3000' // `http://localhost:3000`
							// '/api': `http://${process.env.VITE_API_URL}:${process.env.VITE_API_PORT}`
						}
						// proxy: {
						// 	'/api': `http://0.0.0.0:4040`
						// }
				  }
				: {},
		plugins: [sveltekit()],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	};
});
