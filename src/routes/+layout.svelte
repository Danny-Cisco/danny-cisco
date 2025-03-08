<script>
	import '../app.css';
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	// Shared navigation items for both desktop and mobile menus
	const navItems = [
		{ text: 'Bio', href: '/bio' },
		{ text: 'Understand-Stuff', href: '/understand-stuff' },
		{ text: 'TimeBlind.club', href: '/time-blind-club' },
		{ text: 'Contact', href: '/contact' }
	];

	// State for mobile menu toggle
	let isMobileMenuOpen = false;

	// Toggle mobile menu
	async function toggleMobileMenu() {
		await setTimeout(() => {
			isMobileMenuOpen = !isMobileMenuOpen;
		}, 100);
	}

	// Close menu when clicking outside
	function handleClickOutside(event) {
		const mobileMenu = document.getElementById('mobile-menu');
		const hamburgerBtn = document.getElementById('hamburger-btn');

		if (
			mobileMenu &&
			hamburgerBtn &&
			!mobileMenu.contains(event.target) &&
			!hamburgerBtn.contains(event.target)
		) {
			isMobileMenuOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="fixed inset-0 z-[0] bg-gradient-to-br from-white/10 to-black/50"></div>
<div class="relative isolate h-full w-full">
	<!-- Header/Navigation -->
	<header
		class="bg-dark fixed top-0 z-10 h-10 w-[110vw] border-b-[1px] border-pink-500 px-8 pb-1 shadow-sm"
	>
		<div class="!text-light mx-auto py-4 font-light">
			<nav
				class="absolute left-0 right-0 top-2 isolate flex w-[100vw] items-center justify-end pr-6"
			>
				<a
					id="home-btn"
					href="/"
					class="fixed left-4 top-0 flex flex-col items-center justify-center text-xl font-bold"
				>
					<img
						src="/DannyCiscoLogoBlack.jpg"
						alt=""
						class="h-18 w-18 rounded-full border-[1px] border-pink-500 hover:border-[2px]"
					/>
				</a>

				<!-- Desktop Navigation -->
				<ul class="hidden gap-8 md:flex">
					{#each navItems as item}
						<li>
							<a href={item.href} class="font-medium hover:!text-pink-500">
								<GlitchText text={item.text} />
							</a>
						</li>
					{/each}
				</ul>

				<!-- Mobile hamburger button -->
				<button
					id="hamburger-btn"
					class="z-[9999] flex flex-col items-center justify-center p-1 md:hidden"
					on:click={toggleMobileMenu}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						{#if isMobileMenuOpen}
							<!-- X icon when menu is open -->
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<!-- Hamburger icon when menu is closed -->
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16m-7 6h7"
							/>
						{/if}
					</svg>
				</button>

				<!-- Mobile Menu -->
				{#if isMobileMenuOpen}
					<div
						id="mobile-menu"
						class="absolute -right-4 top-8 w-48 rounded-md bg-gray-900 pr-4 pt-6 shadow-lg transition-all duration-200"
						transition:fly={{ y: -300 }}
					>
						<ul class="flex flex-col">
							{#each navItems as item}
								<li>
									<a
										href={item.href}
										class="block px-4 py-2 text-white hover:bg-gray-800 hover:text-pink-500"
										on:click={() => (isMobileMenuOpen = false)}
									>
										{item.text}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</nav>
		</div>
	</header>
	<div class="relative top-10 isolate">
		<slot />
	</div>
</div>

<style>
	#hamburger-btn:active {
		transform: scale(0.8) translateY(1px); /* Slight press effect */
	}

	#home-btn:active {
		transform: scale(0.95) translateY(1px); /* Slight press effect */
	}
</style>
