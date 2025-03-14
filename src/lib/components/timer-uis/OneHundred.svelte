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

	const gridSize = 10;
	let squares = Array(gridSize * gridSize).fill(1);

	$: if ($isRunning) {
		let progress = ($endMs - $nowMs) / ($endMs - $startMs);
		let fadedSquares = Math.floor((1 - progress) * squares.length);
		squares = squares.map((_, index) => (index < fadedSquares ? 0 : 1));
	} else if ($alarmIsRinging) {
		squares = squares.map(() => 0);
	} else {
		squares = squares.map(() => 1);
	}
</script>

<!-- 10x10 grid -->
<div class="grid">
	{#each squares as square, index}
		<div class="square {square ? '' : 'faded'}"></div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: 2px;
		width: 100%;
		max-width: 400px;
		aspect-ratio: 1;
	}
	.square {
		width: 100%;
		aspect-ratio: 1;
		background-color: blue;
		transition: background-color 0.5s ease-in-out;
	}
	.square:hover {
		transform: rotate(15deg);
	}
	.square.faded {
		background-color: gray;
		transform: rotate(15deg);
	}
</style>
