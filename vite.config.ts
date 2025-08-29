import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// все запросы к /api будут перенаправляться на WordPress REST API
			'/api': {
				target: 'http://localhost:8888/wordpress/wp-json',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
});
