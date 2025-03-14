<script>
	import { fade } from 'svelte/transition';
	import TimerCore from '$lib/components/timer-uis/TimerCore.svelte';
	import ProgressBar from '$lib/components/timer-uis/ProgressBar.svelte';
	import EndTimeString from '$lib/components/timer-uis/EndTimeString.svelte';
</script>

<div class="page" in:fade>
	<TimerCore debug={false} />
	<ProgressBar />
	<EndTimeString />
</div>
