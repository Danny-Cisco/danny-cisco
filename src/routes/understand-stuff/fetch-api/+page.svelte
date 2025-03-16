<script>
	let isOpenRequest = false;
	let isOpenResponse = false;

	const fetchExample = `fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
  })`;

	const toggleRequest = () => {
		isOpenRequest = !isOpenRequest;
	};
	const toggleResponse = () => {
		isOpenResponse = !isOpenResponse;
	};
</script>

<div class="page pb-40">
	<h2 class="py-10 text-2xl">Anatomy of the Fetch API</h2>

	<div class="flex w-full flex-col items-center gap-20">
		<div class="flex w-full max-w-xl flex-col items-stretch gap-2">
			<h3 class="js-key w-full">Request Object</h3>
			<div class="w-full bg-gray-800 p-4">
				&#123;
				<p><span class="js-key">method</span>: "GET", "POST", "PUT", "DELETE",</p>
				<p><span class="js-key">headers</span>: &#123;"Content-Type": "application/json"&#125;,</p>
				<p><span class="js-key">body</span>: JSON.stringify(data),</p>
				<p><span class="js-key">mode</span>: "cors", "no-cors", "same-origin",</p>
				<p><span class="js-key">credentials</span>: "include", "same-origin", "omit"</p>
				&#125;
			</div>
			<p>Configuration object for the request</p>
			<p>All properties are optional</p>
		</div>

		<div class="flex w-full max-w-xl flex-col items-stretch gap-2">
			<h3 class="json-key w-full">Response Object</h3>
			<div class="w-full bg-gray-800 p-4">
				Response &#123;
				<p><span class="json-key">status</span>: 200,</p>
				<p><span class="json-key">statusText</span>: "OK",</p>
				<p><span class="json-key">ok</span>: true,</p>
				<p><span class="json-key">headers</span>: Headers &#123;...&#125;,</p>
				<p><span class="json-key">body</span>: ReadableStream</p>
				&#125;
			</div>
			<p>Promise-based response object</p>
			<p>Contains metadata and body methods</p>
		</div>
	</div>

	<hr class="mt-10 w-full border-dashed border-t-white/50" />

	<div class="mx-auto mt-10 flex w-full max-w-2xl items-center justify-center gap-2">
		<div class="js-key">fetch(url, options)</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
			/>
		</svg>
		<div class="json-key">Response Promise</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
			/>
		</svg>
		<div class="js-key">.json(), .text(), .blob()</div>
		<button
			class="ml-20 flex w-5 items-center justify-center rounded-full bg-gray-700 hover:cursor-pointer hover:bg-gray-600"
			on:click={toggleRequest()}>?</button
		>
	</div>

	{#if isOpenRequest}
		<div class="mx-auto mt-4 w-full max-w-lg">
			<div class="rounded-lg bg-gray-800 p-6 transition-all">
				<div class="mb-8">
					<h4 class="mb-4 text-lg font-semibold">Request Methods</h4>
					<ul class="list-inside list-disc space-y-2">
						<li>Returns a Promise that resolves to a Response object</li>
						<li>First parameter is the URL (required)</li>
						<li>Second parameter is the options object (optional)</li>
						<li>
							Common options include:
							<pre class="mt-2 bg-gray-900 p-2">
method: HTTP method
headers: Request headers
body: Request body
mode: CORS mode
credentials: Cookie handling</pre>
						</li>
					</ul>
				</div>
			</div>
		</div>
	{/if}

	{#if isOpenResponse}
		<div class="mx-auto mt-4 w-full max-w-lg">
			<div class="rounded-lg bg-gray-800 p-6 transition-all">
				<div>
					<h4 class="mb-4 text-lg font-semibold">Response Methods</h4>
					<ul class="list-inside list-disc space-y-2">
						<li>Response object contains metadata about the response</li>
						<li>
							Body must be extracted using a method:
							<pre class="mt-2 bg-gray-900 p-2">.json() - Parse as JSON
.text() - Get as text
.blob() - Get as binary data</pre>
						</li>
						<li>Each method returns a new Promise</li>
						<li>Body can only be consumed once</li>
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.json-key {
		background-color: #3b82f6;
		color: white;
		padding: 2px 5px;
		border-radius: 3px;
	}
	.js-key {
		background-color: #ef4444;
		color: white;
		padding: 2px 5px;
		border-radius: 3px;
	}

	h3 {
		height: 50px;
	}

	body {
		background-color: #1a1a1a;
		color: white;
	}
</style>
