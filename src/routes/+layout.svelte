<script>
	import '../app.css';
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
</script>

<div class="bg-dark h-full w-full">
	<!-- Header/Navigation -->
	<header class="bg-dark fixed top-0 z-10 h-10 w-[100vw] px-8 pb-1 shadow-sm">
		<div class="!text-light mx-auto py-4 font-light">
			<nav class="fixed right-4 top-2 flex w-full items-center justify-end">
				<a
					href="/"
					class="fixed left-4 top-0 flex flex-col items-center justify-center text-xl font-bold"
				>
					<img
						src="/DannyCiscoLogoBlack.jpg"
						alt=""
						class="h-18 w-18 rounded-full shadow-xl hover:border-[2px] hover:border-pink-500"
					/>
				</a>

				<ul class="hidden gap-8 md:flex">
					<li>
						<a href="/bio" class="font-medium hover:!text-pink-500"> <GlitchText text="Bio" /> </a>
					</li>
					<li>
						<a href="/understand-stuff" class="font-medium hover:!text-pink-500">
							<GlitchText text="Understand-Stuff" />
						</a>
					</li>
					<li>
						<a href="/time-blind-club" class="font-medium hover:!text-pink-500">
							<GlitchText text="TimeBlind.club" />
						</a>
					</li>
					<li>
						<a href="/contact" class="font-medium hover:!text-pink-500">
							<GlitchText text="Contact" />
						</a>
					</li>
				</ul>

				<!-- Mobile menu button - you can add a hamburger menu implementation here -->
				<button class="md:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
			</nav>
		</div>
	</header>
	<div class="relative top-10">
		<slot />
	</div>
</div>
