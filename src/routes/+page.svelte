<script>
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
</script>

<!-- Hero Section -->
<section
	class="flex flex-col items-center justify-center bg-gradient-to-br from-white/10 text-center md:py-24"
>
	<div class="container relative mx-auto px-4">
		<div class="logo-container">
			<img
				src="/DannyCiscoLogoBlack.jpg"
				alt="Cisco Logo"
				class="logo shadow-xl"
				width="200"
				height="200"
			/>
			<div class="glow"></div>
			<div class="bottom-glow"></div>
		</div>
		<p class="text-light-500 glitch-text mx-auto mb-1 max-w-2xl text-xl">
			Web developer, designer, artist.
		</p>
		<p class="text-light-500 glitch-text mx-auto mb-8 max-w-2xl text-xl">
			Building useful stuff everyday.
		</p>

		<h3>
			<GlitchText text="Featured Projects" />
		</h3>
		<a href="/contact" class="btn"> Get in Touch </a>
	</div>
</section>

<!-- Featured Projects Section -->
<section class="bg-dark py-16">
	<div class="container mx-auto px-4">
		<h2 class="text-light-500 relative mb-4 inline-block text-xl font-bold">Featured Projects</h2>
		<div class=" mb-6 h-1 w-full bg-gradient-to-r from-blue-600"></div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Project Card 1 -->
			<div
				class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-gray-400"
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
				class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-gray-400"
				on:click={(event) => event.currentTarget.querySelector('a')?.click()}
			>
				<div class="p-6">
					<h3 class="mb-2 text-xl font-bold">Time Blind Club</h3>
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
				class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-gray-400"
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
				class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-gray-400"
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
	<div class="text-light container mx-auto flex flex-col px-4">
		<div class=" mb-6 h-1 w-full bg-gradient-to-r from-blue-600"></div>

		<p class="max-w-3xl text-sm">
			Hello! I'm a web developer specializing in SvelteKit and modern web technologies. I'm
			passionate about creating accessible, user-friendly applications that solve real problems.
		</p>
		<p class="mt-4 max-w-3xl text-sm">
			My background includes experience in insert stuff, and I'm particularly interested in insert
			interests. When I'm not coding, you might find me doing insert hobbies.
		</p>
		<a href="/bio" class="btn mt-6"> Read Full Bio </a>
	</div>
</section>

<style>
	body {
		background-color: #121212;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
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
		animation: pulse 4s ease-in-out infinite alternate;
		z-index: 1;
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
		animation:
			pulse 4s ease-in-out infinite alternate,
			glow-roll 6s linear infinite alternate;
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

	/* Occasionally show scan lines - uncomment if desired */
	/*
.glitch-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(32, 128, 255, 0.2) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  animation: scanlines 6s infinite;
}

@keyframes scanlines {
  0%, 85%, 100% {
    opacity: 0;
  }
  92%, 93% {
    opacity: 0.3;
  }
}
*/
</style>
