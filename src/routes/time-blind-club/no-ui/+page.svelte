<script>
	import { onMount, onDestroy } from 'svelte';
	import { timerStore } from '$lib/stores/timerStore.js';

	// Destructure what we need from the store
	const { startMs, nowMs, endMs, getNow, initializeDates, startClock, stopClock } = timerStore;

	// Watch the store values with $ prefix
	$: console.log('🚀 ~ startMs:', $startMs);
	$: console.log('🚀 ~ nowMs:', $nowMs);
	$: console.log('🚀 ~ endMs:', $endMs);

	onMount(() => {
		// Initialize dates
		initializeDates();

		// Start the clock
		startClock();
	});

	onDestroy(() => {
		// Clean up the interval when component is destroyed
		stopClock();
	});
</script>

<div class="mt-4 flex w-full flex-col items-center">
	<h1 class="text-center">No Ui</h1>
	<button class="btn" on:click={getNow}>getNow</button>
</div>
