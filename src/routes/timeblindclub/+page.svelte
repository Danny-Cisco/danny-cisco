<script lang="ts">
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';

	import { onMount } from 'svelte';
	let interval60;
	let interval1;
	let minutes = 0;
	let seconds = 0;

	let timerDuration = 120;
	let timerEndTime;
	$: console.log('🚀 ~ timerEndTIme:', timerEndTime);
	let nowMins = 120;
	let timeMs = null;
	let nowMs;

	$: if (timerEndTime) {
		// Get today's date in YYYY-MM-DD format
		let today = new Date().toISOString().split('T')[0];

		// Combine today's date with the selected time
		let fullDateTime = `${today}T${timerEndTime}`;

		// Convert to milliseconds
		timeMs = new Date(fullDateTime).getTime();

		nowMs = new Date().getTime();

		timerDuration = Math.trunc((timeMs - nowMs) / 1000 / 60);
	}

	$: console.log('🚀 ~ nowMs:', nowMs);

	$: console.log('🚀 ~ Time in ms:', timeMs);

	let isEndTime = true;

	let endTimeButtonLabel = 'DURATION';

	$: if (isEndTime) endTimeButtonLabel = 'END TIME';
	else endTimeButtonLabel = 'DURATION';

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
	let runningBg = 'hsl(200, 50%, 12%)'; // Background when running
	let midGrayText = 'hsl(200, 50%, 30%)'; // Mid-gray text color

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

<div class="relative w-full text-center">
	{#key seconds}
		<div
			class=" absolute inset-0 p-1 font-mono text-[60px]"
			class:hidden={seconds % 2 !== 0}
			style="color: hsl(200, 50%, 80%);"
		>
			{nowMins} mins
		</div>
		<div
			class="absolute inset-0 p-1 font-mono text-[60px]"
			class:hidden={seconds % 2 === 0}
			style="color:hsl(200, 50%, 12%)"
		>
			{nowMins} mins
		</div>
	{/key}
</div>
<div class="flex h-full w-full flex-col items-center justify-start bg-black pt-40">
	<div class="z-1 flex w-full flex-col items-center justify-center gap-20">
		<button
			on:click={handleStartStop}
			class="w-[200px] rounded-full p-4 text-xl font-bold hover:bg-gray-500 hover:text-white"
			style="background-color: {isRunning ? runningBg : 'hsl(200, 50%, 80%)'}; color: {isRunning
				? 'black'
				: 'black'};">{buttonLabel}</button
		>
		<div class="flex items-center gap-2">
			<button
				class="text-2xl text-white"
				on:click={() => {
					isEndTime = !isEndTime;
				}}>{endTimeButtonLabel}</button
			>
			{#if !isEndTime}
				<input type="number" id="duration" class="w-36 rounded-full" bind:value={timerDuration} />
			{:else}
				<input type="time" id="endTime" class="w-36 rounded-full" bind:value={timerEndTime} />
			{/if}
		</div>
	</div>
	<div class="h-20"></div>
	<div class="flex flex-wrap items-center justify-center">
		{#each hoursArray as mins, index}
			<FullCircle nowMins={mins} />
		{/each}
	</div>
</div>
