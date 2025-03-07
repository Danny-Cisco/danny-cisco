<!-- GlitchText.svelte -->
<script>
	import { onMount } from 'svelte';

	// Props
	export let text = '';
	export let flicker = false;

	// Possible characters to use for the glitch effect
	const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}|';

	// Text characters array
	let chars = [];
	let displayChars = [];

	// Update characters when text changes
	$: {
		chars = text.split('');
		displayChars = [...chars];
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
			setTimeout(
				() => {
					displayChars[randomIndex] = chars[randomIndex];
					displayChars = [...displayChars]; // Trigger reactivity
				},
				100 + Math.random() * 200
			); // Random duration between 100-300ms
		}

		// Start glitching at random intervals
		function startGlitching() {
			glitchRandomChar();

			// Schedule the next glitch
			const nextGlitchDelay = 100 + Math.random() * 800; // Random delay between 100-900ms
			setTimeout(startGlitching, nextGlitchDelay);
		}

		// Occasionally glitch multiple characters in sequence
		function glitchBurst() {
			const burstCount = 1 + Math.floor(Math.random() * 3); // 1-3 characters

			for (let i = 0; i < burstCount; i++) {
				setTimeout(glitchRandomChar, i * 50); // Stagger the glitches slightly
			}

			// Schedule the next burst
			const nextBurstDelay = 2000 + Math.random() * 5000; // Random delay between 2-7 seconds
			setTimeout(glitchBurst, nextBurstDelay);
		}

		// Start both random glitches and occasional bursts
		let glitchTimeout, burstTimeout;

		// Initial calls with self-scheduling
		function scheduleGlitch() {
			glitchRandomChar();
			const nextDelay = 100 + Math.random() * 800;
			glitchTimeout = setTimeout(scheduleGlitch, nextDelay);
		}

		function scheduleBurst() {
			glitchBurst();
			const nextDelay = 2000 + Math.random() * 5000;
			burstTimeout = setTimeout(scheduleBurst, nextDelay);
		}

		// Start the processes
		scheduleGlitch();
		scheduleBurst();

		// Clean up on component unmount
		return () => {
			clearTimeout(glitchTimeout);
			clearTimeout(burstTimeout);
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
