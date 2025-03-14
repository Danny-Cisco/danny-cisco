<script>
	import { endTimeString } from '$lib/stores/timerStore';
	$: $endTimeString;
</script>

{#if $endTimeString}
	<div><h1 class="mt-8 text-4xl">{$endTimeString}</h1></div>
{/if}
