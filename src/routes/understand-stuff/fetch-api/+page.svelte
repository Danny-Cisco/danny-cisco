<script>
	import Page from '../+page.svelte';

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
	<p>The fetch api is the most versitile way to make api requests in svelte.</p>
	<p>When making your request, you will commonly build a request object by calling:</p>
	<div class="code-block">
		<p>request = fetch(url, &#123options&#125)</p>
	</div>

	<p>
		The url is self explainitory, and the options are a javascript object (hence the squiggle
		brackets) and can contain the following optional options
	</p>

	<div class="flex w-full flex-col items-center gap-20 pt-10">
		<div class="flex w-full max-w-xl flex-col items-stretch gap-2">
			<h3 class="js-key-head w-full">Request Options</h3>
			<div class="w-full bg-gray-800 p-4">
				&#123;
				<p class="option-method"><span class="">method</span>: "GET", "POST", "PUT", "DELETE",</p>
				<p class="option-headers">
					<span class="">headers</span>: &#123;"Content-Type": "application/json"&#125;,
				</p>
				<p class="option-body"><span class="">body</span>: JSON.stringify(data),</p>
				<p class="option-mode"><span class="">mode</span>: "cors", "no-cors", "same-origin",</p>
				<p class="option-credentials">
					<span class="">credentials</span>: "include", "same-origin", "omit"
				</p>
				&#125;
			</div>
			<p>All of them are optional!</p>
			<p>The most common are.. METHOD: HEADERS: BODY:</p>
			<p>BODY is likely a JSON string, therefore will need to use JSON.stringify(YOUR DATA)</p>
		</div>

		<div class="flex w-full max-w-xl flex-col items-stretch gap-2">
			<h3 class="js-key-head w-full">Real Fetch Request Example</h3>
			<div class="w-full bg-gray-800 p-4">
				<p class="request-line">fetch('https://api.example.com/users', &#123;</p>
				<p class="option-method"><span class="">method</span>: 'POST',</p>
				<p class="option-headers"><span class="">headers</span>: &#123;</p>
				<p class="option-headers">'Content-Type': 'application/json',</p>
				<p class="option-headers">
					'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
				</p>
				<p class="option-headers">&#125;,</p>
				<p class="option-body"><span class="">body</span>: JSON.stringify(&#123;</p>
				<p class="option-body">name: 'John Doe',</p>
				<p class="option-body">email: 'john@example.com',</p>
				<p class="option-body">role: 'admin'</p>
				<p class="option-body">&#125;),</p>
				<p class="option-mode"><span class="">mode</span>: 'cors',</p>
				<p class="option-credentials"><span class="">credentials</span>: 'include'</p>
				<p class="request-line">&#125;)</p>
				<p class="request-line">.then(response => response.json())</p>
				<p class="request-line">.then(data => console.log(data))</p>
				<p class="request-line">.catch(error => console.error('Error:', error));</p>
			</div>

			<p>If all goes well, you should recieve a response object</p>

			<h3 class="json-key-head w-full">Response Object</h3>
			<div class="w-full bg-gray-800 p-4">
				Response &#123;
				<p class="response-status"><span class="json-key">status</span>: 200,</p>
				<p class="response-statusText"><span class="json-key">statusText</span>: "OK",</p>
				<p class="response-ok"><span class="json-key">ok</span>: true,</p>
				<p class="response-headers">
					<span class="json-key">headers</span>: Headers &#123;...&#125;,
				</p>
				<p class="response-body"><span class="json-key">body</span>: ReadableStream</p>
				&#125;
			</div>
			<p>Promise-based response object</p>
			<p>Contains metadata and body methods</p>
			<p>The response.ok is very handy. as is !response.ok</p>
			<p>The body cannot be looked at directly, it will just say "Readable Stream"</p>
			<p></p>

			<h3 class="json-key-head w-full">Real Response Object Example</h3>
			<div class="w-full bg-gray-800 p-4">
				<p class="response-line">// After calling response.json()</p>
				<p class="response-line">&#123;</p>
				<p class="response-status"><span class="json-key">id</span>: 123,</p>
				<p class="response-statusText"><span class="json-key">success</span>: true,</p>
				<p class="response-ok">
					<span class="json-key">message</span>: "User created successfully",
				</p>
				<p class="response-headers"><span class="json-key">data</span>: &#123;</p>
				<p class="response-body"><span class="json-key">user</span>: &#123;</p>
				<p class="response-body"><span class="json-key">name</span>: "John Doe",</p>
				<p class="response-body"><span class="json-key">email</span>: "john@example.com",</p>
				<p class="response-body"><span class="json-key">role</span>: "admin",</p>
				<p class="response-body"><span class="json-key">createdAt</span>: "2023-03-19T12:34:56Z"</p>
				<p class="response-body">&#125;</p>
				<p class="response-headers">&#125;,</p>
				<p class="response-line"><span class="json-key">meta</span>: &#123;</p>
				<p class="response-line"><span class="json-key">timestamp</span>: 1679235296,</p>
				<p class="response-line"><span class="json-key">version</span>: "1.0.0"</p>
				<p class="response-line">&#125;</p>
				<p class="response-line">&#125;</p>
			</div>

			<h1>Readable Stream? 🤨 But I need the actual data?</h1>
			<ol>
				<p>.json() .text() and .blob()</p>
				<p>You extract the actual data from the body by using one of these built in covertors</p>
				<li>
					1. response.body.json()
					<p>
						When you expect the body to be in json format, calling .json() will convert the body to
						a javascript object. So remember, despite the name, this does not return json, but a
						javascript object!
					</p>
				</li>
				<li>
					2. response.body.blob()
					<p>
						Audio or Images. A blob is a general purpose object for things other than json, like
						images or audio clips.
					</p>
				</li>
				<li>
					3. response.body.text()
					<p>
						This is for when you want to see the readable stream just as it is. In plain text. It
						may look like a json file, but it wont function as one. It also may be used to see the
						Base64 of a blob.
					</p>
				</li>
			</ol>
		</div>
	</div>

	<hr class="mt-10 w-full border-dashed border-t-white/50" />

	<div class="mx-auto mt-10 flex w-full max-w-2xl items-center justify-center gap-2">
		<div class="js-key-head">fetch(url, options)</div>
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
		<div class="json-key-head">Response Promise</div>
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
		<div class="js-key-head">.json(), .text(), .blob()</div>
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
	.json-key-head {
		background-color: #3b82f6;
		color: white;
		padding: 2px 5px;
		border-radius: 3px;
	}
	.js-key-head {
		background-color: #ef4444;
		color: white;
		padding: 2px 5px;
		border-radius: 3px;
	}
	.code-block {
		padding: 20px;
		margin: 20px;
		background: hsl(0, 0%, 40%);
	}
	h3 {
		height: 50px;
	}

	body {
		background-color: #1a1a1a;
		color: white;
	}
	ol {
		margin-top: 20px;
	}
	li {
		margin-top: 20px;
		font-weight: bold;
	}
	li p {
		font-weight: lighter;
		padding-left: 20px;
	}

	/* Color coding for request options */
	.option-method {
		background-color: rgba(239, 68, 68, 0.2);
		border-left: 3px solid #ef4444;
		padding-left: 5px;
	}
	.option-headers {
		background-color: rgba(59, 130, 246, 0.2);
		border-left: 3px solid #3b82f6;
		padding-left: 5px;
	}
	.option-body {
		background-color: rgba(5, 150, 105, 0.2);
		border-left: 3px solid #059669;
		padding-left: 5px;
	}
	.option-mode {
		background-color: rgba(217, 119, 6, 0.2);
		border-left: 3px solid #d97706;
		padding-left: 5px;
	}
	.option-credentials {
		background-color: rgba(139, 92, 246, 0.2);
		border-left: 3px solid #8b5cf6;
		padding-left: 5px;
	}

	/* Color coding for response object */
	.response-status {
		background-color: rgba(16, 185, 129, 0.2);
		border-left: 3px solid #10b981;
		padding-left: 5px;
	}
	.response-statusText {
		background-color: rgba(245, 158, 11, 0.2);
		border-left: 3px solid #f59e0b;
		padding-left: 5px;
	}
	.response-ok {
		background-color: rgba(99, 102, 241, 0.2);
		border-left: 3px solid #6366f1;
		padding-left: 5px;
	}
	.response-headers {
		background-color: rgba(236, 72, 153, 0.2);
		border-left: 3px solid #ec4899;
		padding-left: 5px;
	}
	.response-body {
		background-color: rgba(124, 58, 237, 0.2);
		border-left: 3px solid #7c3aed;
		padding-left: 5px;
	}

	/* Styles for example code blocks */
	.request-line {
		color: #d1d5db;
	}
	.response-line {
		color: #d1d5db;
	}
</style>
