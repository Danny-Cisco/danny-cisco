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
	<div class="p-6">
		<h3 class="mb-2 text-xl font-bold"><GlitchText text={card.heading} /></h3>
		<p class="text-light-500 mb-4">
			{card.paragraph}
		</p>
		<a href={card.link.href} class="font-medium text-blue-600 hover:text-blue-800">
			{card.link.label}
		</a>
	</div>
</div>
