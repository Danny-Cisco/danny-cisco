<script>
	import { onMount, onDestroy } from 'svelte';

	import { requestNotificationPermission, playSound, getOneHourLater } from '$lib/utils/timer';
	import {
		startMs,
		endMs,
		durationMs,
		nowMs,
		isRunning,
		alarmIsRinging,
		durationMode,
		endTimeString
	} from '$lib/stores/timerStore.js';

	$: {
		$startMs;
		$endMs;
		$durationMs;
		$nowMs;
		$isRunning;
		$alarmIsRinging;
		$durationMode;
		$endTimeString;
	}
	export let debug = false;
	let timer1000;

	let timePickerValue;

	let ampm;

	let endTimeFull = new Date().toLocaleTimeString();
	$: if ($endMs) endTimeFull = new Date($endMs).toLocaleTimeString() || 0;

	$: if (endTimeFull.slice(-1, 999) == 'm') {
		// format Time string for safari browsers
		ampm = endTimeFull.slice(-2, 999);
		$endTimeString = endTimeFull.slice(-999, -6) + ' ' + ampm;
	}

	$: if (endTimeFull.slice(-1, 999) != 'm') {
		// format time string for chrome browsers
		parseInt(endTimeFull.slice(-999, -6));
		if (parseInt(endTimeFull.slice(-999, -6)) >= 12) {
			ampm = 'pm';
		} else if (parseInt(endTimeFull.slice(-999, -6)) < 12) {
			ampm = 'am';
		}
		let mins = endTimeFull.slice(-5, -3);
		let hours24 = endTimeFull.slice(-999, -6);
		let hours12 = hours24 % 12 || 12;
		$endTimeString = `${hours12}:${mins} ${ampm}`;
	}

	$: if ($alarmIsRinging) {
		if (Notification.permission === 'granted') {
			console.log('SENDING NOTIFICATION');
			playSound();

			new Notification('Time Blind Club', {
				body: 'Alarm Is Ringing!'
			});
		}
	}

	let permissionGranted = false;

	export function getNow() {
		$nowMs = Date.now();
	}

	export function start() {
		if ($endMs <= $nowMs) return;
		$startMs = Date.now();
		$alarmIsRinging = false;
		$isRunning = true;
	}

	export function stop() {
		$endMs = Date.now() + 60 * 60 * 1000;
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

	let durationMins = 45;

	$: $durationMs = durationMins * 60 * 1000;

	onMount(async () => {
		timer1000 = setInterval(() => getNow(), Math.trunc(1000 / 60));
		const date = new Date() + 1 * 60 * 60 * 1000;
		$endMs = date;
		timePickerValue = getOneHourLater();
		permissionGranted = requestNotificationPermission();
		$startMs = new Date().getTime();
	});

	onDestroy(() => {
		clearInterval(timer1000);
	});
</script>

<div class="flex w-full flex-col items-center justify-center px-4 pt-4">
	{#if debug}
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
			<p class="flex w-full justify-between">
				endTime <span>{endTimeString}</span>
			</p>
			{#if $alarmIsRinging}
				<p class="text-red-500">ALARM IS RINGING!!</p>
			{:else}
				<p class="text-gray-500">ALARM IS SILENT</p>
			{/if}
		</div>
	{/if}
	<div
		class="w-xs relative flex flex-col items-center rounded border p-4"
		class:border-red-500={!$durationMode && $endMs < $nowMs}
		class:border-dashed={!$durationMode && $endMs < $nowMs}
		class:invisible={$isRunning || $alarmIsRinging}
	>
		<div class="mb-4">
			<button
				on:click={() => {
					$durationMode = !$durationMode;
					$endMs = $nowMs + $durationMs;
					$startMs = $nowMs;
				}}
			>
				{#if $durationMode}
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

		{#if $durationMode}
			<label for="duration">
				<input type="number" class="bg-gray-700" bind:value={durationMins} />
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
</div>
