<script>
	import { writable } from 'svelte/store';

	// Dark mode store (persists using localStorage)
	const storedDarkMode =
		typeof localStorage !== 'undefined' ? localStorage.getItem('darkMode') === 'true' : false;
	const darkMode = writable(storedDarkMode);

	// Only access localStorage in browser environment
	if (typeof localStorage !== 'undefined') {
		darkMode.subscribe((value) => {
			localStorage.setItem('darkMode', String(value));
		});
	}

	// Sample Data
	const storageMethods = [
		{
			name: 'Cache',
			scope: 'Server/CDN',
			persistence: 'Temporary (depends on config)',
			size: 'Large',
			secure: true,
			reactive: false,
			bestFor: 'API responses, rendered pages, assets',
			details:
				'Browser and HTTP caching mechanisms for storing responses from previous requests. Controlled through HTTP headers like Cache-Control and ETag.'
		},
		{
			name: 'locals (SvelteKit)',
			scope: 'Server (per request)',
			persistence: 'Request-scoped',
			size: 'Small',
			secure: true,
			reactive: false,
			bestFor: 'Passing auth data or DB connections across requests',
			details:
				'Available during server-side rendering within a single request. Used to pass data between hooks, endpoints, and server-rendered components.'
		},
		{
			name: 'localStorage',
			scope: 'Browser (client)',
			persistence: 'Permanent (until cleared)',
			size: '~5MB',
			secure: false,
			reactive: false,
			bestFor: 'Saving user settings, theme, or state that should persist',
			details:
				"Data stored in localStorage persists until explicitly cleared. Note that it should not be used for sensitive information as it's not secure."
		},
		{
			name: 'sessionStorage',
			scope: 'Browser (client)',
			persistence: 'Cleared when tab is closed',
			size: '~5MB',
			secure: false,
			reactive: false,
			bestFor: 'Temporary data that only matters while the page is open',
			details:
				'Similar to localStorage but scoped to the current browser tab/session. Data is cleared when the tab is closed.'
		},
		{
			name: 'Cookies',
			scope: 'Browser & Server',
			persistence: 'Configurable (Session or Expiry)',
			size: '~4KB',
			secure: true,
			reactive: false,
			bestFor: 'Authentication tokens, remembering logged-in users',
			details:
				'Sent with every HTTP request to the same domain. Can be made secure with httpOnly, secure and sameSite flags to prevent XSS and CSRF attacks.'
		},
		{
			name: 'Svelte Stores',
			scope: 'Client (RAM)',
			persistence: 'Lost on refresh',
			size: 'No limit (memory-based)',
			secure: false,
			reactive: true,
			bestFor: 'UI state, form data, reactivity',
			details:
				'Reactive state containers that trigger UI updates when values change. Perfect for managing application state during runtime.'
		}
	];

	let expanded = null;
	let storageResults = '';

	function toggleExpand(index) {
		expanded = expanded === index ? null : index;
	}

	// Safely handle browser-only features
	function isBrowser() {
		return typeof window !== 'undefined';
	}

	function setCookie() {
		if (isBrowser()) {
			document.cookie = 'exampleData=hello; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
			storageResults = 'Cookie set: exampleData=hello';
		}
	}

	function getCookie() {
		if (isBrowser()) {
			storageResults = 'Cookies: ' + document.cookie;
		}
	}

	function setLocalStorage() {
		if (isBrowser()) {
			localStorage.setItem('exampleData', 'Hello Local Storage!');
			storageResults = 'localStorage set: exampleData=Hello Local Storage!';
		}
	}

	function getLocalStorage() {
		if (isBrowser()) {
			storageResults = 'localStorage: ' + (localStorage.getItem('exampleData') || 'Not set');
		}
	}

	function setSessionStorage() {
		if (isBrowser()) {
			sessionStorage.setItem('exampleData', 'Hello Session Storage!');
			storageResults = 'sessionStorage set: exampleData=Hello Session Storage!';
		}
	}

	function getSessionStorage() {
		if (isBrowser()) {
			storageResults = 'sessionStorage: ' + (sessionStorage.getItem('exampleData') || 'Not set');
		}
	}

	function clearLocalStorage() {
		if (isBrowser()) {
			localStorage.removeItem('exampleData');
			storageResults = 'localStorage cleared';
		}
	}

	function clearSessionStorage() {
		if (isBrowser()) {
			sessionStorage.removeItem('exampleData');
			storageResults = 'sessionStorage cleared';
		}
	}

	function clearCookies() {
		if (isBrowser()) {
			document.cookie = 'exampleData=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
			storageResults = 'Cookies cleared';
		}
	}

	function clearAll() {
		if (isBrowser()) {
			localStorage.removeItem('exampleData');
			sessionStorage.removeItem('exampleData');
			document.cookie = 'exampleData=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
			storageResults = 'All storage cleared';
		}
	}
</script>

