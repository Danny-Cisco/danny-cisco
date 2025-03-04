<script>
	import FullCircle from '$lib/components/ring-timer/FullCircle.svelte';
	let nowMins = 27;
</script>

<div class="h-full w-full bg-black">
	<input type="number" bind:value={nowMins} />
	<div class="flex h-full flex-col items-center justify-center">
		{#key nowMins}
			<FullCircle {nowMins} />
		{/key}
	</div>
</div>
