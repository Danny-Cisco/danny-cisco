<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let hueSegments = 36; // Default number of hue segments
	let lightnessSegments = 10; // Default number of lightness segments
	let saturation = 60; // Default saturation level

	let selectedColor = null;
	let showModal = false;
	let copySuccess = false;

	const selectColor = (h, l, s) => {
		selectedColor = `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
		showModal = true;
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(selectedColor);
		copySuccess = true;
		setTimeout(() => {
			copySuccess = false;
		}, 2000);
	};

	const closeModal = (event) => {
		if (event.key === 'Escape') {
			showModal = false;
		}
	};

	onMount(() => {
		window.addEventListener('keydown', closeModal);

		return () => {
			window.removeEventListener('keydown', closeModal);
		};
	});
</script>

<div class="fixed bottom-0 left-0 right-0 flex justify-between bg-black px-4 text-white">
	<div class="flex w-full flex-wrap justify-between">
		<label class="flex flex-1 items-center justify-center gap-2 whitespace-nowrap">
			<input type="number" bind:value={hueSegments} min="1" max="360" class="bg-gray-800" />
			HUE: #chips</label
		>
		<label class="flex flex-1 items-center justify-center gap-2 whitespace-nowrap">
			<input type="number" bind:value={saturation} min="0" max="100" class="bg-gray-800" />
			SAT: value%
		</label>
		<label class="flex flex-1 items-center justify-center gap-2 whitespace-nowrap">
			<input type="number" bind:value={lightnessSegments} min="1" max="100" class="bg-gray-800" />
			LIGHT: #chips
		</label>
	</div>

	{#if showModal}
		<div class="fixed h-full w-full bg-black/70"></div>
	{/if}
</div>

<div
	class="grid"
	style="grid-template-columns: repeat({hueSegments}, 1fr); grid-template-rows: repeat({lightnessSegments -
		1}, 1fr);"
	in:fade
>
	{#each Array(lightnessSegments - 1).fill(0) as _, y}
		<!-- Lightness loop (rows), ignoring the lightest row -->
		{#each Array(hueSegments).fill(0) as _, x}
			<!-- Hue loop (columns) -->
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				aria-label="color rectangle for seeing hsl color"
				class="color-box"
				style="background-color: hsl({(x * 360) / hueSegments}, {saturation}%, {100 -
					((y + 1) * 100) / lightnessSegments}%);"
				on:click={() =>
					selectColor(
						(x * 360) / hueSegments,
						100 - ((y + 1) * 100) / lightnessSegments,
						saturation
					)}
			></button>
		{/each}
	{/each}
</div>

{#if showModal}
	<div class="modal" on:click|self={() => (showModal = false)}>
		<button
			class="absolute -right-5 -top-10 mt-4 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-gray-700 text-white hover:bg-red-500"
			on:click={() => (showModal = false)}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</button>

		<p
			style="background-color: {selectedColor}; width: 300px; height: 400px; border: 1px solid black;"
		></p>
		<div class="h-10"></div>
		<div class="flex items-center justify-center gap-2 text-white">
			<p>{selectedColor}</p>
			<button
				on:click={copyToClipboard}
				class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-700"
				title="Copy to clipboard"
			>
				{#if copySuccess}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-5 text-green-500"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
						/>
					</svg>
				{/if}
			</button>
		</div>
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
		background: black;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
		text-align: center;
	}
</style>
