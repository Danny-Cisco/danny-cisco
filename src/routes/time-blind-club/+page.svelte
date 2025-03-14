<script>
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { fade } from 'svelte/transition';
	const data = {
		timeBlindClub: {
			cards: [
				{
					heading: 'Time Rings',
					link: { href: '/time-blind-club/time-rings', label: 'Try it' },
					image: '',
					paragraph: 'One hour per disc. 10 minutes per rings.'
				},
				{
					heading: 'Progress Bar',
					link: { href: '/time-blind-club/progress-bar', label: 'Try it' },
					image: '',
					paragraph: 'Simple as can be.'
				}
			]
		}
	};
</script>

<div in:fade>
	<main class="mx-auto flex max-w-3xl flex-col gap-4 py-4">
		<h1 class="text-center text-4xl font-bold underline"><GlitchText text="Time Blind Club" /></h1>
		<div class="text-center">
			<p>Glasses for the Time Blind</p>
		</div>

		{#each data.timeBlindClub.cards as card}
			<Card {card} />
		{/each}
	</main>
</div>
