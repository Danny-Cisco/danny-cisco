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

	let minutes = 0;
	let durationMins = 0;

	let interval = null;

	let nowSeconds = 0;
	let nowMins = 120;
	$: nowMins = ($nowMs - $startMs) / 1000 / 60;

	$: nowSeconds = Math.trunc($nowMs - $startMs / 1000);

	let initHoursArray = [];
	let hoursArray = [];

	let numberOfDiscs = 0;
	let currentDisc = 0;
	$: numberOfDiscs = Math.min(Math.trunc(durationMins / 60), 9); // set a maximum disc number to avoid excess memory

	$: durationMins = Math.round(($endMs - $startMs) / 1000 / 60);

	$: if (durationMins % 60) {
		numberOfDiscs += 1; // add a disc if there is a partial disc left
	}

	function clearArrays() {
		hoursArray = []; // clear the hoursArray if user sets new the duration
		initHoursArray = []; // clear the hoursArray if user sets new the duration
		minutes = 0;
	}

	$: currentDisc = Math.max(Math.trunc(nowMins / 60), 0);
	$: nowMins = ($endMs - $nowMs) / 1000 / 60;

	function onChange() {
		if (!$isRunning) {
			clearArrays();

			for (let i = 0; i < numberOfDiscs; i++) {
				if (i < currentDisc) {
					initHoursArray[i] = 60;
				} else if (i > currentDisc) {
					initHoursArray[i] = 60;
				} else if (i == currentDisc) {
					initHoursArray[i] =
						Math.round((($endMs - $startMs - ($nowMs - $startMs)) / 1000 / 60) % 60) || 0;
				}
				hoursArray = initHoursArray;
			}
		} else {
			for (let i = 0; i < numberOfDiscs; i++) {
				if (i < currentDisc) {
					hoursArray[i] = 60;
				} else if (i > currentDisc) {
					hoursArray[i] = 0;
				} else if (i == currentDisc) {
					hoursArray[i] =
						Math.round((($endMs - $startMs - ($nowMs - $startMs)) / 1000 / 60) % 60) || 0;
				}
			}
		}
	}

	onMount(() => {
		interval = setInterval(onChange, 100);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="block flex flex-col items-center justify-start pt-10">
	<div class="flex flex-wrap items-center justify-center">
		{#key initHoursArray}
			{#each initHoursArray as mins, index}
				<FullCircle nowMins={hoursArray[index] || 0} initMins={mins || 0} />
			{/each}
		{/key}
	</div>
</div>
