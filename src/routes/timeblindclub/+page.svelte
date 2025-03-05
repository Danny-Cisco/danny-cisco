<script lang="ts">
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';

	import { onMount } from 'svelte';
	let interval;
	let seconds = 0;

	let timerDuration = 67;
	let nowMins = 90;

	let hoursArray = [];

	let numberOfDiscs = 0;
	$: numberOfDiscs = Math.trunc(timerDuration / 60); // removes decimal places

	$: if (timerDuration % 60) {
		numberOfDiscs += 1; // add a disc if there is a partial disc left
	}

	$: if (timerDuration) hoursArray = []; // clear the hoursArray if user sets new the duration

	$: for (let i = 0; i < numberOfDiscs; i++) {
		if (i !== numberOfDiscs - 1) {
			hoursArray[i] = 60; // make all the discs 60
		} else {
			hoursArray[i] = Math.round(timerDuration % 60) || 60; // make the last disc the remainder or 60 if no remainder
		}
	}

	$: if (nowMins) nowMins = timerDuration - seconds;
	$: console.log('🚀 ~ seconds:', seconds);
	$: console.log('🚀 ~ nowMins:', nowMins);

	onMount(() => {
		interval = setInterval(() => {
			seconds += 1;
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex h-full w-full flex-col items-center bg-black pt-10">
	<input type="number" bind:value={timerDuration} />

	<div class="flex flex-wrap items-center justify-center">
		{#each hoursArray as mins, index}
			<FullCircle nowMins={mins} />
		{/each}
	</div>
</div>
