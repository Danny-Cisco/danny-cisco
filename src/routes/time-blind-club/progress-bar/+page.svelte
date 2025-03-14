<script>
	import { fade } from 'svelte/transition';
	import TimerCore from '$lib/components/timer-uis/TimerCore.svelte';
	import ProgressBar from '$lib/components/timer-uis/ProgressBar.svelte';
</script>

<div class="page" in:fade>
	<TimerCore debug={true} />
	<ProgressBar />
</div>