<div class={$darkMode ? 'dark-mode' : 'light-mode'}>
	<div class="container">
		<h1 class="text-4xl font-bold underline">Guide to Web Dev Storage</h1>
		<div class="theme-toggle">
			<label>
				<input type="checkbox" bind:checked={$darkMode} /> Dark Mode
			</label>
		</div>

		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Scope</th>
						<th>Persistence</th>
						<th>Size Limit</th>
						<th>Secure?</th>
						<th>Reactive?</th>
						<th>Best For</th>
					</tr>
				</thead>

				<tbody>
					{#each storageMethods as method, i}
						<tr class="expandable" class:active={expanded === i} on:click={() => toggleExpand(i)}>
							<td>{method.name}</td>
							<td>{method.scope}</td>
							<td>{method.persistence}</td>
							<td>{method.size}</td>
							<td>{method.secure ? '✅' : '❌'}</td>
							<td>{method.reactive ? '✅' : '❌'}</td>
							<td>{method.bestFor}</td>
						</tr>
						{#if expanded === i}
							<tr class="details-row">
								<td colspan="7">
									<div class="details-content">
										<h3>{method.name} Details:</h3>
										<p>{method.details}</p>
									</div>
								</td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
		</div>

		<div class="demo-section">
			<h2 class="mb-4 text-center text-xl font-bold underline">Try it Out</h2>
			<div class="button-group">
				<div>
					<h3>LocalStorage</h3>
					<button on:click={setLocalStorage}>Set</button>
					<button on:click={getLocalStorage}>Get</button>
					<button on:click={clearLocalStorage} class="clear-button">Clear</button>
				</div>
				<div>
					<h3>SessionStorage</h3>
					<button on:click={setSessionStorage}>Set</button>
					<button on:click={getSessionStorage}>Get</button>
					<button on:click={clearSessionStorage} class="clear-button">Clear</button>
				</div>
				<div>
					<h3>Cookies</h3>
					<button on:click={setCookie}>Set</button>
					<button on:click={getCookie}>Get</button>
					<button on:click={clearCookies} class="clear-button">Clear</button>
				</div>
			</div>

			{#if storageResults}
				<div class="results h-20">
					<h3>Results:</h3>
					<pre>{storageResults}</pre>
				</div>
			{:else}
				<div class="h-20"></div>
			{/if}

			<div class="w-full text-center">
				<button class="clear-button w-sm" on:click={clearAll}>Clear All Storage</button>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.light-mode {
		background: #f5f5f5;
		color: #333;
		min-height: 100vh;
	}

	.dark-mode {
		background: #222;
		color: #eee;
		min-height: 100vh;
	}

	.theme-toggle {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 20px;
	}

	h1 {
		margin-bottom: 30px;
		text-align: center;
	}

	.table-container {
		overflow-x: auto;
		margin-bottom: 30px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: var(--table-bg, white);
	}

	.dark-mode table {
		--table-bg: #333;
	}

	th,
	td {
		padding: 12px;
		text-align: left;
		border: 1px solid var(--border-color, #ddd);
	}

	.dark-mode th,
	.dark-mode td {
		--border-color: #555;
	}

	th {
		background-color: var(--header-bg, #f0f0f0);
		font-weight: bold;
	}

	.dark-mode th {
		--header-bg: #444;
	}

	.expandable {
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.expandable:hover {
		background-color: var(--hover-color, #f9f9f9);
	}

	.dark-mode .expandable:hover {
		--hover-color: #3a3a3a;
	}

	.expandable.active {
		background-color: var(--active-color, #e6f7ff);
	}

	.dark-mode .expandable.active {
		--active-color: #2d4052;
	}

	.details-row {
		background-color: var(--details-bg, #f8f8f8);
	}

	.dark-mode .details-row {
		--details-bg: #2a2a2a;
	}

	.details-content {
		padding: 15px;
	}

	.details-content h3 {
		margin-top: 0;
		margin-bottom: 10px;
	}

	.demo-section {
		background-color: var(--demo-bg, white);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.dark-mode .demo-section {
		--demo-bg: #333;
	}

	.button-group {
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
		margin-bottom: 20px;
	}

	.button-group > div {
		flex: 1;
		min-width: 200px;
	}

	button {
		background-color: var(--button-bg, #0070f3);
		color: white;
		border: none;
		padding: 8px 16px;
		margin-right: 10px;
		margin-bottom: 10px;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.dark-mode button {
		--button-bg: #2c5ea9;
	}

	button:hover {
		background-color: var(--button-hover, #005bcc);
	}

	.dark-mode button:hover {
		--button-hover: #234a86;
	}

	.clear-button {
		background-color: var(--clear-button, #f44336);
	}

	.dark-mode .clear-button {
		--clear-button: #a13030;
	}

	.clear-button:hover {
		background-color: var(--clear-hover, #d32f2f);
	}

	.dark-mode .clear-button:hover {
		--clear-hover: #832626;
	}

	.results {
		margin-top: 20px;
		background-color: var(--results-bg, #f0f0f0);
		padding: 15px;
		border-radius: 4px;
	}

	.dark-mode .results {
		--results-bg: #2a2a2a;
	}

	pre {
		margin: 0;
		white-space: pre-wrap;
		word-break: break-all;
	}

	@media (max-width: 768px) {
		.button-group {
			flex-direction: column;
			gap: 15px;
		}
	}
</style>
