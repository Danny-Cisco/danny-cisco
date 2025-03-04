<script>
	export let radius = 110;
	export let arc = 0.9;
	export let color = 'white';
	export let stroke = 20;
	export let width = 300;
	export let height = 300;

	let circum = 2 * radius * 3.14;
</script>

{#if arc}
	<circle
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
{/if}
