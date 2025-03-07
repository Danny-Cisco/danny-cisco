<script>
	// Exposed so they can be controlled from parent components or bound to sliders, etc.
	export let saturation = 85; // Range: 0 - 100
	export let lightness = 55; // Range: 0 - 100
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="w-md">
		<label class="flex items-center justify-between">
			Saturation:
			<input type="range" min="0" max="100" step="5" bind:value={saturation} />
			<input type="number" min="0" max="100" bind:value={saturation} />
		</label>

		<label class="flex items-center justify-between">
			Lightness:
			<input type="range" min="0" max="100" step="5" bind:value={lightness} />
			<input type="number" min="0" max="100" bind:value={lightness} />
		</label>
	</div>

	<div class="wheel-container mt-40">
		<!-- Conic gradient disc; update the CSS variables based on current props -->
		<div class="color-wheel" style="--s: {saturation}%; --l: {lightness}%"></div>

		<!-- Markers for key angles -->
		<div class="marker red whitespace-nowrap font-bold"><span>0° RED</span></div>
		<div class="marker yellow whitespace-nowrap font-bold"><span>60° YELLOW</span></div>
		<div class="marker green whitespace-nowrap font-bold"><span>120° GREEN</span></div>
		<div class="marker cyan whitespace-nowrap font-bold"><span>180° CYAN</span></div>
		<div class="marker blue whitespace-nowrap font-bold"><span>240° BLUE</span></div>
		<div class="marker magenta whitespace-nowrap font-bold"><span>300° MAGENTA</span></div>
	</div>
</div>

<style>
	/* Container to hold the circular color wheel and the markers */
	.wheel-container {
		position: relative;
		width: 500px;
		height: 500px;
		/* Adjust as desired, or make this responsive */
	}

	/* The circular gradient disc */
	.color-wheel {
		width: 100%;
		height: 100%;
		border-radius: 50%;

		/* We'll use CSS variables to inject saturation & lightness. 
       The gradient transitions from hsl(0, s, l) through the entire hue range back to 360. */
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

	/* Default saturation/lightness so the wheel is visible if no props are passed in */
	.color-wheel {
		--s: 100%;
		--l: 50%;
	}

	/* Markers: We'll place them absolutely, centered at the wheel's center,
     then rotate them around the circle. Each marker has a small text label. */
	.marker {
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: center center;
		width: 1px;
		height: 1px;
	}

	/* The text label is offset slightly so it doesn’t overlap the center. */
	.marker span {
		position: absolute;
		left: 0.5rem;
		transform: translate(-50%, -50%);
		background: #fff8; /* optional translucent background to stand out */
		padding: 2px 4px;
		border-radius: 4px;
		font-size: 0.8rem;
	}

	/* Each named marker is rotated to a specific hue angle, 
     then translated outward to the wheel's perimeter. Adjust 140px as needed. */
	.red {
		transform: rotate(-90deg) translate(300px, 0);
	}
	.yellow {
		transform: rotate(-30deg) translate(300px, 0);
	}
	.green {
		transform: rotate(30deg) translate(300px, 0);
	}
	.cyan {
		transform: rotate(90deg) translate(300px, 0);
	}
	.blue {
		transform: rotate(150deg) translate(300px, 0);
	}
	.magenta {
		transform: rotate(210deg) translate(300px, 0);
	}
</style>
