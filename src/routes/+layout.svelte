<script>
	import '../app.css';
</script>

<div class="w-full">
	<!-- Header/Navigation -->
	<header class="sticky top-0 z-10 bg-white shadow-sm">
		<div class="container mx-auto px-4 py-4">
			<nav class="flex items-center justify-between">
				<a href="/" class="text-xl font-bold text-blue-600">Danny Cisco</a>

				<ul class="hidden space-x-8 md:flex">
					<li><a href="/" class="font-medium hover:text-blue-600">Home</a></li>
					<li><a href="/bio" class="font-medium hover:text-blue-600">Bio</a></li>
					<li><a href="/webapps" class="font-medium hover:text-blue-600">Web Apps</a></li>
					<li>
						<a href="/timeblindclub" class="font-medium hover:text-blue-600">Time Blind Club</a>
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

	<slot />

	<!-- Footer -->
	<footer class="absolute bottom-0 left-0 right-0 bg-gray-800 py-8 text-white">
		<div class="container mx-auto px-4 text-center">
			<div class="mb-4 flex justify-center space-x-6">
				<!-- Social Icons -->
				<a href="#" class="hover:text-blue-400" aria-label="Twitter">
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
							d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
						/>
					</svg>
				</a>
				<a href="#" class="hover:text-blue-400" aria-label="GitHub">
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
							d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
						/>
					</svg>
				</a>
				<a href="#" class="hover:text-blue-400" aria-label="LinkedIn">
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
							d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						/>
						<rect x="2" y="9" width="4" height="12" />
						<circle cx="4" cy="4" r="2" />
					</svg>
				</a>
			</div>
		</div>
	</footer>
</div>
