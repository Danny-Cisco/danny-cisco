<script lang="ts">
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';

	import {
		startMs,
		endMs,
		durationMs,
		nowMs,
		isRunning,
		alarmIsRinging,
		durationMode
	} from '$lib/stores/timerStore.js';

	$: {
		$startMs;
		$endMs;
		$durationMs;
		$nowMs;
		$isRunning;
		$alarmIsRinging;
		$durationMode;
	}
	$: console.log('🚀 ~ $durationMs:', $durationMs);
	$: console.log('🚀 ~ numberOfDiscs:', numberOfDiscs);

	let minutes = 0;
	let durationMins = 0;

	let nowSeconds = 0;
	let nowMins = 120;
	$: nowMins = ($nowMs - $startMs) / 1000 / 60;
	// $: console.log('🚀 ~ nowMins:', nowMins);

	let startMinNow = $startMs - $nowMs;

	$: nowMinStart = ($nowMs - $startMs) / 1000;

	$: nowSeconds = Math.trunc($nowMs - $startMs / 1000);
	// $: console.log('🚀 ~ nowSeconds:', nowSeconds);

	let hoursArray = [];
	let initHoursArray = [];

	let numberOfDiscs = 0;
	let currentDisc = 0;
	$: numberOfDiscs = Math.min(Math.trunc(durationMins / 60), 9); // set a maximum disc number to avoid excess memory

	$: durationMins = Math.round(($endMs - $startMs) / 1000 / 60);
	$: console.log('🚀 ~ durationMins:', durationMins);

	$: if (durationMins % 60) {
		numberOfDiscs += 1; // add a disc if there is a partial disc left
	}

	$: if ($durationMs) {
		console.log('clearingArrays');
		hoursArray = []; // clear the hoursArray if user sets new the duration
		initHoursArray = []; // clear the hoursArray if user sets new the duration
		minutes = 0;
	}

	$: currentDisc = Math.trunc(nowMins / 60);

	$: for (let i = 0; i < numberOfDiscs; i++) {
		if (i < currentDisc) {
			hoursArray[i] = 60; // make all the discs 60
		} else if (i > currentDisc) {
			if (!$isRunning) hoursArray[i] = 60;
			else hoursArray[i] = 0;
		} else if (i == currentDisc) {
			if (!$isRunning)
				hoursArray[i] = Math.round((($nowMs - $startMs) / 1000 / 60) % 60) || 60; // make the last disc the remainder or 60 if no remainder
			else hoursArray[i] = Math.round((($nowMs - $startMs) / 1000 / 60) % 60);
		}
	}

	$: if (!$isRunning) {
		for (let i = 0; i < numberOfDiscs; i++) {
			if (i < currentDisc) {
				initHoursArray[i] = 60; // make all the discs 60
			} else if (i > currentDisc) {
				if (!$isRunning) initHoursArray[i] = 60;
				else initHoursArray[i] = 0;
			} else if (i == currentDisc) {
				if (!$isRunning)
					initHoursArray[i] = Math.round(durationMins % 60) || 60; // make the last disc the remainder or 60 if no remainder
				else initHoursArray[i] = Math.round(durationMins % 60);
			}
		}
	}

	$: nowMins = ($nowMs - $startMs) / 1000 / 60;

	let buttonLabel = 'START';

	$: if ($isRunning) buttonLabel = 'STOP';
	else buttonLabel = 'START';
</script>

<div class="block flex flex-col items-center justify-start pt-10">
	<div class="flex flex-wrap items-center justify-center">
		{#each initHoursArray as mins, index}
			<FullCircle nowMins={hoursArray[index] || 0} initMins={initHoursArray[index] || 0} />
		{/each}
	</div>
</div>
