<script>
	import { onMount } from 'svelte';
	// Exposed variables for user control
	export let saturation = 75; // Range: 0 - 100
	export let lightness = 55; // Range: 0 - 100
	export let hue1 = 300; // First color hue (user can edit)

	// Light mode / Dark mode state
	let isDarkMode = true;

	// User-typed HSL input for practice
	let typedHue = 220;
	let typedSaturation = 60;
	let typedLightness = 40;

	let boxSize = '10px';
	// $: console.log('🚀 ~ boxSize:', boxSize);

	let boxCss = '';
	$: if (boxSize) boxCss = ` width: ${boxSize}; height: ${boxSize}; `;

	// $: console.log('🚀 ~ boxClass:', boxClass);

	// Hue values in 30 degree increments
	const hueValues = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];

	// Names for the hue values
	const hueNames = [
		'RED',
		'RED-YELLOW',
		'YELLOW',
		'YELLOW-GREEN',
		'GREEN',
		'GREEN-CYAN',
		'CYAN',
		'CYAN-BLUE',
		'BLUE',
		'BLUE-MAGENTA',
		'MAGENTA',
		'MAGENTA-RED',
		'RED'
	];

	// Function to set the hue from a button
	function setHue(hueValue) {
		hue1 = hueValue;
	}

	onMount(async () => {
		let boxNum = window.innerWidth / 13;
		boxSize = Math.round(boxNum).toString() + 'px';
	});
</script>

