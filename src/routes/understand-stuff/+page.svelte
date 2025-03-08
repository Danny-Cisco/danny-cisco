<script>
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
	import { fade } from 'svelte/transition';
	const usLinks = [
		{
			title: 'HSL Wheel',
			path: '/understand-stuff/hsl-wheel',
			img: '/hsl-wheel.png',
			description: 'Visualising HSL'
		},
		{
			title: 'HSL Grid',
			path: '/understand-stuff/hsl-grid',
			img: '/hsl-grid.png',
			description: 'Visualising HSL'
		},
		{
			title: 'Web Dev Storage',
			path: '/understand-stuff/web-dev-storage',
			description: 'LocalStorage? Locals? Cookies? Where do they live and what are they are for.'
		},
		{
			title: 'Naming Conventions',
			path: '/understand-stuff/naming-conventions',
			description: 'When to use snake_case, camelCase etc'
		},
		{
			title: 'Web Dev Time Formats',
			path: '/understand-stuff/web-dev-time-formats',
			description: 'Everything there is to know about time formats on the web'
		},
		{
			title: 'FP4 Mantissa',
			path: '/understand-stuff/fp4-mantissa',
			description: 'Details about FP4 mantissa format'
		}
	];
</script>

<div in:fade>
	<main class="mx-auto flex max-w-md flex-col gap-4 py-4">
		<h1 class="text-center text-4xl font-bold underline"><GlitchText text="Understand Stuff" /></h1>
		<div class="text-center">
			<p>Tools I have generated in order to</p>
			<p>'understand stuff'</p>
		</div>

		<ul class="links-list">
			{#each usLinks as link}
				<li class="border-[1px] border-white bg-gradient-to-br from-white/10">
					<a href={link.path}
						><div class="flex justify-between gap-4">
							<div class="flex flex-col">
								<h2 class="text-light font-bold">{link.title}</h2>
								<p class="text-light-500">{link.description}</p>
							</div>
							{#if link.img}
								<img src={link.img} class="h-20 w-20 rounded" alt="" />
							{/if}
						</div>
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

		.links-list li {
			display: block;
			padding: 1.5rem;
			border-radius: 8px;
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
</div>
