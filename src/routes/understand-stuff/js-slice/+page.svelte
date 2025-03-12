<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let inputArray = writable(`["go", "to", "hell", "in", "a", "basket"]`);
	let startIndex = writable(0);
	let endIndex = writable(5);
	let slicedArray = writable([]);
	let originalArray = writable([]); // Stores parsed array or string
	let coloredElements = writable([]); // Tracks if each index should be kept

	function updateSlice(startIndex, endIndex) {
		try {
			let parsedInput;
			let isString = false;
			// Attempt to parse JSON input
			try {
				parsedInput = JSON.parse($inputArray);
			} catch {
				isString = true;
				parsedInput = $inputArray; // Treat as a string if parsing fails
			}

			// Ensure input is valid for slicing
			if (Array.isArray(parsedInput) || typeof parsedInput === 'string') {
				originalArray.set(parsedInput); // Store full input

				// Handle negative indices correctly
				let adjustedStart = startIndex < 0 ? parsedInput.length + startIndex : startIndex;
				let adjustedEnd = endIndex < 0 ? parsedInput.length + endIndex : endIndex;

				// Apply slice()
				let result = parsedInput.slice(adjustedStart, adjustedEnd);
				slicedArray.set(result);

				let comparison;
				if (isString) {
					// Generate array that checks if each item at a position is kept
					comparison = parsedInput.split('').map((item, index) => ({
						char: item,
						kept: index >= adjustedStart && index < adjustedEnd // Check if within slice bounds
					}));
				} else {
					// ADD THE SAME CODE HERE FOR REGULAR ARRAYS
					comparison = parsedInput.map((item, index) => ({
						char: item,
						kept: index >= adjustedStart && index < adjustedEnd // Check if within slice bounds
					}));
				}

				coloredElements.set(comparison);
			} else {
				originalArray.set([]);
				slicedArray.set('Invalid input2');
				coloredElements.set([]);
			}
		} catch (e) {
			originalArray.set([]);
			slicedArray.set('Invalid input1');
			coloredElements.set([]);
		}
	}

	onMount(() => {
		updateSlice($startIndex, $endIndex);
	});

	$: if ($inputArray) updateSlice($startIndex, $endIndex);
</script>

<div class="mx-auto flex max-w-xl flex-col gap-4">
	<h1 class="mb-4 mt-4 text-center text-xl font-bold">JavaScript Slice() Demo</h1>

	<label class="mb-2 flex items-center text-xl">
		myArray=
		<input bind:value={$inputArray} class="w-full border p-2" />
	</label>
	<div class="flex items-center text-xl">
		<p>myArray.slice(</p>
		<input type="number" bind:value={$startIndex} class="w-15 border" />

		<input type="number" bind:value={$endIndex} class="w-15 border" />
		<p>) <span class="text-xs">*Hint* Try negative numbers too!!</span></p>
	</div>

	<div class="mb-4">
		<div class="mt-2 flex flex-wrap gap-2 text-2xl">
			{#each $coloredElements as item}
				<span
					class="min-w-10 rounded px-3 py-1 text-white"
					class:bg-green-600={item.kept}
					class:bg-red-500={!item.kept}
				>
					{item.char}
				</span>
			{/each}
		</div>
	</div>

	<div class="rounded border p-4">
		<pre>{$slicedArray}</pre>
	</div>
</div>
