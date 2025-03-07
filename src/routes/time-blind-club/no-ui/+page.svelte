<script>
	import { onMount } from 'svelte';

	let startDateObj = null;
	let nowDateObj = null;
	let endDateObj = null;

	let startMs;
	$: startMs = startDateObj?.getTime();
	$: console.log('🚀 ~ startMs:', startMs);

	let nowMs;
	$: nowMs = nowDateObj?.getTime();
	$: console.log('🚀 ~ nowMs:', nowMs);

	let endMs;
	$: endMs = endDateObj?.getTime();
	$: console.log('🚀 ~ endMs:', endMs);

	onMount(async () => {
		nowDateObj = new Date();
		startDateObj = new Date();
		endDateObj = new Date();
	});
</script>

<div class="mt-4 flex w-full flex-col items-center">
	<h1 class="text-center">No Ui</h1>
	<button class="btn" on:click={() => (nowDateObj = new Date())}>getNow</button>
</div>
