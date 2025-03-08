<script>
	import GlitchText from '$lib/components/cool-stuff/GlitchText.svelte';
	export let card = {
		heading: '',
		paragraph: '',
		image: '',
		link: { href: '', label: '' },
		size: 'big'
	};
</script>

<div
	class="overflow-hidden rounded-lg border border-2 border-transparent bg-white/10 shadow transition duration-300 hover:cursor-pointer hover:border-dashed hover:border-pink-200"
	on:click={(event) => event.currentTarget.querySelector('a')?.click()}
>
	<div class="flex h-full flex-col justify-end p-6">
		<img src={card.image} alt="" class="mb-2 w-full" />
		<h3 class="mb-2 text-xl font-bold"><GlitchText text={card.heading} /></h3>
		<p class="text-light-500 mb-4">
			{card.paragraph}
		</p>
		<a
			href={card.link.href}
			class="flex w-full items-center justify-end gap-2 font-medium text-blue-600 hover:text-blue-800"
		>
			{card.link.label}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-[1rem]"
				viewBox="0 0 24 24"
				fill="currentColor"
				><path
					d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"
				></path></svg
			>
		</a>
	</div>
</div>
