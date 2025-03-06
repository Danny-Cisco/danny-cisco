<script lang="ts">
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';

	import { onMount } from 'svelte';
	let interval60;
	let interval1;
	let minutes = 0;
	let seconds = 0;

	let pageLoaded = false;

	let timerDuration = 120;
	let timerEndTime;
	$: console.log('🚀 ~ timerEndTIme:', timerEndTime);
	let nowMins = 120;
	let timeMs = null;
	let nowMs;

	let today;

	$: if (timerEndTime && pageLoaded && !isRunning) {
		// Combine today's date with the selected time
		let fullDateTime = `${today}T${timerEndTime}`;

		// Convert to milliseconds
		timeMs = new Date(fullDateTime).getTime();

		nowMs = new Date().getTime();

		timerDuration = Math.trunc((timeMs - nowMs) / 1000 / 60);
		// If timerDuration is negative, add 24 hours (1440 minutes)
		if (timerDuration < 0) {
			timerDuration += 1440;
		}
	}

	$: console.log('🚀 ~ nowMs:', nowMs);

	$: console.log('🚀 ~ Time in ms:', timeMs);

	let isEndTime = true;

	let endTimeButtonLabel = 'DURATION';

	$: if (isEndTime) endTimeButtonLabel = 'END TIME';
	else endTimeButtonLabel = 'DURATION';

	let isRunning = false;

	let hoursArray = [];
	$: console.log('🚀 ~ hoursArray:', hoursArray);
	let initHoursArray = [];
	$: console.log('🚀 ~ initHoursArray:', initHoursArray);

	let numberOfDiscs = 0;
	let currentDisc = 0;
	$: numberOfDiscs = Math.trunc(timerDuration / 60); // removes decimal places

	$: if (timerDuration % 60) {
		numberOfDiscs += 1; // add a disc if there is a partial disc left
	}

	$: if (timerDuration) {
		hoursArray = []; // clear the hoursArray if user sets new the duration
		initHoursArray = []; // clear the hoursArray if user sets new the duration
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

	$: if (!isRunning) {
		for (let i = 0; i < numberOfDiscs; i++) {
			if (i < currentDisc) {
				initHoursArray[i] = 60; // make all the discs 60
			} else if (i > currentDisc) {
				if (!isRunning) initHoursArray[i] = 60;
				else initHoursArray[i] = 0;
			} else if (i == currentDisc) {
				if (!isRunning)
					initHoursArray[i] = Math.round(timerDuration % 60) || 60; // make the last disc the remainder or 60 if no remainder
				else initHoursArray[i] = Math.round(timerDuration % 60);
			}
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
		today = new Date().toISOString().split('T')[0];

		interval60 = setInterval(() => {
			if (isRunning) minutes += 1;
		}, 1000 * 60);

		interval1 = setInterval(() => {
			if (isRunning) seconds += 1;
		}, 1000);

		pageLoaded = true;

		return () => {
			clearInterval(interval60);
			clearInterval(interval1);
		};
	});
</script>

<!-- rear curtain of black -->
<div class="fixed inset-0 z-[-1] bg-black"></div>

<!-- start of app -->
<!-- countdown timer display : blinking -->
<div class="relative inset-0 w-full text-center">
	{#key seconds}
		<div
			class=" absolute left-0 right-0 top-0 p-1 text-center font-mono text-xl"
			class:hidden={seconds % 2 !== 0}
			style="color: hsl(200, 50%, 80%);"
		>
			{nowMins} mins
		</div>
		<div
			class="absolute left-0 right-0 top-0 p-1 text-center font-mono text-xl"
			class:hidden={seconds % 2 === 0}
			style="color:hsl(200, 50%, 27%)"
		>
			{nowMins} mins
		</div>
	{/key}
</div>
<div class="block flex flex-col items-center justify-start pt-10">
	<div class="z-1 flex w-full flex-col items-center justify-center gap-2">
		<button
			on:click={handleStartStop}
			class="fixed bottom-4 w-[200px] rounded-full p-4 text-xl font-bold shadow hover:bg-gray-500 hover:text-white"
			style="background-color: {isRunning ? runningBg : 'hsl(200, 50%, 80%)'}; color: {isRunning
				? 'black'
				: 'black'};">{buttonLabel}</button
		>
		<div class="flex flex-col items-center gap-2">
			{#if isEndTime}
				<input
					type="time"
					id="endTime"
					class="w-50 rounded-full p-2 px-5 text-xl transition-all"
					style="background-color: {isRunning ? runningBg : 'white'}; color: {isRunning
						? midGrayText
						: 'black'};"
					bind:value={timerEndTime}
				/>
			{:else}
				<input
					type="number"
					id="duration"
					class="w-50 rounded-full p-2 px-5 text-xl transition-all"
					style="background-color: {isRunning ? runningBg : 'white'}; color: {isRunning
						? midGrayText
						: 'black'};"
					bind:value={timerDuration}
				/>
			{/if}<button
				class="text-sm font-light transition-all"
				style="background-color: {isRunning ? 'transparent' : 'transparent'}; color: {isRunning
					? midGrayText
					: 'white'};"
				on:click={() => {
					isEndTime = !isEndTime;
				}}
			>
				{isEndTime ? 'Set End Time' : 'Set Duration'}
			</button>
		</div>
	</div>
	<div class="flex flex-wrap items-center justify-center">
		{#each initHoursArray as mins, index}
			<FullCircle nowMins={hoursArray[index] || 0} initMins={initHoursArray[index] || 0} />
		{/each}
	</div>
</div>
