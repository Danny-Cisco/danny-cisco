<script>
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="z-[99]" in:fade>
	<!-- Hero Section -->
	<section class="flex flex-col items-center justify-center text-center md:py-24">
		<div class="scontainer relative mx-auto h-[80vh] px-4">
			<div class="logo-container">
				<img
					src="/DannyCiscoLogoBlack.jpg"
					alt="Cisco Logo"
					class="logo border-[2px] border-pink-500 shadow"
					width="200"
					height="200"
				/>
				<div class="glow"></div>
				<div class="bottom-glow"></div>
			</div>
			<div class="h-4"></div>

			<p
				class="text-light-500 mx-auto mb-1 flex max-w-2xl flex-col items-center text-center text-sm md:text-2xl"
			>
				<GlitchText text="Web developer, designer, artist." />
				<GlitchText text="Building useful stuff everyday." />
			</p>
			<div class="h-10"></div>
			<a href="/contact" class="btn border-[2px] border-transparent hover:border-pink-500">
				Get in Touch
			</a>
		</div>
	</section>

	<!-- Featured Projects Section -->
	<section class="py-16">
		<div class="container mx-auto px-4">
			<h3>
				<GlitchText text="Featured Projects" />
			</h3>
			<div class=" mb-6 h-1 w-full bg-gradient-to-r from-pink-600"></div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Project Card 1 -->
				<div
					class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-pink-200"
					on:click={(event) => event.currentTarget.querySelector('a')?.click()}
				>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-bold">Understand Stuff</h3>
						<p class="text-light-500 mb-4">
							A place to keep various AI-generated tools that assist my understanding of stuff.
						</p>
						<a href="/understand-stuff" class="font-medium text-blue-600 hover:text-blue-800">
							View Understanding List →
						</a>
					</div>
				</div>

				<!-- Project Card 2 -->
				<div
					class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-pink-200"
					on:click={(event) => event.currentTarget.querySelector('a')?.click()}
				>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-bold"><GlitchText text="TimeBlind.Club" /></h3>

						<p class="text-light-500 mb-4">
							A set of tools for people who experience time blindness.
						</p>
						<a href="/time-blind-club" class="font-medium text-blue-600 hover:text-blue-800">
							Try Time Blind Club →
						</a>
					</div>
				</div>

				<!-- Project Card 3 -->
				<div
					class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-pink-200"
					on:click={(event) => event.currentTarget.querySelector('a')?.click()}
				>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-bold">Memmy Pets</h3>
						<p class="text-light-500 mb-4">
							Let Memmy Pets brainstorm fun mnemonics for helping learning stick
						</p>
						<a href="http://memmypets.com" class="font-medium text-blue-600 hover:text-blue-800">
							Visit Memmy Pets →
						</a>
					</div>
				</div>

				<!-- Project Card 4 -->
				<div
					class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-pink-200"
					on:click={(event) => event.currentTarget.querySelector('a')?.click()}
				>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-bold">MindMapr.ai</h3>
						<p class="text-light-500 mb-4">SEE the conversation we are swimming in...</p>
						<a href="http://mindmapr.dev" class="font-medium text-blue-600 hover:text-blue-800">
							Visit MindMapr.ai →
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section class="py-16">
		<div class="text-light container mx-auto flex flex-col flex-col items-center px-4">
			<div class=" mb-6 h-1 w-full bg-gradient-to-r from-pink-600"></div>

			<p class="mx-auto max-w-3xl text-sm">
				Danny Cisco (verb) - Maker of things digital & physical. AI explorer, Game Technician,
				Artist, Tinkerer and Toy Designer. Host of Nascent Clouds. Fork Guitarist of The Burnt
				Sausages. Let’s build something cool.
			</p>

			<a href="/bio" class="btn mt-6 border-[2px] border-transparent hover:border-pink-500">
				Read Full Bio
			</a>
		</div>
	</section>
</div>

<style>
	body {
		background-color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80vh;
		margin: 0;
		overflow: hidden;
	}

	.logo-container {
		position: relative;
		height: 50vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logo {
		position: relative;
		height: 50vh;
		width: 50vh;
		z-index: 2;
		border-radius: 50%;
		filter: drop-shadow(0 0 100px rgba(255, 255, 255, 0.3));
	}

	/* Add this to your existing CSS */

	.logo {
		position: relative;
		height: 50vh;
		width: 50vh;
		z-index: 2;
		border-radius: 50%;
		filter: drop-shadow(0 0 100px rgba(255, 255, 255, 0.3));
		transform-origin: center bottom; /* Set the transform origin to bottom center */
		animation: roll 6s ease-in-out infinite alternate; /* Apply the rolling animation */
	}

	@keyframes roll {
		0% {
			transform: rotate(-5deg); /* Roll slightly to the left */
		}
		100% {
			transform: rotate(5deg); /* Roll slightly to the right */
		}
	}

	/* Optional: Add a subtle shadow effect that moves with the roll */
	.logo::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: 20px;
		background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%);
		border-radius: 50%;
		z-index: -1;
		animation: shadow-move 6s ease-in-out infinite alternate;
	}

	@keyframes shadow-move {
		0% {
			transform: translateX(-10%);
			width: 85%;
		}
		100% {
			transform: translateX(10%);
			width: 85%;
		}
	}

	/* Enhance the pulsating glow effect to complement the rolling */
	.glow {
		position: absolute;
		width: 120%;
		height: 120%;
		background: radial-gradient(
			ellipse at bottom,
			rgba(0, 112, 255, 0.4) 0%,
			rgba(130, 60, 255, 0.2) 40%,
			rgba(255, 0, 150, 0.1) 60%,
			transparent 70%
		);
		border-radius: 50%;
		filter: blur(20px);
		/* animation: */
		/* pulse 4s ease-in-out infinite alternate, */
		/* glow-roll 6s linear infinite alternate; */
		z-index: 1;
	}

	@keyframes glow-roll {
		0% {
			transform: translateX(-5px);
		}
		100% {
			transform: translateX(5px);
		}
	}
	/* CSS for the glitch text effect */
	.glitch-text {
		position: relative;
		display: inline-block;
		font-family: monospace; /* Optional: monospace fonts work well for this effect */
	}

	/* Optional flicker effect for more visual impact */
	.glitch-text::before {
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
	}

	/* Add occasional flicker animations */
	.glitch-text.flicker::before {
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
