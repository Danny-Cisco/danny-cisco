<script>
	// Exposed variables for user control
	export let saturation = 90; // Range: 0 - 100
	export let lightness = 50; // Range: 0 - 100
	export let hue1 = 200; // First color hue (user can edit)

	// Light mode / Dark mode state
	let isDarkMode = true;

	// User-typed HSL input for practice
	let typedHue = 220;
	let typedSaturation = 90;
	let typedLightness = 50;
</script>

<div class="fixed inset-0 z-[-1]" class:dark={isDarkMode}></div>
<div class="relative flex h-full flex-col items-center justify-center" class:dark={isDarkMode}>
	<!-- Dark mode toggle -->
	<!-- <div class="absolute left-0 top-10 mt-4 flex items-center space-x-2 pl-4" class:dark={isDarkMode}>
		<input type="checkbox" bind:checked={isDarkMode} class="toggle" />
		<span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
	</div> -->

	<!-- Saturation & Lightness Controls -->
	<div class="w-md absolute right-0 top-0 mt-4">
		<div class="flex items-center justify-end gap-4" class:dark={isDarkMode}>
			Hue:
			<input type="range" min="0" max="360" step="5" bind:value={hue1} />
			<input type="number" min="0" max="360" bind:value={hue1} class:dark={isDarkMode} />
		</div>
		<div class="flex items-center justify-end gap-4" class:dark={isDarkMode}>
			Saturation:
			<input type="range" min="0" max="100" step="5" bind:value={saturation} />
			<input type="number" min="0" max="100" bind:value={saturation} class:dark={isDarkMode} />
		</div>

		<div class="flex items-center justify-end gap-4" class:dark={isDarkMode}>
			Lightness:
			<input type="range" min="0" max="100" step="5" bind:value={lightness} />
			<input type="number" min="0" max="100" bind:value={lightness} class:dark={isDarkMode} />
		</div>
	</div>

	<div class="h-20"></div>

	<!-- Color Wheel Container -->
	<div class="wheel-container fixed inset-0 mt-8">
		<div class="color-wheel" style="--s: {saturation}%; --l: {lightness}%"></div>

		<!-- New: Indicator line that rotates with hue value -->
		<div class="indicator-line relative" style="transform: rotate({hue1 - 90}deg)"></div>

		<!-- New: Center circle with current HSL color -->
		<div class="center-circle" style="background-color: hsl({hue1}, {saturation}%, {lightness}%)">
			<div class="hue-value" class:dark-text={lightness > 70}>{hue1}°</div>
		</div>

		<!-- Markers for key angles -->
		<div class="marker red whitespace-nowrap font-bold"><span>0° RED</span></div>
		<div class="marker red-yellow whitespace-nowrap"><span>30°</span></div>
		<div class="marker yellow whitespace-nowrap font-bold"><span>60° YELLOW</span></div>
		<div class="marker yellow-green whitespace-nowrap"><span>90°</span></div>
		<div class="marker green whitespace-nowrap font-bold"><span>120° GREEN</span></div>
		<div class="marker green-cyan whitespace-nowrap"><span>150°</span></div>
		<div class="marker cyan whitespace-nowrap font-bold"><span>180° CYAN</span></div>
		<div class="marker cyan-blue whitespace-nowrap"><span>210°</span></div>
		<div class="marker blue whitespace-nowrap font-bold"><span>240° BLUE</span></div>
		<div class="marker blue-magenta whitespace-nowrap"><span>270°</span></div>
		<div class="marker magenta whitespace-nowrap font-bold"><span>300° MAGENTA</span></div>
		<div class="marker magenta-red whitespace-nowrap"><span>330°</span></div>
	</div>

	<!-- Two HSL comparison boxes -->
	<div class="hsl-compare-container fixed bottom-4 justify-center">
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
	</div>

	<!-- HSL input fields -->
	<div class="hsl-input-container fixed bottom-4 right-4 flex">
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
	</div>
</div>

<!-- Styling -->
<style>
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
		top: 0 /* Aligns to the marker */
		transform-origin: center; /* Makes the text extend outward */
		transform: rotate(0deg); /* Keeps text upright */
		background: #fff8;
		padding: 2px 4px;
		border-radius: 4px;
		font-size: 0.8rem;
		white-space: nowrap;
	}

	/* New: Indicator line (radius stroke) that rotates with hue value */
	.indicator-line {
		position: absolute;
		top: 50%;
		left: 50%;
		height: 1px; 
		width: 25vh; /* Same as wheel radius */
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
		box-sizing:border-box;
	}

	/* New: Center circle */
	.center-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 150px;
		height: 150px;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid rgba(255, 255, 255, 0.5);
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
		z-index: 3;
		font-weight: bold;
	}

	/* Hue value text inside center circle */
	.hue-value {
		color: white;
		text-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
		/* background: black; */
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
		transform: rotate(-90deg) translate(25vh, 0);
	}
	.red-yellow {
		transform: rotate(-60deg) translate(25vh, 0);
	}
	.yellow {
		transform: rotate(-30deg) translate(25vh, 0);
	}
	.yellow-green {
		transform: rotate(0deg) translate(25vh, 0);
	}
	.green {
		transform: rotate(30deg) translate(25vh, 0);
	}
	.green-cyan {
		transform: rotate(60deg) translate(25vh, 0);
	}
	.cyan {
		transform: rotate(90deg) translate(25vh, 0);
	}
	.cyan-blue {
		transform: rotate(120deg) translate(25vh, 0);
	}
	.blue {
		transform: rotate(150deg) translate(25vh, 0);
	}
	.blue-magenta {
		transform: rotate(180deg) translate(25vh, 0);
	}
	.magenta {
		transform: rotate(210deg) translate(25vh, 0);
	}
	.magenta-red {
		transform: rotate(240deg) translate(25vh, 0);
	}

	/* Dark mode marker text */
	.dark .marker span {
		/* background: #2228; */
		color: white;
	}
	:global(body) {
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	/* Light Mode */
	.flex {
		/* background-color: white; */
		color: black;
	}

	/* Dark Mode */
	.dark {
		/* background-color: #1a1a1a; */
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
		width: 50vh;
		height: 50vh;
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
		height: 10vh;
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
