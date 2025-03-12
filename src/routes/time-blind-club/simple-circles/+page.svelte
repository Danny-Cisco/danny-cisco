<script>
	import { onMount, onDestroy } from 'svelte';
	// Import FullCircle component
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';

	// Timer state variables
	let startMs = 0;
	let nowMs = 0;
	let endMs = 0;
	let durationMs = 5000;
	let durationMins = 60; // Default 60 minutes

	let isRunning = false;
	let alarmIsRinging = false;
	let durationMode = true; // Default to duration mode
	let timer1000;
	let timePickerValue;

	// Circle calculation variables
	let nowMins = 0;
	let seconds = 0;
	let hoursArray = [];
	let initHoursArray = [];
	let numberOfDiscs = 0;
	let currentDisc = 0;

	let buttonLabel = 'START';

	// Time calculations
	$: endTimeFull = new Date(endMs).toLocaleTimeString();
	$: endTimeString = endTimeFull;

	// Calculate minutes remaining for circle display
	$: {
		if (isRunning) {
			nowMins = Math.max(0, Math.floor((endMs - nowMs) / 60000));
		} else {
			if (durationMode) {
				nowMins = durationMins;
			} else {
				nowMins = Math.max(0, Math.floor((endMs - nowMs) / 60000));
			}
		}
	}

	// Update seconds for blinking effect
	$: seconds = Math.floor(nowMs / 1000) % 60;

	// Calculate number of discs based on duration
	$: {
		if (durationMode) {
			numberOfDiscs = Math.ceil(durationMins / 60);
		} else {
			numberOfDiscs = Math.ceil(nowMins / 60);
		}
	}

	// Calculate current disc
	$: currentDisc = Math.floor(nowMins / 60);

	// Fill the hoursArray based on current state
	$: {
		hoursArray = [];
		for (let i = 0; i < numberOfDiscs; i++) {
			if (i < currentDisc) {
				hoursArray[i] = 60; // make all previous discs 60
			} else if (i > currentDisc) {
				if (!isRunning) hoursArray[i] = 60;
				else hoursArray[i] = 0;
			} else if (i === currentDisc) {
				if (!isRunning)
					hoursArray[i] = Math.round(nowMins % 60) || 60; // make the last disc the remainder or 60 if no remainder
				else hoursArray[i] = Math.round(nowMins % 60);
			}
		}
	}

	// Fill the initHoursArray
	$: {
		if (!isRunning) {
			initHoursArray = [];
			for (let i = 0; i < numberOfDiscs; i++) {
				if (i < currentDisc) {
					initHoursArray[i] = 60; // make all the discs 60
				} else if (i > currentDisc) {
					initHoursArray[i] = 60;
				} else if (i === currentDisc) {
					initHoursArray[i] = Math.round(durationMins % 60) || 60; // make the last disc the remainder or 60 if no remainder
				}
			}
		}
	}

	// Alarm notification logic
	$: if (alarmIsRinging) {
		if (Notification.permission === 'granted') {
			playSound();
			new Notification('Time Blind Club', {
				body: 'Alarm Is Ringing!'
			});
		}
	}

	// Update durationMins when durationMs changes
	$: durationMins = Math.floor(durationMs / 60000);

	// Update buttonLabel based on timer state
	$: buttonLabel = isRunning ? 'STOP' : 'START';

	// Update end time based on modes
	$: if (durationMode) {
		endMs = startMs + durationMs;
	} else if (timePickerValue) {
		endMs = new Date(timePickerValue).getTime();
	}

	// Check if timer has ended
	$: if (nowMs >= endMs) {
		if (isRunning) {
			isRunning = false;
			alarmIsRinging = true;
		}
	}

	function getNow() {
		nowMs = Date.now();
	}

	function toggleTimer() {
		if (isRunning) {
			stop();
		} else {
			start();
		}
	}

	function start() {
		if (endMs <= nowMs) return;
		startMs = Date.now();
		alarmIsRinging = false;
		isRunning = true;
	}

	function stop() {
		isRunning = false;
		alarmIsRinging = false;
		if (durationMode) {
			// Reset state for duration mode
			startMs = nowMs;
			endMs = startMs + durationMs;
		} else {
			// Keep end time for time picker mode
		}
	}

	function toggleEndTimeMode() {
		durationMode = !durationMode;
		if (durationMode) {
			durationMs = durationMins * 60000; // Convert minutes to milliseconds
			startMs = nowMs;
			endMs = startMs + durationMs;
		} else {
			// Initialize time picker if not set
			if (!timePickerValue) {
				timePickerValue = getOneHourLater();
			}
		}
	}

	function getOneHourLater() {
		// This function loads the time picker with a value 1 hour from the clients local time
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

	function playSound() {
		const context = new (window.AudioContext || window.webkitAudioContext)();
		const oscillator = context.createOscillator();
		const gainNode = context.createGain(); // To avoid pops

		oscillator.type = 'sine'; // Change to "square", "sawtooth", "triangle" for different effects
		oscillator.connect(gainNode);
		gainNode.connect(context.destination);

		let startTime = context.currentTime; // Start time
		let frequency = 250; // Start frequency
		let stepDuration = 0.1; // Each step lasts 100ms (0.1 seconds)
		let maxFrequency = 4000;

		// Schedule stepped frequency changes
		for (let i = 0; frequency <= maxFrequency; i++) {
			let stepTime = startTime + i * stepDuration; // Schedule each step 100ms apart
			oscillator.frequency.setValueAtTime(frequency, stepTime);
			frequency *= 2; // Double the frequency each step
		}

		oscillator.start();
		oscillator.stop(startTime + Math.log2(maxFrequency / 250) * stepDuration); // Stop when done
	}

	function requestNotificationPermission() {
		if ('Notification' in window) {
			Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					console.log('Notifications are allowed!');
				} else {
					console.log('Notifications are blocked!');
				}
			});
		} else {
			console.log('This browser does not support notifications.');
		}
	}

	function handleEndTimeChange(event) {
		timePickerValue = event.target.value;
	}

	onMount(() => {
		timer1000 = setInterval(() => getNow(), Math.trunc(1000 / 60));
		const date = new Date(Date.now() + 1 * 60 * 60 * 1000);
		endMs = date.getTime();
		timePickerValue = getOneHourLater();
		requestNotificationPermission();
		startMs = nowMs;
	});

	onDestroy(() => {
		clearInterval(timer1000);
	});

	// Style variables
	let runningBg = 'hsl(200, 50%, 12%)';
	let midGrayText = 'hsl(200, 50%, 30%)';
