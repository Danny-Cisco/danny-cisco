<script>
	import '../app.css';
</script>

<div class="bg-white-100 h-full w-full font-mono">
	<!-- Header/Navigation -->
	<header class="sticky top-0 z-10 bg-white shadow-sm">
		<div class="container mx-auto px-4 py-4">
			<nav class="flex items-center justify-between">
				<a href="/" class="text-xl font-bold text-blue-600">Danny Cisco</a>

				<ul class="hidden space-x-8 md:flex">
					<li><a href="/" class="font-medium hover:text-blue-600">Home</a></li>
					<li><a href="/bio" class="font-medium hover:text-blue-600">Bio</a></li>
					<li>
						<a href="/understand-stuff" class="font-medium hover:text-blue-600">Understand Stuff</a>
					</li>
					<li>
						<a href="/time-blind-club" class="font-medium hover:text-blue-600">Time Blind Club</a>
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
	<div class="h-full">
		<slot />
	</div>
</div>
