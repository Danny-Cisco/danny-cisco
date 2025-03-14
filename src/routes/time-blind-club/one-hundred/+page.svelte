<script>
	import { fade } from 'svelte/transition';
	import TimerCore from '$lib/components/timer-uis/TimerCore.svelte';
	import OneHundred from '$lib/components/timer-uis/OneHundred.svelte';
	import EndTimeString from '$lib/components/timer-uis/EndTimeString.svelte';
</script>

<div class="page" in:fade>
	<TimerCore debug={false} />
	<OneHundred />
	<EndTimeString />
</div>
