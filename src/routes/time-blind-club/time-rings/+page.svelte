<script>
	import EndTimeString from '$lib/components/timer-uis/EndTimeString.svelte';
	import RingTimerDiscs from '$lib/components/timer-uis/RingTimerDiscs.svelte';
	import TimerCore from '$lib/components/timer-uis/TimerCore.svelte';
</script>

<div class="page">
	<TimerCore />
	<RingTimerDiscs />
	<EndTimeString />
</div>
