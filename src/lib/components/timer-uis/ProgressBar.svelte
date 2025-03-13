<script>
	import {
		startMs,
		endMs,
		durationMs,
		nowMs,
		isRunning,
		alarmIsRinging,
		durationMode
	} from '$lib/stores/timerStore.js';

	$: {
		$startMs;
		$endMs;
		$durationMs;
		$nowMs;
		$isRunning;
		$alarmIsRinging;
		$durationMode;
	}
	let barWidth = 50;
	let barClass = '';

	$: if ($isRunning) {
		barWidth = (($endMs - $nowMs) / ($endMs - $startMs)) * 100;
	} else if ($alarmIsRinging) barWidth = 0;
	else barWidth = 100;
</script>

<!-- progress bar -->
<div class="relative mt-8 h-10 w-full max-w-4xl overflow-hidden rounded-full">
	<div class="absolute inset-0 bg-gray-500"></div>
	<div class="absolute bottom-0 left-0 top-0 bg-blue-500" style="width: {barWidth}%"></div>
</div>
