import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import svelteConfig from './svelte.config.js';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default [
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				svelteConfig
			}
		}
	},
	// Add this rules section to override problematic rules
	{
		rules: {
			// Turn off unused CSS selectors rule
			'svelte/no-unused-css-selectors': 'off',
			// Turn off the accessibility rule for click events
			'svelte/a11y-click-events-have-key-events': 'off',
			// Alternative name for the same rule
			'svelte/valid-click-events-on-non-interactive': 'off'
		}
	}
];
