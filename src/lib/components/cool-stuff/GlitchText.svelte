<!-- GlitchText.svelte -->
<script>
	import { onMount } from 'svelte';

	// Props
	export let text = '';
	export let flicker = false;

	// Possible characters to use for the glitch effect
	const glitchChars = '@#$%&*<>[]{}|\\/!?~+=-_;:()^';
	// Text characters array
	let chars = [];
	let displayChars = [];

	// Store all timeout IDs for proper cleanup
	let timeoutIds = [];

	// Update characters when text changes
	$: {
		chars = text.split('');
		displayChars = [...chars];
	}

	// Custom setTimeout that tracks IDs for cleanup
	function trackTimeout(callback, delay) {
		const id = setTimeout(callback, delay);
		timeoutIds.push(id);
		return id;
	}

	onMount(() => {
		// Function to glitch a random character
		function glitchRandomChar() {
			// Skip if there are no characters to glitch
			if (chars.length === 0) return;

			// Select a random character (that's not a space)
			const nonSpaceIndices = chars
				.map((char, i) => (char !== ' ' ? i : -1))
				.filter((i) => i !== -1);
			if (nonSpaceIndices.length === 0) return;

			const randomIndex = nonSpaceIndices[Math.floor(Math.random() * nonSpaceIndices.length)];

			// Get a random glitch character
			const randomGlitchChar = glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));

			// Apply the glitch
			displayChars[randomIndex] = randomGlitchChar;
			displayChars = [...displayChars]; // Trigger reactivity

			// Restore the original character after a short delay
			trackTimeout(
				() => {
					displayChars[randomIndex] = chars[randomIndex];
					displayChars = [...displayChars]; // Trigger reactivity
				},
				100 + Math.random() * 200
			); // Random duration between 100-300ms
		}

		// Occasionally glitch multiple characters in sequence
		function glitchBurst() {
			const burstCount = 1 + Math.floor(Math.random() * 3); // 1-3 characters

			for (let i = 0; i < burstCount; i++) {
				trackTimeout(glitchRandomChar, i * 50); // Stagger the glitches slightly
			}
		}

		// Initial calls with self-scheduling
		function scheduleGlitch() {
			glitchRandomChar();
			const nextDelay = 100 + Math.random() * 800;
			const glitchTimeout = trackTimeout(scheduleGlitch, nextDelay);
		}

		function scheduleBurst() {
			glitchBurst();
			const nextDelay = 2000 + Math.random() * 5000;
			const burstTimeout = trackTimeout(scheduleBurst, nextDelay);
		}

		// Start the processes
		scheduleGlitch();
		scheduleBurst();

		// Clean up on component unmount
		return () => {
			// Clear all tracked timeouts
			timeoutIds.forEach((id) => clearTimeout(id));
			timeoutIds = [];
		};
	});
</script>

<span class="glitch-text" class:flicker>
	{#each displayChars as char}
		{#if char === ' '}
			&nbsp;
		{:else}
			<span>{char}</span>
		{/if}
	{/each}
</span>

<style>
	.glitch-text {
		position: relative;
		display: inline-block;
	}

	/* Optional flicker effect */
	.glitch-text.flicker::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 255, 255, 0.1);
		opacity: 0;
		z-index: -1;
		pointer-events: none;
		animation: flicker 8s infinite;
	}

	@keyframes flicker {
		0%,
		95%,
		100% {
			opacity: 0;
		}
		96%,
		97% {
			opacity: 0.3;
		}
	}

	/* Style for individual glitching characters */
	.glitch-text span {
		position: relative;
		display: inline-block;
		transition: color 50ms;
	}
</style>
