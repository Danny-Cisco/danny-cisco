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
	import { onDestroy, onMount } from 'svelte';

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

	let interval = null;

	let nowSeconds = 0;
	let nowMins = 120;
	$: nowMins = ($nowMs - $startMs) / 1000 / 60;

	$: nowSeconds = Math.trunc($nowMs - $startMs / 1000);

	let initHoursArray = [];
	$: console.log('🚀 ~ initHoursArray:', initHoursArray);
	let hoursArray = [];
	$: console.log('🚀 ~ hoursArray:', hoursArray);

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

	function onChange() {
		if (!$isRunning) {
			for (let i = 0; i < numberOfDiscs; i++) {
				if (i < currentDisc) {
					initHoursArray[i] = 60; // make all the discs 60
				} else if (i > currentDisc) {
					if (!$isRunning) initHoursArray[i] = 60;
					else initHoursArray[i] = 0;
				} else if (i == currentDisc) {
					if (!$isRunning)
						initHoursArray[i] =
							Math.round((($endMs - $startMs - ($nowMs - $startMs)) / 1000 / 60) % 60) || 0;
					else
						initHoursArray[i] =
							Math.round((($endMs - $startMs - ($nowMs - $startMs)) / 1000 / 60) % 60) || 0;
				}
			}
		} else {
			for (let i = 0; i < numberOfDiscs; i++) {
				if (i < currentDisc) {
					hoursArray[i] = 60; // make all the discs 60
				} else if (i > currentDisc) {
					if (!$isRunning) hoursArray[i] = 60;
					else hoursArray[i] = 60;
				} else if (i == currentDisc) {
					if (!$isRunning)
						hoursArray[i] =
							Math.round((($endMs - $startMs - ($nowMs - $startMs)) / 1000 / 60) % 60) || 0;
					// make the last disc the remainder or 60 if no remainder
					else
						hoursArray[i] =
							Math.round((($endMs - $startMs - ($nowMs - $startMs)) / 1000 / 60) % 60) || 0;
				}
			}
		}
	}

	$: nowMins = ($nowMs - $startMs) / 1000 / 60;

	onMount(() => {
		interval = setInterval(onChange, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="block flex flex-col items-center justify-start pt-10">
	<div class="flex flex-row-reverse flex-wrap items-center justify-center">
		{#key initHoursArray}
			{#each initHoursArray as mins, index}
				<FullCircle nowMins={hoursArray[index] || 0} initMins={mins || 0} />
			{/each}
		{/key}
	</div>
</div>
