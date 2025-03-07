<script>
	import { onMount } from 'svelte';

	let searchQuery = '';
	let activeTab = 'all';
	let allConventions = [];
	let filteredConventions = [];

	// Convention categories/types
	const caseTypes = [
		{ id: 'camelCase', name: 'camelCase', example: 'userName' },
		{ id: 'PascalCase', name: 'PascalCase', example: 'UserProfile' },
		{ id: 'snake_case', name: 'snake_case', example: 'user_name' },
		{ id: 'kebab-case', name: 'kebab-case', example: 'user-profile' },
		{ id: 'UPPER_SNAKE_CASE', name: 'UPPER_SNAKE_CASE', example: 'MAX_ATTEMPTS' }
	];

	// Define all the naming conventions data
	const conventionsData = [
		// JavaScript/TypeScript
		{
			category: 'JavaScript',
			item: 'Variables',
			convention: 'camelCase',
			example: 'userName, temporaryValue',
			notes: 'Standard for most JS codebases'
		},
		{
			category: 'JavaScript',
			item: 'Constants',
			convention: 'camelCase or UPPER_SNAKE_CASE',
			example: 'apiUrl or API_URL',
			notes: 'UPPER_SNAKE for true constants, camelCase for constant variables'
		},
		{
			category: 'JavaScript',
			item: 'Functions',
			convention: 'camelCase',
			example: 'calculateTotal(), fetchUserData()',
			notes: 'Verb or verb phrases preferred'
		},
		{
			category: 'JavaScript',
			item: 'Classes',
			convention: 'PascalCase',
			example: 'UserProfile, DataConnection',
			notes: 'Noun or noun phrases'
		},
		{
			category: 'JavaScript',
			item: 'Private properties',
			convention: 'camelCase with _ prefix',
			example: '_privateValue',
			notes: 'Convention only, not truly private'
		},
		{
			category: 'JavaScript',
			item: 'TypeScript interfaces',
			convention: 'PascalCase often with I prefix',
			example: 'IUserData, UserData',
			notes: 'I prefix is becoming less common'
		},
		{
			category: 'JavaScript',
			item: 'TypeScript types',
			convention: 'PascalCase',
			example: 'UserState, ApiResponse',
			notes: ''
		},

		// HTML/CSS
		{
			category: 'HTML/CSS',
			item: 'CSS Class names',
			convention: 'kebab-case',
			example: 'header-title, nav-item-active',
			notes: 'BEM convention: block__element--modifier'
		},
		{
			category: 'HTML/CSS',
			item: 'CSS ID attributes',
			convention: 'kebab-case',
			example: 'main-navigation, sign-up-form',
			notes: ''
		},
		{
			category: 'HTML/CSS',
			item: 'HTML data attributes',
			convention: 'kebab-case',
			example: 'data-user-id, data-target-element',
			notes: ''
		},

		// Svelte
		{
			category: 'Svelte',
			item: 'Component file names',
			convention: 'PascalCase',
			example: 'UserProfile.svelte, Button.svelte',
			notes: 'Some projects use kebab-case.svelte instead'
		},
		{
			category: 'Svelte',
			item: 'SvelteKit routes',
			convention: 'kebab-case',
			example: 'user-settings, blog-posts',
			notes: 'Maps directly to URL structure'
		},
		{
			category: 'Svelte',
			item: 'Props',
			convention: 'camelCase',
			example: 'export let userName;',
			notes: ''
		},
		{
			category: 'Svelte',
			item: 'Store names',
			convention: 'camelCase with $ prefix when accessing',
			example: 'userStore (access as $userStore)',
			notes: ''
		},

		// React
		{
			category: 'React',
			item: 'Component file names',
			convention: 'PascalCase',
			example: 'UserProfile.jsx, Button.tsx',
			notes: ''
		},
		{
			category: 'React',
			item: 'Component names',
			convention: 'PascalCase',
			example: 'UserProfile, NavBar',
			notes: 'Must use PascalCase for React components'
		},
		{
			category: 'React',
			item: 'Props',
			convention: 'camelCase',
			example: 'userName, isVisible',
			notes: ''
		},
		{
			category: 'React',
			item: 'Custom hooks',
			convention: 'camelCase with use prefix',
			example: 'useWindowSize, useAuth',
			notes: 'Must start with "use" to be recognized as a hook'
		},

		// Files & Folders
		{
			category: 'Files & Folders',
			item: 'JavaScript files',
			convention: 'camelCase or kebab-case',
			example: 'userAuth.js or user-auth.js',
			notes: 'Depends on project convention'
		},
		{
			category: 'Files & Folders',
			item: 'React component files',
			convention: 'PascalCase',
			example: 'Button.jsx, UserProfile.tsx',
			notes: ''
		},
		{
			category: 'Files & Folders',
			item: 'Test files',
			convention: 'Same as source with .test or .spec',
			example: 'Button.test.jsx, user-auth.spec.js',
			notes: ''
		},
		{
			category: 'Files & Folders',
			item: 'Folder names',
			convention: 'kebab-case or camelCase',
			example: 'user-profiles or userProfiles',
			notes: 'kebab-case more common for URL-facing routes'
		},

		// Databases
		{
			category: 'Databases',
			item: 'SQL table names',
			convention: 'snake_case, often plural',
			example: 'user_profiles, order_items',
			notes: ''
		},
		{
			category: 'Databases',
			item: 'SQL column names',
			convention: 'snake_case',
			example: 'first_name, created_at',
			notes: ''
		},
		{
			category: 'Databases',
			item: 'Supabase fields',
			convention: 'snake_case',
			example: 'user_id, profile_image_url',
			notes: 'Supabase recommends snake_case for all fields'
		},
		{
			category: 'Databases',
			item: 'MongoDB collections',
			convention: 'camelCase, often plural',
			example: 'users, blogPosts',
			notes: ''
		},
		{
			category: 'Databases',
			item: 'MongoDB document fields',
			convention: 'camelCase',
			example: 'firstName, createdAt',
			notes: ''
		},

		// API
		{
			category: 'API',
			item: 'REST endpoints',
			convention: 'kebab-case or snake_case',
			example: '/user-profiles or /user_profiles',
			notes: 'kebab-case more common in modern APIs'
		},
		{
			category: 'API',
			item: 'GraphQL fields',
			convention: 'camelCase',
			example: 'userName, profileImageUrl',
			notes: ''
		},
		{
			category: 'API',
			item: 'GraphQL types',
			convention: 'PascalCase',
			example: 'User, BlogPost',
			notes: ''
		},
		{
			category: 'API',
			item: 'JSON property names',
			convention: 'camelCase',
			example: 'userName, isActive',
			notes: 'Sometimes snake_case in certain APIs'
		},

		// Environment Variables
		{
			category: 'Environment',
			item: 'Environment variables',
			convention: 'UPPER_SNAKE_CASE',
			example: 'API_KEY, DATABASE_URL',
			notes: ''
		},
		{
			category: 'Environment',
			item: '.env file variables',
			convention: 'UPPER_SNAKE_CASE',
			example: 'VITE_API_URL, DATABASE_PASSWORD',
			notes: ''
		},

		// Frameworks
		{
			category: 'Frameworks',
			item: 'Next.js pages',
			convention: 'kebab-case',
			example: '/user-settings, /blog-posts/[id]',
			notes: 'File names map to URL routes'
		},
		{
			category: 'Frameworks',
			item: 'Angular components',
			convention: 'kebab-case',
			example: 'user-profile.component.ts',
			notes: 'Angular style guide recommendation'
		},
		{
			category: 'Frameworks',
			item: 'Vue components',
			convention: 'PascalCase or kebab-case',
			example: 'UserProfile.vue or user-profile.vue',
			notes: 'PascalCase in SFC, kebab-case in templates'
		},
		{
			category: 'Frameworks',
			item: 'Tailwind classes',
			convention: 'kebab-case',
			example: 'text-center, bg-blue-500',
			notes: ''
		}
	];

	// Initialize filtered conventions with all conventions
	onMount(() => {
		allConventions = conventionsData;
		filteredConventions = conventionsData;
	});

	// Filter conventions based on search query and active tab
	function filterConventions() {
		if (searchQuery === '' && activeTab === 'all') {
			filteredConventions = allConventions;
			return;
		}

		// Convert search query to lowercase for case-insensitive matching
		const query = searchQuery.toLowerCase();

		filteredConventions = allConventions.filter((convention) => {
			// Filter by category if a tab is selected
			const categoryMatch = activeTab === 'all' || convention.category === activeTab;

			// Search in all fields if there's a search query
			if (query) {
				return (
					categoryMatch &&
					(convention.category.toLowerCase().includes(query) ||
						convention.item.toLowerCase().includes(query) ||
						convention.convention.toLowerCase().includes(query) ||
						convention.example.toLowerCase().includes(query) ||
						convention.notes.toLowerCase().includes(query))
				);
			}

			return categoryMatch;
		});
	}

	// Handle search input change
	function handleSearch() {
		filterConventions();
	}

	// Handle tab selection
	function selectTab(tab) {
		activeTab = tab;
		filterConventions();
	}

	// Get unique categories for tabs
	$: categories = [...new Set(allConventions.map((conv) => conv.category))].sort();
