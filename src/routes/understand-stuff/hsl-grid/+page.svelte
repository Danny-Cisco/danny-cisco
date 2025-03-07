<script>
	import { onMount } from 'svelte';

	let hueSegments = 36; // Default number of hue segments
	let lightnessSegments = 10; // Default number of lightness segments
	let saturation = 60; // Default saturation level

	let selectedColor = null;
	let showModal = false;

	const selectColor = (h, l, s) => {
		selectedColor = `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
		navigator.clipboard.writeText(selectedColor);
		showModal = true;
	};

	const closeModal = (event) => {
		if (event.key === 'Escape') {
			showModal = false;
		}
	};

	onMount(() => {
		window.addEventListener('keydown', closeModal);
	});
</script>

<div class="fixed bottom-0 left-0 right-0 flex justify-between bg-black px-4 text-white">
	<label>
		Hue Chips:
		<input type="number" bind:value={hueSegments} min="1" max="360" class="bg-gray-800" />
	</label>
	<label>
		Lightness Chips:
		<input type="number" bind:value={lightnessSegments} min="1" max="100" class="bg-gray-800" />
	</label>
	<label>
		Saturation:
		<input type="number" bind:value={saturation} min="0" max="100" class="bg-gray-800" />
	</label>
</div>

<div
	class="grid"
	style="grid-template-columns: repeat({hueSegments}, 1fr); grid-template-rows: repeat({lightnessSegments -
		1}, 1fr);"
>
	{#each Array(lightnessSegments - 1).fill(0) as _, y}
		<!-- Lightness loop (rows), ignoring the lightest row -->
		{#each Array(hueSegments).fill(0) as _, x}
			<!-- Hue loop (columns) -->
			<div
				class="color-box"
				style="background-color: hsl({(x * 360) / hueSegments}, {saturation}%, {100 -
					((y + 1) * 100) / lightnessSegments}%);"
				on:click={() =>
					selectColor(
						(x * 360) / hueSegments,
						100 - ((y + 1) * 100) / lightnessSegments,
						saturation
					)}
			></div>
		{/each}
	{/each}
</div>

{#if showModal}
	<div class="modal" on:click={() => (showModal = false)}>
		<p>{selectedColor}</p>
		<p
			style="background-color: {selectedColor}; width: 100%; height: 50px; border: 1px solid black;"
		></p>
		<button class="btn mt-4" on:click={() => (showModal = false)}>Close</button>
	</div>
{/if}

<style>
	.grid {
		display: grid;
		width: 100vw;
		height: 90vh;
		gap: 1px;
	}
	.color-box {
		cursor: pointer;
		transition: transform 0.1s;
	}
	.color-box:hover {
		transform: scale(1.1);
		border: 1px solid black;
	}
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
		text-align: center;
	}
</style>
