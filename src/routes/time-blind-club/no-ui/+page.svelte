<script>
	import { onMount, onDestroy } from 'svelte';

	import { writable } from 'svelte/store';

	let startMs = 0;
	let nowMs = 0;
	let endMs = 0;

	let durationMs = 5000;

	let isRunning = false;
	let alarmIsRinging = false;
	let durationMode = false;

	let timer1000;

	let timePickerValue;

	let barWidth = 50;
	let barClass = '';

	let endTimeString = '';

	let endTimeFull = '';
	$: endTimeFull = new Date(endMs).toLocaleTimeString();
	$: console.log('🚀 ~ endTimeFull:', endTimeFull);

	$: endTimeString = endTimeFull; // for now lets see the full string on mobile

	function getOneHourLater() {
		// this function loads the time picker with a value 1 hour from the clients local time
		let oneHour = new Date().getTime() + 1 * 60 * 60 * 1000;
		let oneHourString = new Date(oneHour).toISOString().slice(0, 16);
		let tz = new Date().getTimezoneOffset() / 60;
		let tzHour = Math.trunc(tz); // removes decimals
		let tzMin = tz % 1; // extracts only decimals
		tzMin = Math.abs(tzMin); // removes sign from decimal
		tzMin = tzMin * 60; // turns decimal hours into minutes
		if (!tzMin) tzMin = '00';
		let tzString = `${tzHour}:${tzMin}`;
		let finalString = new Date(oneHourString + tzString).toISOString().slice(0, 16);
		return finalString;
	}

	export function getNow() {
		nowMs = Date.now();
	}

	export function start() {
		if (endMs <= nowMs) return;
		startMs = Date.now();
		alarmIsRinging = false;
		isRunning = true;
	}

	export function stop() {
		endMs = Date.now() + 60 * 60 * 1000;
		isRunning = false;
		alarmIsRinging = false;
	}

	$: if (durationMode) {
		endMs = startMs + durationMs;
	}
	$: if (!durationMode) {
		endMs = new Date(timePickerValue).getTime();
	}

	$: if (nowMs >= endMs) {
		if (isRunning) {
			isRunning = false;
			alarmIsRinging = true;
		}
	}

	$: if (isRunning) {
		barWidth = ((endMs - nowMs) / (endMs - startMs)) * 100;
	} else if (alarmIsRinging) barWidth = 0;
	else barWidth = 100;

	onMount(async () => {
		timer1000 = setInterval(() => getNow(), Math.trunc(1000 / 60));
		const date = new Date() + 1 * 60 * 60 * 1000;
		endMs = date;
		timePickerValue = getOneHourLater();
	});

	onDestroy(() => {
		clearInterval(timer1000);
	});
</script>

<div class="flex w-full flex-col items-center justify-center px-4 pt-4">
	<div class="w-xs m-4 flex flex-col items-center gap-2 rounded border p-4 px-10">
		{#if isRunning}
			<p class="text-green-500">TIMER IS RUNNING</p>
		{:else}
			<p class="text-gray-500">TIMER STOPPED</p>
		{/if}
		<p class="flex w-full justify-between">
			start <span>{startMs}</span>
		</p>
		<p class="flex w-full justify-between">
			now <span>{nowMs}</span>
		</p>
		<p class="flex w-full justify-between">
			end <span>{endMs}</span>
		</p>
		<p class="flex w-full justify-between">
			endTime <span>{endTimeString}</span>
		</p>
		{#if alarmIsRinging}
			<p class="text-red-500">ALARM IS RINGING!!</p>
		{:else}
			<p class="text-gray-500">ALARM IS SILENT</p>
		{/if}
	</div>
	<div
		class="w-xs relative flex flex-col items-center rounded border p-4"
		class:border-red-500={!durationMode && endMs < nowMs}
	>
		{#if isRunning}
			<div class="z-1 absolute inset-0 bg-transparent"></div>
		{/if}
		<div class="mb-4">
			<button
				on:click={() => {
					durationMode = !durationMode;
					endMs = nowMs + durationMs;
					startMs = nowMs;
				}}
			>
				{#if durationMode}
					<div class="flex gap-2">
						<p class="text-gray-600 hover:text-white">END TIME</p>
						<p>~</p>
						<p class="text-white">DURATION</p>
					</div>
				{:else}
					<div class="flex gap-2">
						<p class="text-white">END TIME</p>
						<p>~</p>
						<p class="text-gray-600 hover:text-white">DURATION</p>
					</div>
				{/if}
			</button>
		</div>
		{#if durationMode}
			<label for="duration">
				<input type="number" class="bg-gray-700" bind:value={durationMs} />
			</label>
		{:else}
			<label for="endTime">
				<input type="datetime-local" class="bg-gray-700" bind:value={timePickerValue} />
			</label>
		{/if}
	</div>

	<div class="flex gap-4 p-2">
		<button class="hover:text-green-500" on:click={start}>[START]</button>
		<button class="hover:text-red-500" on:click={stop}>[STOP]</button>
	</div>

	<div class="relative h-10 w-full overflow-hidden rounded-full">
		<div class="absolute inset-0 bg-gray-500"></div>
		<div class="absolute bottom-0 left-0 top-0 bg-blue-500" style="width: {barWidth}%"></div>
	</div>
</div>
