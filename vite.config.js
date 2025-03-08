import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			// Configure the Svelte plugin to ignore warnings
			onwarn(warning, handler) {
				// Ignore specific warnings
				if (
					warning.code === 'css-unused-selector' ||
					warning.code === 'a11y-click-events-have-key-events' ||
					warning.code === 'a11y-no-noninteractive-element-interactions'
				) {
					return;
				}
				// Call the default handler for all other warnings
				handler(warning);
			}
		}),
		tailwindcss()
	]
});
