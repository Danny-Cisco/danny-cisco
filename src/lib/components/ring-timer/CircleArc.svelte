<script>
	import { fade } from 'svelte/transition';

	export let radius = 110;
	export let arc = 0.9;
	export let color = 'white';
	export let stroke = 20;
	export let width = 300;
	export let height = 300;

	let circum = 2 * radius * Math.PI;
</script>

{#if arc}
	<svg {width} {height}>
		<circle
			transition:fade
			cx={width / 2}
			cy={height / 2}
			r={radius}
			fill="none"
			stroke={color}
			stroke-width={stroke}
			stroke-linecap="round"
			stroke-dasharray="{arc * circum} {circum}"
			transform="rotate(-90, {width / 2}, {height / 2})"
		/>
	</svg>
{/if}

<style>
	circle {
		transition: stroke-dasharray 0.3s ease-in-out;
	}
</style>
