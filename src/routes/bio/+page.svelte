<script>
	import { onMount } from 'svelte';
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
	import { fade, slide } from 'svelte/transition';

	// Animation for section entry
	let visible = false;

	onMount(() => {
		visible = true;
	});

	// Current projects data
	const projects = [
		{
			category: 'AI & Software Development',
			description:
				"Exploring AI interfaces, building apps with SvelteKit, Supabase, and PocketBase, and integrating OpenAI's APIs."
		},
		{
			category: 'Game Development',
			description:
				'Creating Memmypets and working on Pico-8 platformers, bringing nostalgic pixel art and tight mechanics to life.'
		},
		{
			category: 'Toy Design',
			description:
				'Continuing to create playful, boundary-pushing objects for This Is Not A Toy Store and The Burnt Sausages collaborative projects.'
		},
		{
			category: 'Art & Inking',
			description:
				'Refining my illustration skills with expressive, bold brush strokes, inspired by classic Mad Magazine styles.'
		},
		{
			category: 'Tech & DIY Builds',
			description:
				'Experimenting with Raspberry Pi, custom hardware setups, and modifying retro gaming consoles.'
		},
		{
			category: 'Podcasting',
			description:
				'Hosting Nascent Clouds, where I dive into the evolving world of artificial intelligence.'
		}
	];
</script>

<div class="fixed inset-0 z-[0] bg-gradient-to-br from-white/10 to-black/50"></div>
<!-- <div class="glow sticky inset-0 top-0 z-[-2]"></div> -->

<div class="bio-container z-[99] {visible ? 'visible' : ''}">
	<header in:fade>
		<div class="relative flex h-[250px] items-center justify-center gap-8">
			<img
				src="/johnny-charcoal-in-packet.png"
				class="cover -rotate-10 absolute left-0 h-[180px] w-[180px] rounded-lg border-[2px] border-transparent object-cover md:scale-150"
				alt="Johnny Charcoal Toy"
			/><img
				src="/danny-cisco-b+w.png"
				class="cover rotate-10 absolute -right-10 h-[180px] w-[180px] rounded-lg border-[2px] border-transparent object-cover md:scale-150"
				alt="Danny Cisco's headshot"
			/>
		</div>
		<div class="h-10"></div>

		<h1 class="text-white"><GlitchText text="Danny Cisco" /></h1>

		<div class="h-10"></div>
		<h2 class=" text-pink-500">
			Maker | Artist | AI&nbspExplorer | Game&nbspTechnician | Toy&nbspDesigner
		</h2>
		<div class="h-20"></div>
		<div class="tagline">
			<p>
				<GlitchText text="I build things..." />
				<GlitchText text="digital, physical, and everything in between." />
			</p>
		</div>
		<div class="h-20"></div>
	</header>
	<div class=" mb-6 h-1 w-full bg-gradient-to-r from-pink-600"></div>

	<section class="bio-section">
		<p>
			For over fifteen years, I've been crafting interactive props, immersive experiences, and
			innovative projects that blend technology with creativity. As a founding member of <em
				>The Burnt Sausages</em
			>, I've brought unforgettable performances to life, using woodwork, electronics, and costume
			design to turn ideas into reality.
		</p>

		<p>
			My creative journey also includes designing unique toys and collectibles for <em
				>This Is Not A Toy Store</em
			>, where I've pushed the boundaries of playful design through unconventional materials and
			interactive elements.
		</p>

		<p>
			Now, I'm taking that same maker spirit into software development, blending my passion for AI,
			game design, and interactive media. I'm building apps, developing games, and experimenting
			with new ways to merge physical and digital worlds.
		</p>
	</section>
	<div class="h-20"></div>

	<section class="projects-section">
		<h3>
			<GlitchText text="What I'm up to" />
		</h3>
		<div class=" mb-6 h-1 w-full bg-gradient-to-r from-pink-600"></div>

		<ul>
			{#each projects as project}
				<li>
					<em>{project.category}</em> – {project.description}
				</li>
			{/each}
		</ul>
	</section>
	<div class="h-20"></div>

	<section class="philosophy-section">
		<h3><GlitchText text="How I Work" /></h3>
		<div class=" mb-6 h-1 w-full bg-gradient-to-r from-pink-600"></div>

		<p>
			I take a hands-on, iterative approach—whether I'm coding, designing, or building. I believe in
			keeping things simple but powerful, avoiding unnecessary complexity while pushing the limits
			of creativity.
		</p>
		<p>
			I'm also obsessed with AI and how it can enhance creative workflows, whether through voice
			interfaces or intelligent tools for artists and developers.
		</p>
	</section>
	<div class="h-20"></div>

	<section class="connect-section">
		<h3>
			<GlitchText text="Let's Connect" />
		</h3>
		<div class=" mb-6 h-1 w-full bg-gradient-to-r from-pink-600"></div>

		<p>
			If you're into AI, game design, or making weird and wonderful things, I'd love to chat. Reach
			out, and let's build something cool.
		</p>
		<div class="social-links">
			<!-- You can add actual links/icons here -->
			<button class="btn border-[2px] border-transparent hover:border-pink-500">Get In Touch</button
			>
		</div>
	</section>
</div>

<style>
	.bio-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		line-height: 1.6;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.8s ease,
			transform 0.8s ease;
	}

	.bio-container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	header {
		margin-bottom: 2rem;
		text-align: center;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		font-weight: 700;
	}

	em {
		color: hsl(320, 73%, 60%);
		white-space: nowrap;
	}

	h2 {
		font-size: 1.2rem;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	.tagline p {
		font-size: 1.5rem;
		font-weight: 300;
		margin-bottom: 1rem;
		color: hsl(60, 10%, 100%);
	}

	section {
		margin-bottom: 2.5rem;
		opacity: 0;
		animation: fadeIn 0.8s ease forwards;
		animation-delay: 0.3s;
	}

	.bio-section {
		animation-delay: 0.3s;
	}

	.projects-section {
		animation-delay: 0.6s;
	}

	.philosophy-section {
		animation-delay: 0.9s;
	}

	.connect-section {
		animation-delay: 1.2s;
	}

	h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	p {
		/* font-family:
			'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
			sans-serif; */
		margin-bottom: 3rem;
		color: hsl(200, 10%, 70%);
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
		position: relative;
		color: hsl(200, 10%, 70%);
	}

	li:before {
		content: '•';
		position: absolute;
		left: 0;
	}

	em {
		font-style: italic;
	}

	.social-links {
		display: flex;
		justify-content: center;
		margin-top: 1.5rem;
	}

	.contact-btn {
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.contact-btn:hover {
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.bio-container {
			padding: 1.5rem;
		}

		h1 {
			font-size: 2rem;
		}

		.tagline {
			font-size: 1.2rem;
		}
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
		/* animation: */
		/* pulse 4s ease-in-out infinite alternate, */
		/* glow-roll 6s linear infinite alternate; */
		z-index: 1;
	}
</style>