</script>

<svelte:head>
	<title>Naming Conventions Reference</title>
</svelte:head>

<main class="container">
	<header>
		<h1 class="text-4xl font-bold">Naming Conventions - Cheat Sheet</h1>

		<div class="search-container">
			<input
				type="text"
				bind:value={searchQuery}
				on:input={handleSearch}
				placeholder="Search for conventions (e.g., 'Supabase', 'camelCase', etc.)"
			/>
		</div>
	</header>

	<section class="convention-types">
		<h2>Case Types Reference</h2>
		<div class="case-types-grid">
			{#each caseTypes as caseType}
				<div class="case-type-card">
					<h3>{caseType.name}</h3>
					<p class="example text-light-500"><code>{caseType.example}</code></p>
				</div>
			{/each}
		</div>
	</section>

	<section class="conventions-section">
		<div class="tabs flex flex-wrap">
			<button class:active={activeTab === 'all'} on:click={() => selectTab('all')}> All </button>
			{#each categories as category}
				<button class:active={activeTab === category} on:click={() => selectTab(category)}>
					{category}
				</button>
			{/each}
		</div>

		<div class="text-light mb-2 font-mono">
			{filteredConventions.length} results:
			{searchQuery ? `for "${searchQuery}"` : ''}
			{activeTab !== 'all' ? `in ${activeTab}` : ''}
		</div>

		<div class="conventions-table-container">
			<table class="conventions-table">
				<thead>
					<tr>
						<th>Category</th>
						<th>Item</th>
						<th>Convention</th>
						<th>Example</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredConventions as convention}
						<tr>
							<td>{convention.category}</td>
							<td>{convention.item}</td>
							<td><code>{convention.convention}</code></td>
							<td><code>{convention.example}</code></td>
							<td>{convention.notes}</td>
						</tr>
					{/each}
					{#if filteredConventions.length === 0}
						<tr>
							<td colspan="5" class="no-results"> No naming conventions found for your search. </td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
	</section>
</main>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	header {
		margin-bottom: 2rem;
		text-align: center;
	}

	h1 {
		margin-bottom: 0.5rem;
	}

	.search-container {
		margin: 2rem auto;
		max-width: 600px;
	}

	input {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.convention-types {
		margin-bottom: 2rem;
	}

	.case-types-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.case-type-card {
		border: solid 1px #222222;
		background: #222222;
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.case-type-card h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	.example {
		margin: 0;
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.tabs button {
		background: #222222;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s;
	}

	.tabs button:hover {
		background: black;
		color: white;
	}

	.tabs button.active {
		background: #228be6;
		color: white;
	}

	.results-info {
		margin-bottom: 1rem;
		font-size: 0.9rem;
		color: #555;
	}

	.conventions-table-container {
		overflow-x: auto;
	}

	.conventions-table {
		background-color: #222222;
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 2rem;
	}

	.conventions-table th,
	.conventions-table td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}

	.conventions-table th {
		font-size: larger;
		font-weight: 600;
	}

	.conventions-table tr:hover {
		background: black;
	}

	code {
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
		font-size: 0.85em;
	}

	.no-results {
		text-align: center;
		padding: 2rem;
		color: #868e96;
	}
	input {
		background-color: #222222;
	}
	@media (max-width: 768px) {
		.tabs {
			flex-wrap: wrap;
		}

		.tabs button {
			margin-bottom: 0.5rem;
		}

		.conventions-table th:nth-child(4),
		.conventions-table td:nth-child(4) {
			display: none;
		}
	}
</style>
