<script>
	import { onMount } from 'svelte';

	let hueDiv = 10; // Default hue divisions
	let lightnessDiv = 10; // Default lightness divisions
	let saturation = 50; // Default saturation level

	let selectedColor = null;
	let showModal = false;

	const selectColor = (h, l, s) => {
		selectedColor = `hsl(${h}, ${s}%, ${l}%)`;
		showModal = true;
	};
</script>

<div>
	<label>Hue Division: <input type="number" bind:value={hueDiv} min="1" max="360" /></label>
	<label
		>Lightness Division: <input type="number" bind:value={lightnessDiv} min="1" max="100" /></label
	>
	<label>Saturation: <input type="number" bind:value={saturation} min="0" max="100" /></label>
</div>

<div
	class="grid"
	style="grid-template-columns: repeat({360 / hueDiv}, 1fr); grid-template-rows: repeat({100 /
		lightnessDiv}, 1fr);"
>
	{#each Array(100 / lightnessDiv).fill(0) as _, y}
		<!-- Lightness loop (rows) -->
		{#each Array(360 / hueDiv).fill(0) as _, x}
			<!-- Hue loop (columns) -->
			<div
				class="color-box"
				style="background-color: hsl({x * hueDiv}, {saturation}%, {100 - y * lightnessDiv}%);"
				on:click={() => selectColor(x * hueDiv, 100 - y * lightnessDiv, saturation)}
			></div>
		{/each}
	{/each}
</div>

{#if showModal}
	<div class="modal" on:click={() => (showModal = false)}>
		<p>Selected Color: {selectedColor}</p>
		<p
			style="background-color: {selectedColor}; width: 100px; height: 50px; border: 1px solid black;"
		></p>
		<button on:click={() => (showModal = false)}>Close</button>
	</div>
{/if}

<style>
	.grid {
		display: grid;
		width: 100vw;
		height: 100vh;
		gap: 1px;
	}
	.color-box {
		cursor: pointer;
		transition: transform 0.1s;
	}
	.color-box:hover {
		transform: scale(1.1);
		border: 1px solid white;
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