<div class="fixed inset-0 z-[-1]" class:dark={isDarkMode}></div>
<div class="relative flex h-full flex-col items-center justify-center" class:dark={isDarkMode}>
	<!-- Saturation & Lightness Controls -->
	<div class="w-md absolute right-0 top-0 mt-4">
		<!-- <div class="flex items-center justify-end gap-4" class:dark={isDarkMode}>
			Hue:
			<input type="range" min="0" max="360" step="5" bind:value={hue1} />
			<input type="number" min="0" max="360" bind:value={hue1} class:dark={isDarkMode} />
		</div> -->
		<div class="flex items-center justify-end gap-4" class:dark={isDarkMode}>
			<input type="range" class="rounded-full" min="0" max="100" step="5" bind:value={saturation} />

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
				<!-- Define gradients -->
				<defs>
					<!-- Horizontal gradient from grayscale to color for the top bar -->
					<linearGradient id="satGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#777777" />
						<stop offset="50%" stop-color="#777777" />
						<stop offset="100%" stop-color="#FF0055" />
					</linearGradient>

					<!-- Horizontal gradient from grayscale to color for the middle bar -->
					<linearGradient id="satGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#777777" />
						<stop offset="50%" stop-color="#777777" />
						<stop offset="100%" stop-color="#44FF00" />
					</linearGradient>

					<!-- Horizontal gradient from grayscale to color for the bottom bar -->
					<linearGradient id="satGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#777777" />
						<stop offset="50%" stop-color="#777777" />
						<stop offset="100%" stop-color="#00aaFF" />
					</linearGradient>
				</defs>

				<!-- Three horizontal bars with different color gradients -->
				<rect x="2" y="6" width="20" height="4" rx="1" fill="url(#satGradient1)" />
				<rect x="2" y="12" width="20" height="4" rx="1" fill="url(#satGradient2)" />
				<rect x="2" y="18" width="20" height="4" rx="1" fill="url(#satGradient3)" />

				<!-- Optional slider knobs -->
				<circle cx="16" cy="8" r="2" fill="white" stroke="#333" stroke-width="0.5" />
				<circle cx="16" cy="14" r="2" fill="white" stroke="#333" stroke-width="0.5" />
				<circle cx="16" cy="20" r="2" fill="white" stroke="#333" stroke-width="0.5" />
			</svg>
			<input type="number" min="0" max="100" bind:value={saturation} class:dark={isDarkMode} />
		</div>

		<div class="flex items-center justify-end gap-4" class:dark={isDarkMode}>
			<input type="range" min="0" max="100" step="5" bind:value={lightness} />

			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
				/>
			</svg>

			<input type="number" min="0" max="100" bind:value={lightness} class:dark={isDarkMode} />
		</div>
	</div>
	<div class="h-4"></div>
	<!-- Color Wheel Container -->
	<div class="wheel-container fixed inset-0">
		<div class="color-wheel" style="--s: {saturation}%; --l: {lightness}%"></div>

		<!-- Indicator line that rotates with hue value -->
		<div class="indicator-line relative" style="transform: rotate({hue1 - 90}deg)"></div>

		<!-- Center circle with current HSL color -->
		<div
			class="center-circle bg-dark pl-[6px] text-3xl font-light"
			style="background-color: hsl({hue1}, {saturation}%, {lightness}%)"
		>
			{hue1}°
		</div>

		<!-- Markers for key angles -->
		<div class="marker red whitespace-nowrap font-bold"><span>0°</span></div>
		<div class="marker red-yellow whitespace-nowrap"><span>30°</span></div>
		<div class="marker yellow whitespace-nowrap font-bold"><span>60°</span></div>
		<div class="marker yellow-green whitespace-nowrap"><span>90°</span></div>
		<div class="marker green whitespace-nowrap font-bold"><span>120°</span></div>
		<div class="marker green-cyan whitespace-nowrap"><span>150°</span></div>
		<div class="marker cyan whitespace-nowrap font-bold"><span>180°</span></div>
		<div class="marker cyan-blue whitespace-nowrap"><span>210°</span></div>
		<div class="marker blue whitespace-nowrap font-bold"><span>240°</span></div>
		<div class="marker blue-magenta whitespace-nowrap"><span>270°</span></div>
		<div class="marker magenta whitespace-nowrap font-bold"><span>300°</span></div>
		<div class="marker magenta-red whitespace-nowrap"><span>330°</span></div>
	</div>

	<!-- Horizontal Hue Buttons (Bottom) with Slider -->
	<div class=" fixed bottom-0 left-0 right-0 z-10 flex flex-col items-end">
		<!-- Horizontal Hue Slider -->
		<div class="flex items-center gap-2">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="size-6">
				<!-- Largest Arc - Red -->
				<path
					d="M12 4C18.0751 4 23 8.92487 23 15V20H21V15C21 10.1182 17.1132 6.14421 12.2654 6.00384L12 6C7.1182 6 3.14421 9.88681 3.00384 14.7346L3 15V20H1V15C1 8.92487 5.92487 4 12 4Z"
					fill="#FF0055"
				/>

				<!-- Middle Arc - Green -->
				<path
					d="M12 8C15.866 8 19 11.134 19 15V20H17V15C17 12.3112 14.8777 10.1182 12.2169 10.0046L12 10C9.31124 10 7.11818 12.1223 7.00462 14.7831L7 15V20H5V15C5 11.134 8.13401 8 12 8Z"
					fill="#44FF00"
				/>

				<!-- Smallest Arc - Blue -->
				<path
					d="M12 12C13.6569 12 15 13.3431 15 15V20H13V15C13 14.4872 12.614 14.0645 12.1166 14.0067L12 14C11.4872 14 11.0645 14.386 11.0067 14.8834L11 15V20H9V15C9 13.3431 10.3431 12 12 12Z"
					fill="#00aaFF"
				/>
			</svg><input type="number" min="0" max="360" bind:value={hue1} class:dark={isDarkMode} />
		</div>
		<div class="horizontal-slider px-[6px] md:px-[30px]">
			<input type="range" min="0" max="360" step="1" bind:value={hue1} class:dark={isDarkMode} />
		</div>

		<!-- Horizontal Hue Buttons -->
		<div class="horizontal-hue-buttons">
			{#each hueValues as hueValue, index}
				<button
					class="hue-button square"
					style="background-color: hsl({hueValue}, {saturation}%, {lightness}%); {boxCss}"
					on:click={() => setHue(hueValue)}
					title="{hueNames[index]}: {hueValue}°"
				>
					<span class="hue-label" class:dark-text={lightness > 70}>{hueValue}°</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Two HSL comparison boxes -->
	<!-- <div class="hsl-compare-container fixed bottom-4  justify-center">
		<div>
			<div
				class="hsl-box"
				style="background-color: hsl({hue1}, {saturation}%, {lightness}%);"
			></div>
			<p class="px-4">hsl({hue1}, {saturation}%, {lightness}%)</p>
		</div>

		<div>
			<div
				class="hsl-box"
				style="background-color: hsl({typedHue}, {typedSaturation}%, {typedLightness}%);"
			></div>
			<p class="px-4">hsl({typedHue}, {typedSaturation}%, {typedLightness}%)</p>
		</div>
	</div> -->

	<!-- HSL input fields -->
	<!-- <div class="hsl-input-container fixed bottom-4 right-4 flex">
		<div class="flex flex-col">
			<label class:dark={isDarkMode}>Hue: </label>
			<input type="number" min="0" max="360" bind:value={typedHue} class:dark={isDarkMode} />
		</div>
		<div class="flex flex-col">
			<label class:dark={isDarkMode}>Sat:</label>
			<input type="number" min="0" max="100" bind:value={typedSaturation} class:dark={isDarkMode} />
		</div>
		<div class="flex flex-col">
			<label class:dark={isDarkMode}>Lit:</label>
			<input type="number" min="0" max="100" bind:value={typedLightness} class:dark={isDarkMode} />
		</div>
	</div> -->
</div>

<!-- Styling -->
<style>
	input {
		border-radius: 8px;
		margin: 2px;
		min-height: 20px;
	}
	.marker {
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: left;
		width: 1px;
		height: 1px;
	}

	.marker span {
		position: absolute;
		height: 100%;
		left: 100%; /* Ensures text starts from the same distance */
		top: -0.65rem; /* Aligns to the marker */
		transform-origin: center; /* Makes the text extend outward */
		transform: rotate(0deg); /* Keeps text upright */
		/* background: #fff8; */
		padding: 2px 4px;
		border-radius: 4px;
		font-size: 0.8rem;
		white-space: nowrap;
	}

	/* Vertical and Horizontal Containers */
	.vertical-hue-container {
		display: flex;
		align-items: flex-start;
		gap: 5px;
	}

	.horizontal-hue-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	/* Vertical Slider */
	.vertical-slider {
		height: 360px;
		display: flex;
		align-items: center;
	}

	.vertical-slider input[type='range'] {
		transform: rotate(270deg);
		transform-origin: center;
		width: 360px;
		height: 20px;
		margin-left: -170px;
		margin-right: -170px;
		border-radius: 9999px;
	}

	/* Horizontal Slider */
	.horizontal-slider {
		width: 100%;
		border-radius: 9999px;
	}

	.horizontal-slider input[type='range'] {
		width: 100%;
		border-radius: 9999px;
	}

	/* Button Containers */
	.vertical-hue-buttons {
		display: flex;
		flex-direction: column;
	}

	.horizontal-hue-buttons {
		display: flex;
		flex-direction: row;
	}

	/* Hue Buttons - Square */
	.hue-button.square {
		border: none;
		border-radius: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
		margin: 0;
	}

	.hue-label {
		font-size: 0.65rem;
		color: white;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
	}

	/* Indicator line (radius stroke) */
	.indicator-line {
		position: absolute;
		top: 50%;
		left: 50%;
		height: 1px;
		width: 25dvh; /* Same as wheel radius */
		background-color: black;
		transform-origin: left;
		transition: transform 0.2s ease; /* Smooth rotation */
		z-index: 2;
	}

	/* Dark mode adjustments for indicator line */
	.dark .indicator-line {
		background-color: hsla(0, 0%, 20%, 0.5);
		border: solid 1px hsla(0, 0%, 100%, 0.9);
		height: 3px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
		box-sizing: border-box;
	}

	/* Center circle */
	.center-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 25dvh;
		height: 25dvh;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid rgba(255, 255, 255, 0.5);
		box-shadow: 0 0 5dvh hsla(0, 0%, 20%, 0.5);
		z-index: 3;
	}

	/* Hue value text inside center circle */
	.hue-value {
		color: white;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
		padding-inline: 10px;
		border-radius: 9999px;
		height: 50px;
		width: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* Dark text for light background colors */
	.dark-text {
		color: black;
		text-shadow: 0 0 2px rgba(255, 255, 255, 0.7);
	}

	/* Adjust positioning for each main marker */
	.red {
		transform: rotate(-90deg) translate(25dvh, 0);
	}
	.red-yellow {
		transform: rotate(-60deg) translate(25dvh, 0);
	}
	.yellow {
		transform: rotate(-30deg) translate(25dvh, 0);
	}
	.yellow-green {
		transform: rotate(0deg) translate(25dvh, 0);
	}
	.green {
		transform: rotate(30deg) translate(25dvh, 0);
	}
	.green-cyan {
		transform: rotate(60deg) translate(25dvh, 0);
	}
	.cyan {
		transform: rotate(90deg) translate(25dvh, 0);
	}
	.cyan-blue {
		transform: rotate(120deg) translate(25dvh, 0);
	}
	.blue {
		transform: rotate(150deg) translate(25dvh, 0);
	}
	.blue-magenta {
		transform: rotate(180deg) translate(25dvh, 0);
	}
	.magenta {
		transform: rotate(210deg) translate(25dvh, 0);
	}
	.magenta-red {
		transform: rotate(240deg) translate(25dvh, 0);
	}

	/* Dark mode marker text */
	.dark .marker span {
		color: white;
	}
	:global(body) {
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	/* Light Mode */
	.flex {
		color: black;
	}

	/* Dark Mode */
	.dark {
		color: white;
	}

	/* Input Styling for Dark Mode */
	.dark input {
		background-color: #333;
		color: white;
		border: 1px solid #555;
	}

	.dark input[type='range'] {
		background: transparent;
	}

	.dark input[type='checkbox'] {
		accent-color: #bbb;
	}

	.wheel-container {
		position: relative;
		width: 50dvh;
		height: 50dvh;
		margin: 100px;
	}

	.color-wheel {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: conic-gradient(
			hsl(0, var(--s), var(--l)),
			hsl(60, var(--s), var(--l)),
			hsl(120, var(--s), var(--l)),
			hsl(180, var(--s), var(--l)),
			hsl(240, var(--s), var(--l)),
			hsl(300, var(--s), var(--l)),
			hsl(360, var(--s), var(--l))
		);
	}

	.color-wheel {
		--s: 100%;
		--l: 50%;
	}

	/* HSL Comparison Box */
	.hsl-compare-container {
		display: flex;
		margin-top: 2rem;
		width: 800px;
	}

	.hsl-box {
		width: 100%;
		height: 10dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
	}

	.dark .hsl-box {
		background-color: #444;
		color: white;
	}

	.hsl-box h3 {
		margin: 0;
		font-size: 1rem;
	}

	.hsl-box p {
		font-size: 0.8rem;
	}

	/* Fix Range Input Styling in Dark Mode */
	.dark input[type='range']::-webkit-slider-runnable-track {
		background: #777;
	}

	.dark input[type='range']::-webkit-slider-thumb {
		background: white;
		border: 1px solid #aaa;
	}

	.dark input[type='range']::-moz-range-track {
		background: #777;
	}

	.dark input[type='range']::-moz-range-thumb {
		background: white;
		border: 1px solid #aaa;
	}
</style>
