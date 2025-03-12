<script>
	import { onMount, onDestroy } from 'svelte';

	import { writable } from 'svelte/store';

	const startMs = writable(0);
	const nowMs = writable(0);
	const endMs = writable(0);

	const durationMs = writable(5000);

	const isRunning = writable(false);
	const alarmIsRinging = writable(false);
	const durationMode = writable(false);

	let timer1000;

	let timePickerValue;

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
		nowMs.set(Date.now());
	}

	export function start() {
		startMs.set(Date.now());
		$alarmIsRinging = false;
		$isRunning = true;
	}

	export function stop() {
		endMs.set(Date.now());
		$isRunning = false;
		$alarmIsRinging = false;
	}

	$: if ($durationMode) {
		$endMs = $startMs + $durationMs;
	}
	$: if (!$durationMode) {
		$endMs = new Date(timePickerValue).getTime();
	}

	$: if ($nowMs >= $endMs) {
		if ($isRunning) {
			$isRunning = false;
			$alarmIsRinging = true;
		}
	}

	onMount(async () => {
		timer1000 = setInterval(() => getNow(), 100);
		const date = new Date() + 1 * 60 * 60 * 1000;
		$endMs = date;
		timePickerValue = getOneHourLater();
	});

	onDestroy(() => {
		clearInterval(timer1000);
	});
</script>

<div class="flex w-full flex-col items-center justify-center px-4 pt-4">
	<div class="w-xs m-4 flex flex-col items-center gap-2 rounded border p-4 px-10">
		{#if $isRunning}
			<p class="text-green-500">TIMER IS RUNNING</p>
		{:else}
			<p class="text-gray-500">TIMER STOPPED</p>
		{/if}
		<p class="flex w-full justify-between">
			start <span>{$startMs}</span>
		</p>
		<p class="flex w-full justify-between">
			now <span>{$nowMs}</span>
		</p>
		<p class="flex w-full justify-between">
			end <span>{$endMs}</span>
		</p>
		{#if $alarmIsRinging}
			<p class="text-red-500">ALARM IS RINGING!!</p>
		{:else}
			<p class="text-gray-500">ALARM IS SILENT</p>
		{/if}
	</div>
	<div class="w-xs flex flex-col items-center rounded border p-4">
		<div class="mb-4">
			<button
				on:click={() => {
					$durationMode = !$durationMode;
				}}
			>
				{#if $durationMode}
					<div class="flex gap-2">
						<p class="text-gray-600">END TIME</p>
						<p>~</p>
						<p class="text-white">DURATION</p>
					</div>
				{:else}
					<div class="flex gap-2">
						<p class="text-white">END TIME</p>
						<p>~</p>
						<p class="text-gray-600">DURATION</p>
					</div>
				{/if}
			</button>
		</div>
		{#if $durationMode}
			<label for="duration">
				<input type="number" class="bg-gray-700" bind:value={$durationMs} />
			</label>
		{:else}
			<label for="endTime">
				<input type="datetime-local" class="bg-gray-700" bind:value={timePickerValue} />
			</label>
		{/if}
	</div>

	<div class="flex gap-4 p-2">
		<button class="hover:text-green-500" on:click={start}>[Start]</button>
		<button class="hover:text-red-500" on:click={stop}>[Stop]</button>
	</div>

	<div class="relative h-10 w-full overflow-hidden rounded-full">
		<div class="absolute inset-0 bg-gray-500"></div>
	</div>
</div>
