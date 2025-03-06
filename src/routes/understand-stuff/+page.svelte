<script>
	const links = [
		{
			title: 'Web Dev Storage',
			path: '/understand-stuff/web-dev-storage',
			description: 'Information about web development storage options'
		},
		{
			title: 'FP4 Mantissa',
			path: '/understand-stuff/fp4-mantissa',
			description: 'Details about FP4 mantissa format'
		},
		{
			title: 'Naming Conventions',
			path: '/understand-stuff/naming-conventions',
			description: 'When to use snake_case, camelCase etc'
		}
	];
</script>

<svelte:head>
	<title>Understand Stuff</title>
</svelte:head>

<main>
	<h1>Understand Stuff</h1>
	<p>A collection of resources to help understand various technical concepts.</p>

	<ul class="links-list">
		{#each links as link}
			<li>
				<a href={link.path}>
					<h2>{link.title}</h2>
					<p>{link.description}</p>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	.links-list {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1rem;
	}

	.links-list li a {
		display: block;
		padding: 1.5rem;
		border-radius: 8px;
		background: #f2f2f2;
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.links-list li a:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	h2 {
		margin-top: 0;
	}
</style>
