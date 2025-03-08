<script>
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { fade } from 'svelte/transition';
	const data = {
		understandStuff: {
			cards: [
				{
					heading: 'HSL Wheel',
					link: { href: '/understand-stuff/hsl-wheel', label: 'Try it' },
					image: '/hsl-wheel.png',
					paragraph:
						'Develop intuition for HUE values in degrees by visualising HSL as a colour wheel.'
				},
				{
					heading: 'HSL Grid',
					link: { href: '/understand-stuff/hsl-grid', label: 'Try it' },
					image: '/hsl-grid.png',
					paragraph:
						'Its a hardware store paint department for web colours! Select any HSL colour from a wall of color chips'
				},
				{
					heading: 'Web Dev Storage',
					link: { href: '/understand-stuff/web-dev-storage', label: 'Try it' },
					image: '/web-dev-storage.png',
					paragraph: 'LocalStorage? Locals? Cookies? Where do they live and what are they are for.'
				},
				{
					heading: 'Naming Conventions',
					link: { href: '/understand-stuff/naming-conventions', label: 'Try it' },
					paragraph: 'When to use snake_case, camelCase etc'
				},
				{
					heading: 'Web Dev Time Formats',
					link: { href: '/understand-stuff/web-dev-time-formats', label: 'Try it' },
					paragraph: 'Everything there is to know about time formats on the web'
				},
				{
					heading: 'FP4 Mantissa',
					link: { href: '/understand-stuff/fp4-mantissa', label: 'Try it' },
					paragraph: 'Details about FP4 mantissa format'
				}
			]
		}
	};
</script>

<div in:fade>
	<main class="mx-auto flex max-w-3xl flex-col gap-4 py-4">
		<h1 class="text-center text-4xl font-bold underline"><GlitchText text="Understand Stuff" /></h1>
		<div class="text-center">
			<p>Tools I have generated in order to</p>
			<p>'understand stuff'</p>
		</div>

		{#each data.understandStuff.cards as card}
			<Card {card} />
		{/each}
	</main>
</div>
