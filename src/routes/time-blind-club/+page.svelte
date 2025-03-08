<script lang="ts">
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { timerStore } from '$lib/stores/timerStore.js';

	// Destructure what we need from the store
	const {
		nowDateObj,
		nowMs,
		timerEndTime,
		timerDuration,
		isRunning,
		seconds,
		minutes,
		nowMins,
		pageLoaded,
		isEndTime,
		buttonLabel,
		toggleTimer,
		updateEndTime,
		initializeDates,
		toggleEndTimeMode,
		cleanup
	} = timerStore;

	let today;
	let timeMs = null;

	// Reactive variables for the circles calculation
	let hoursArray = [];
	let initHoursArray = [];
	let numberOfDiscs = 0;
	let currentDisc = 0;

	// Compute number of discs based on timer duration
	$: numberOfDiscs = Math.trunc($timerDuration / 60);
	$: if ($timerDuration % 60) {
		numberOfDiscs += 1; // add a disc if there is a partial disc left
	}

	// Clear arrays when duration changes
	$: if ($timerDuration) {
		hoursArray = [];
		initHoursArray = [];
	}

	// Calculate current disc
	$: currentDisc = Math.trunc($nowMins / 60);

	// Fill the hoursArray based on current state
	$: {
		hoursArray = [];
		for (let i = 0; i < numberOfDiscs; i++) {
			if (i < currentDisc) {
				hoursArray[i] = 60; // make all previous discs 60
			} else if (i > currentDisc) {
				if (!$isRunning) hoursArray[i] = 60;
				else hoursArray[i] = 0;
			} else if (i == currentDisc) {
				if (!$isRunning)
					hoursArray[i] = Math.round($nowMins % 60) || 60; // make the last disc the remainder or 60 if no remainder
				else hoursArray[i] = Math.round($nowMins % 60);
			}
		}
	}

	// Fill the initHoursArray
	$: {
		if (!$isRunning) {
			initHoursArray = [];
			for (let i = 0; i < numberOfDiscs; i++) {
				if (i < currentDisc) {
					initHoursArray[i] = 60; // make all the discs 60
				} else if (i > currentDisc) {
					initHoursArray[i] = 60;
				} else if (i == currentDisc) {
					initHoursArray[i] = Math.round($timerDuration % 60) || 60; // make the last disc the remainder or 60 if no remainder
				}
			}
		}
	}

	// Handle end time changes
	function handleEndTimeChange(event) {
		updateEndTime(event.target.value);
	}

	// Style variables
	let runningBg = 'hsl(200, 50%, 12%)'; // Background when running
	let midGrayText = 'hsl(200, 50%, 30%)'; // Mid-gray text color

	onMount(() => {
		today = initializeDates();
		pageLoaded.set(true);
	});

	onDestroy(() => {
		cleanup();
	});
</script>

<!-- rear curtain of black -->
<div class="h-10"></div>
<!-- start of app -->
<!-- countdown timer display : blinking -->
<div class="z-1 absolute inset-0 w-full text-center">
	{#key $seconds}
		<div
			class="absolute left-0 right-0 top-0 p-1 text-center font-mono text-xl"
			class:hidden={$seconds % 2 !== 0}
			style="color: hsl(200, 50%, 80%);"
		>
			{$nowMins} mins
		</div>
		<div
			class="absolute left-0 right-0 top-0 p-1 text-center font-mono text-xl"
			class:hidden={$seconds % 2 === 0}
			style="color:hsl(200, 50%, 27%)"
		>
			{$nowMins} mins
		</div>
	{/key}
</div>

<div class="z-[2] block flex flex-col items-center justify-start">
	<div class="z-[3] flex w-full flex-col items-center justify-center gap-2">
		<button
			on:click={toggleTimer}
			class="fixed bottom-4 w-[200px] rounded-full p-4 text-xl font-bold shadow hover:bg-gray-500 hover:text-white"
			style="background-color: {$isRunning ? runningBg : 'hsl(200, 50%, 80%)'}; color: {$isRunning
				? 'black'
				: 'black'};">{$buttonLabel}</button
		>
		<div class="flex flex-col items-center gap-2">
			{#if $isEndTime}
				<input
					type="time"
					id="endTime"
					class="w-50 rounded-full p-2 px-5 text-xl transition-all"
					style="background-color: {$isRunning ? runningBg : 'white'}; color: {$isRunning
						? midGrayText
						: 'black'};"
					value={$timerEndTime}
					on:input={handleEndTimeChange}
				/>
			{:else}
				<input
					type="number"
					id="duration"
					class="w-50 rounded-full p-2 px-5 text-xl transition-all"
					style="background-color: {$isRunning ? runningBg : 'white'}; color: {$isRunning
						? midGrayText
						: 'black'};"
					bind:value={$timerDuration}
				/>
			{/if}
			<button
				class="text-sm font-light transition-all"
				style="background-color: {$isRunning ? 'transparent' : 'transparent'}; color: {$isRunning
					? midGrayText
					: 'white'};"
				on:click={toggleEndTimeMode}
			>
				{$isEndTime ? 'Set End Time' : 'Set Duration'}
			</button>
		</div>
	</div>
	<div class="bg-gray-500 text-xl text-white">{$timerEndTime}</div>

	<div class="z-[10] flex flex-wrap items-center justify-center">
		{#each initHoursArray as mins, index}
			<FullCircle nowMins={hoursArray[index] || 0} initMins={initHoursArray[index] || 0} />
		{/each}
	</div>
</div>
