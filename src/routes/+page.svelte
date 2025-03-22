<script>
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		backIn,
		backInOut,
		backOut,
		bounceIn,
		bounceInOut,
		bounceOut,
		circIn,
		circInOut,
		circOut,
		cubicIn,
		cubicInOut,
		cubicOut,
		elasticIn,
		elasticInOut,
		elasticOut,
		expoIn,
		expoInOut,
		expoOut,
		linear,
		quadIn,
		quadInOut,
		quadOut,
		quartIn,
		quartInOut,
		quartOut,
		quintIn,
		quintInOut,
		quintOut,
		sineIn,
		sineInOut,
		sineOut
	} from 'svelte/easing';
	let data = {
		featuredProjects: {
			cards: [
				{
					heading: 'Vibe Coded Metaverse',
					paragraph: 'Come work in my vibe coded office space',
					image: '/METAVERSE.png',
					link: {
						href: 'https://meta-workspace-gumballelectron.replit.app',
						label: 'visit metaverse'
					},
					size: 'big'
				},
				{
					heading: 'Understand Stuff',
					paragraph: 'Tools Ive generated in order to understand stuff',
					image: '/hsl-wheel.png',
					link: { href: '/understand-stuff', label: 'See list of tools' },
					size: 'big'
				},
				{
					heading: 'Time Blind Club',
					paragraph: 'Clocks arent for everyone',
					image: '/time-blind-club.png',
					link: { href: '/time-blind-club', label: 'See time visualisation' },
					size: 'big'
				},
				{
					heading: 'Memmy Pets',
					paragraph: 'Let Memmy Pets brainstorm fun mnemonics that make learning stick',
					image: '/memmypets.png',
					link: { href: 'https://www.memmypets.com', label: 'Visit MemmyPets.com' },
					size: 'big'
				},
				{
					heading: 'MindMapr.ai',
					paragraph: 'SEE the conversation we are swimming in...',
					image: '/mindmapr.png',
					link: { href: 'https://www.mindmapr.dev', label: 'Visit MindMapr.ai' },
					size: 'big'
				}
			]
		}
	};
</script>

<div class="z-[99]" in:fade>
	<!-- Hero Section -->
	<section class="flex flex-col items-center justify-center text-center md:py-24">
		<div class="scontainer relative mx-auto h-[80dvh] px-4">
			<div class="logo-container">
				<img
					src="/DannyCiscoLogoBlack.jpg"
					alt="Cisco Logo"
					class="logo border-[2px] border-pink-500 shadow"
					width="200"
					height="200"
					in:fly={{ y: 30, delay: 10, easing: backInOut }}
				/>
				<div class="glow"></div>
				<div class="bottom-glow"></div>
			</div>
			<div class="h-4"></div>

			<p
				class="text-light-500 text-md mx-auto mb-1 flex max-w-2xl flex-col items-center text-center md:text-2xl"
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
				<!-- Loop Through All Project Cards-->
				{#each data.featuredProjects.cards as card}
					<Card {card} />
				{/each}
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section class="py-16">
		<div class="text-light container mx-auto flex flex-col flex-col items-center px-4">
			<div class=" mb-6 h-1 w-full bg-gradient-to-r from-pink-600"></div>

			<p class="mx-auto max-w-3xl text-sm">
				<em><strong> Danny Cisco </strong></em> (verb) - Maker of things digital & physical. AI explorer,
				Game Technician, Artist, Tinkerer and Toy Designer. Host of Nascent Clouds. Fork Guitarist of
				The Burnt Sausages. Let’s build something cool.
			</p>

			<a href="/bio" class="btn mt-6 border-[2px] border-transparent hover:border-pink-500">
				Read Full Bio
			</a>
		</div>
	</section>
</div>

<style>
	em {
		color: hsl(320, 73%, 60%);
		white-space: nowrap;
	}

	strong {
		font-weight: bold;
		font-size: large;
	}

	.logo-container {
		position: relative;
		height: 50dvh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logo {
		position: relative;
		height: 50dvh;
		width: 50dvh;
		z-index: 2;
		border-radius: 50%;
		filter: drop-shadow(0 0 100px rgba(255, 255, 255, 0.3));
	}

	/* Add this to your existing CSS */

	.logo {
		position: relative;
		height: 50dvh;
		width: 50dvh;
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
</style>
