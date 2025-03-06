<script>
	import CircleArc from '$lib/components/ring-timer/CircleArc.svelte';
	export let nowMins = 39;

	import { fade } from 'svelte/transition';

	let padding = 10;
	let stroke = 8;
	let gap = 3;
	let innerRadius = 25;
	let height = 12 * stroke + 10 * gap + 2 * innerRadius + padding;
	let width = height;

	let ringsRadius = [];

	let timers = [1, 1, 1, 1, 1, 1];
	let timersReverse = [];

	$: timersReverse = [...timers].reverse();

	for (let i = 5; i >= 0; i--) {
		ringsRadius[i] = innerRadius + i * stroke + i * gap; // calculate all 6 ring sizes
	}

	$: for (let i = 0; i < 6; i++) {
		// prettier-ignore
		if ((nowMins > (i * 10)-1) && (nowMins <= (((i + 1) * 10)))) {
			timers[i] = (nowMins - (i * 10)) / 10;
		} else if (i * 10 > nowMins) {
			timers[i] = 0;
		} else timers[i] = 1;
	}
</script>

<svg {height} {width} class="" transition:fade>
	{#each ringsRadius as radius, index}
		<CircleArc {height} {width} {stroke} color="hsl(200, 50%, 22%)" arc="1" {radius} />

		<CircleArc {height} {width} {stroke} color="hsl(200, 50%, 80%)" {radius} arc={timers[index]} />
	{/each}
</svg>
