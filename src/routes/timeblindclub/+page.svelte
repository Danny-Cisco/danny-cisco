<script lang="ts">
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';

	let timerDuration = 67;
	let nowMins = 90;

	let hoursArray = [];

	let numberOfDiscs = 0;
	$: numberOfDiscs = Math.trunc(timerDuration / 60); // removes decimal places

	$: if (timerDuration % 60) {
		numberOfDiscs += 1; // add a disc if there is a partial disc left
	}

	$: if (timerDuration) hoursArray = [];

	$: for (let i = 0; i < numberOfDiscs; i++) {
		if (i === numberOfDiscs - 1) {
			hoursArray[i] = Math.round(timerDuration % 60);
		} else {
			hoursArray[i] = 60;
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center bg-black pt-10">
	<input type="number" bind:value={timerDuration} />
	{#key hoursArray}
		<div class="flex flex-wrap items-center justify-center">
			{#each hoursArray as mins, index}
				<FullCircle nowMins={mins} />
			{/each}
		</div>
	{/key}
</div>
