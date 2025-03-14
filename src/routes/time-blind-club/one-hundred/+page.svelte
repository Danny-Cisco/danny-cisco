<script>
	import { fade } from 'svelte/transition';
	import TimerCore from '$lib/components/timer-uis/TimerCore.svelte';
	import OneHundred from '$lib/components/timer-uis/OneHundred.svelte';
</script>

<div class="page" in:fade>
	<TimerCore debug={false} />
	<OneHundred />
</div>