</script>

<div class="flex w-full flex-col items-center justify-center px-4 pt-4">
	<!-- Debug info (can be removed or hidden in production) -->
	<div class="w-xs m-4 flex flex-col items-center gap-2 rounded border p-4 px-10">
		<p class="text-{isRunning ? 'green' : 'gray'}-500">
			TIMER {isRunning ? 'IS RUNNING' : 'STOPPED'}
		</p>
		<p class="flex w-full justify-between">
			Time Remaining <span>{nowMins} mins</span>
		</p>
		<p class="flex w-full justify-between">
			End Time <span>{endTimeString}</span>
		</p>
		{#if alarmIsRinging}
			<p class="text-red-500">ALARM IS RINGING!!</p>
		{:else}
			<p class="text-gray-500">ALARM IS SILENT</p>
		{/if}
	</div>

	<!-- Timer display with blinking effect -->
	<div class="relative w-full text-center">
		{#key seconds}
			<div
				class="p-1 text-center font-mono text-xl"
				class:hidden={seconds % 2 !== 0}
				style="color: hsl(200, 50%, 80%);"
			>
				{nowMins} mins
			</div>
			<div
				class="p-1 text-center font-mono text-xl"
				class:hidden={seconds % 2 === 0}
				style="color:hsl(200, 50%, 27%)"
			>
				{nowMins} mins
			</div>
		{/key}
	</div>

	<!-- Timer controls -->
	<div class="block flex flex-col items-center justify-start">
		<div class="flex w-full flex-col items-center justify-center gap-2">
			<!-- Timer configuration section (hidden when running) -->
			<div
				class="w-xs relative flex flex-col items-center rounded border p-4"
				class:invisible={isRunning || alarmIsRinging}
			>
				<div class="mb-4">
					<button on:click={toggleEndTimeMode}>
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
						<input
							type="number"
							class="w-50 rounded-full bg-gray-700 p-2 px-5 text-xl"
							bind:value={durationMins}
						/>
					</label>
				{:else}
					<label for="endTime">
						<input
							type="datetime-local"
							class="w-50 rounded-full bg-gray-700 p-2 px-5 text-xl"
							bind:value={timePickerValue}
							on:input={handleEndTimeChange}
						/>
					</label>
				{/if}
			</div>

			<!-- Start/Stop button -->
			<button
				on:click={toggleTimer}
				class="mt-4 w-[200px] rounded-full p-4 text-xl font-bold shadow hover:bg-gray-500 hover:text-white"
				style="background-color: {isRunning ? runningBg : 'hsl(200, 50%, 80%)'}; color: {isRunning
					? 'white'
					: 'black'};"
			>
				{buttonLabel}
			</button>
		</div>

		<!-- Circle timer visualization -->
		<div class="mt-8 flex flex-wrap items-center justify-center">
			{#each initHoursArray as mins, index}
				<FullCircle nowMins={hoursArray[index] || 0} initMins={initHoursArray[index] || 0} />
			{/each}
		</div>
	</div>
</div>
