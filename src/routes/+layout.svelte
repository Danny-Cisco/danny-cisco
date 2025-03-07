<script>
	import '../app.css';
</script>

<div class="h-full w-full">
	<!-- Header/Navigation -->
	<header class="bg-dark fixed top-0 z-10 h-20 w-[100vw] px-8 py-4 shadow-sm">
		<div class="!text-light mx-auto py-4 font-light">
			<nav class="flex w-full items-center justify-between">
				<a href="/" class="justify-centerfont-bold flex flex-col items-center text-xl">
					<img src="/DannyCiscoLogoBlack.jpg" alt="" class="h-18 w-18 rounded-full shadow-xl" />
				</a>

				<ul class="hidden gap-8 md:flex">
					<li><a href="/bio" class="font-medium hover:text-blue-600">Bio</a></li>
					<li>
						<a href="/understand-stuff" class="font-medium hover:text-blue-600">Understand-Stuff</a>
					</li>
					<li>
						<a href="/time-blind-club" class="font-medium hover:text-blue-600">TimeBlind.Club</a>
					</li>
					<li><a href="/contact" class="font-medium hover:text-blue-600">Contact</a></li>
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
	<div class="relative pt-20">
		<slot />
	</div>
</div>
