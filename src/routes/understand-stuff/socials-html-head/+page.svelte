<script>
	import { onMount } from 'svelte';

	// Basic Meta
	let title = 'Danny Cisco';
	let description =
		'Danny Cisco is a maker and web designer from Melbourne. This is a place for all his hacky experiments.';
	let siteUrl = 'https://dannycisco.com';
	let siteName = "Danny Cisco's home on the web.";
	let authorName = 'Danny Cisco';

	// Images and Icons
	let mainImage = 'https://dannycisco.com/DannyCiscoLogoBlack.jpg';
	let imageAlt = 'Danny Cisco logo';
	let faviconIco = '/favicon.ico';
	let faviconSvg = '/icon.svg';
	let appleIcon = '/apple-touch-icon.png';
	let manifestPath = '/manifest.webmanifest';

	// Social Media
	let twitterHandle = '@NascentClouds';

	// Font
	let fontUrl =
		'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap';

	let generatedOutput = '';

	function updateGeneratedOutput() {
		const headContent = `<meta charset="utf-8" />
<title>${title}</title>
<meta name="description" content="${description}" />

<!-- Favicons and Icons -->
<link rel="icon" href="${faviconIco}" sizes="any" />
<link rel="icon" href="${faviconSvg}" type="image/svg+xml" />
<link rel="apple-touch-icon" href="${appleIcon}" />
<link rel="manifest" href="${manifestPath}" />

<!-- Font -->
<link href="${fontUrl}" rel="stylesheet" />

<!-- Viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${siteUrl}" />
<meta property="og:image" content="${mainImage}" />
<meta property="og:image:alt" content="${imageAlt}" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${mainImage}" />
<meta name="twitter:image:alt" content="${imageAlt}" />
<meta name="twitter:site" content="${twitterHandle}" />

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${siteName}",
  "url": "${siteUrl}",
  "description": "${description}",
  "image": "${mainImage}",
  "author": {
    "@type": "Person",
    "name": "${authorName}"
  }
}
<\/script>

%sveltekit.head%`;

		generatedOutput = headContent;
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(generatedOutput);
		alert('Copied to clipboard!');
	}

	onMount(updateGeneratedOutput);
</script>

<main class="container">
	<h1>Complete Head Tag Generator</h1>

	<div class="form-sections">
		<section class="form-section">
			<h2>Basic Meta</h2>
			<label>
				Title:
				<input type="text" bind:value={title} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Description:
				<textarea bind:value={description} on:input={updateGeneratedOutput}></textarea>
			</label>

			<label>
				Website URL:
				<input type="text" bind:value={siteUrl} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Site Name:
				<input type="text" bind:value={siteName} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Author Name:
				<input type="text" bind:value={authorName} on:input={updateGeneratedOutput} />
			</label>
		</section>

		<section class="form-section">
			<h2>Images and Icons</h2>
			<label>
				Main Image URL:
				<input type="text" bind:value={mainImage} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Image Alt Text:
				<input type="text" bind:value={imageAlt} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Favicon ICO Path:
				<input type="text" bind:value={faviconIco} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Favicon SVG Path:
				<input type="text" bind:value={faviconSvg} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Apple Touch Icon Path:
				<input type="text" bind:value={appleIcon} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Manifest Path:
				<input type="text" bind:value={manifestPath} on:input={updateGeneratedOutput} />
			</label>
		</section>

		<section class="form-section">
			<h2>Social Media & Font</h2>
			<label>
				Twitter Handle:
				<input type="text" bind:value={twitterHandle} on:input={updateGeneratedOutput} />
			</label>

			<label>
				Google Font URL:
				<input type="text" bind:value={fontUrl} on:input={updateGeneratedOutput} />
			</label>
		</section>
	</div>

	<div class="output-section">
		<div class="output-header">
			<h2>Generated Head Content</h2>
			<button on:click={copyToClipboard}>Copy to Clipboard</button>
		</div>
		<pre>{generatedOutput}</pre>
	</div>
</main>

<style>
	.container {
		max-width: 1200px;
		margin: auto;
		padding: 20px;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	h1 {
		color: #2c3e50;
		margin-bottom: 1.5rem;
	}

	h2 {
		color: #2c3e50;
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.form-sections {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.form-section {
		padding: 1.5rem;
		border-radius: 8px;
	}

	label {
		display: block;
		margin-bottom: 1rem;
		font-weight: 500;
	}

	input,
	textarea {
		display: block;
		width: 100%;
		padding: 8px;
		margin-top: 5px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
	}

	textarea {
		height: 80px;
		resize: vertical;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	.output-section {
		border-radius: 8px;
		padding: 20px;
	}

	.output-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.output-header h2 {
		margin: 0;
	}

	pre {
		padding: 15px;
		border-radius: 6px;
		border: 1px solid #ddd;
		white-space: pre-wrap;
		word-wrap: break-word;
		font-size: 14px;
		line-height: 1.5;
		margin: 0;
		max-height: 500px;
		overflow-y: auto;
	}

	button {
		padding: 8px 16px;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		transition: background-color 0.2s;
	}

	button:hover {
		background: #0056b3;
	}

	button:active {
		transform: translateY(1px);
	}

	@media (max-width: 768px) {
		.form-sections {
			grid-template-columns: 1fr;
		}
	}
</style>
