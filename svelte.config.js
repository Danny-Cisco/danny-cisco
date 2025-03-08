import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},

	// preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx'],

	// Add this onwarn handler to ignore specific warnings
	compilerOptions: {
		onwarn: (warning, handler) => {
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
	}
};

export default config;
