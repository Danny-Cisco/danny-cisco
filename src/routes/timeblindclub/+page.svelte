<script>
	import CircleArc from '$lib/components/ring-timer/CircleArc.svelte';
	let nowMins = 39;

	let padding = 10;
	let stroke = 20;
	let gap = 5;
	let innerRadius = 50;
	let height = 12 * stroke + 10 * gap + 2 * innerRadius + padding;
	let width = height;

	let ringsRadius = [];

	let timers = [1, 1, 1, 1, 1, 1];

	for (let i = 0; i < 6; i++) {
		ringsRadius[i] = innerRadius + i * stroke + i * gap;
	}

	for (let i = 5; i >= 0; i--) {
		// prettier-ignore
		if ((nowMins > (i * 10)) && (nowMins <= (i + 1) * 10)) {
			timers[i] = (nowMins - (i * 10)) / 10;
		} else if (i * 10 > nowMins) {
			timers[i] = 0;
		} else timers[i] = 1;
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
