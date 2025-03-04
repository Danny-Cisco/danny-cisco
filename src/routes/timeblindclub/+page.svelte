<script>
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';
	let nowMins = 90;

	// Function to generate an array of hours and remaining minutes
	$: hoursArray = Array(Math.floor(nowMins / 60)).fill(60);
	$: console.log('🚀 ~ hoursArray:', hoursArray);
	$: remainder = nowMins % 60;
	$: if (remainder > 0) hoursArray.push(remainder);
</script>

<div class="h-full w-full bg-black">
	<input type="number" bind:value={nowMins} />
	{#key nowMins}
		<div class="flex flex-wrap items-center justify-center">
			{#each hoursArray as mins, index}
				<FullCircle nowMins={mins} />
			{/each}
		</div>
	{/key}
</div>
