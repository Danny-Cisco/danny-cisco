<script>
	import { onMount } from 'svelte';
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';

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

<div class="bio-container {visible ? 'visible' : ''}">
	<header>
		<h1 class="text-white"><GlitchText text="Danny Cisco" /></h1>
		<h2 class="text-pink-500">Maker | Artist | AI Explorer | Game Technician | Toy Designer</h2>
		<div class="tagline">
			<p>
				<GlitchText text="I build things..." />
				<GlitchText text="digital, physical, and everything in between." />
			</p>
		</div>
	</header>

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

	<section class="projects-section">
		<h3>
			<GlitchText text="What I'm up too" />
		</h3>
		<ul>
			{#each projects as project}
				<li>
					<em>{project.category}</em> – {project.description}
				</li>
			{/each}
		</ul>
	</section>

	<section class="philosophy-section">
		<h3><GlitchText text="How I Work" /></h3>
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

	<section class="connect-section">
		<h3>
			<GlitchText text="Let's Connect<" />
		</h3>
		<p>
			If you're into AI, game design, or making weird and wonderful things, I'd love to chat. Reach
			out, and let's build something cool.
		</p>
		<div class="social-links">
			<!-- You can add actual links/icons here -->
			<button class="btn">Get In Touch</button>
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
</style>
