<script lang="ts">
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';

	import { onMount } from 'svelte';
	let interval60;
	let interval1;
	let minutes = 0;
	let seconds = 0;

	let timerDuration = 120;
	let nowMins = 120;

	let isRunning = false;

	let hoursArray = [];

	let numberOfDiscs = 0;
	let currentDisc = 0;
	$: numberOfDiscs = Math.trunc(timerDuration / 60); // removes decimal places

	$: if (timerDuration % 60) {
		numberOfDiscs += 1; // add a disc if there is a partial disc left
	}

	$: if (timerDuration) {
		hoursArray = []; // clear the hoursArray if user sets new the duration
		minutes = 0;
	}

	$: currentDisc = Math.trunc(nowMins / 60);

	$: for (let i = 0; i < numberOfDiscs; i++) {
		if (i < currentDisc) {
			hoursArray[i] = 60; // make all the discs 60
		} else if (i > currentDisc) {
			if (!isRunning) hoursArray[i] = 60;
			else hoursArray[i] = 0;
		} else if (i == currentDisc) {
			if (!isRunning)
				hoursArray[i] = Math.round(nowMins % 60) || 60; // make the last disc the remainder or 60 if no remainder
			else hoursArray[i] = Math.round(nowMins % 60);
		}
	}

	$: if (nowMins) nowMins = timerDuration - minutes;

	let buttonLabel = 'START';

	$: if (isRunning) buttonLabel = 'STOP';
	else buttonLabel = 'START';

	function handleStartStop() {
		isRunning = !isRunning;
	}

	onMount(() => {
		interval60 = setInterval(() => {
			if (isRunning) minutes += 1;
		}, 1000 * 60);

		interval1 = setInterval(() => {
			if (isRunning) seconds += 1;
		}, 1000);

		return () => {
			clearInterval(interval60);
			clearInterval(interval1);
		};
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center bg-black pt-10">
	<div class="relative w-full text-center">
		{#key seconds}
			<div
				class="absolute inset-0 p-8 font-mono text-[30px] text-white"
				class:hidden={seconds % 2 !== 0}
			>
				{nowMins} mins
			</div>
			<div
				class="absolute inset-0 p-8 font-mono text-[30px] text-gray-500"
				class:hidden={seconds % 2 === 0}
			>
				{nowMins} mins
			</div>
		{/key}
	</div>
	<div class="h-20"></div>
	<div class="z-1 flex w-full items-center justify-center gap-20">
		<div class="flex items-center gap-2">
			<label class="text-4xl text-white" for="duration">DURATION</label>
			<input type="number" id="duration" class="rounded-full" bind:value={timerDuration} />
		</div>

		<button
			on:click={handleStartStop}
			class="w-[200px] rounded-full bg-white p-4 text-xl font-bold hover:bg-gray-500 hover:text-white"
			>{buttonLabel}</button
		>
	</div>
	<div class="h-20"></div>
	<div class="flex flex-wrap items-center justify-center">
		{#each hoursArray as mins, index}
			<FullCircle nowMins={mins} />
		{/each}
	</div>
</div>
