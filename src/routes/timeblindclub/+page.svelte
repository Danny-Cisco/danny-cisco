<script>
	import CircleArc from '$lib/components/ring-timer/CircleArc.svelte';

	let padding = 10;
	let stroke = 20;
	let gap = 5;
	let innerRadius = 50;
	let height = 12 * stroke + 10 * gap + 2 * innerRadius + padding;
	console.log('🚀 ~ height:', height);
	let width = height;

	let ringsRadius = [];

	let timers = [1, 1, 1, 1, 1, 0.5];

	for (let i = 0; i < 6; i++) {
		ringsRadius[i] = innerRadius + i * stroke + i * gap;
	}
</script>

<div class="h-full w-full bg-black">
	<div class="flex h-full flex-col items-center justify-center">
		<svg {height} {width} class="">
			{#each ringsRadius as radius, index}
				<CircleArc {height} {width} color="#555555" arc="1" {radius} />
				<CircleArc {height} {width} {radius} arc={timers[index]} />
			{/each}
		</svg>
	</div>
</div>
