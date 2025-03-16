<script>
	let isOpenStringify = false;
	let isOpenParse = false;

	const jsonExample = `{
    "name": "Alex",
    "age": 30,
    "skills": ["coding", "music", "skateboarding"],
    "active": true
  }`;

	const jsObject = {
		name: 'Alex',
		age: 30,
		skills: ['coding', 'music', 'skateboarding'],
		active: true,
		greet: function () {
			return 'Hello!';
		}
	};

	const toggleParse = () => {
		isOpenParse = !isOpenParse;
	};
	const toggleStringify = () => {
		isOpenStringify = !isOpenStringify;
	};
</script>

<div class="page pb-40">
	<h2>JSON vs JavaScript Object</h2>

	<div class="flex w-full flex-col items-center gap-20">
		<div class="flex w-full max-w-xl flex-col items-stretch gap-2">
			<h3 class="js-key w-full">JavaScript Object</h3>
			<div class="w-full bg-gray-800 p-4">
				&#123;
				<p><span class="js-key">name</span>: "Danny",</p>
				<p><span class="js-key">age</span>: 48,</p>
				<p><span class="js-key">skills</span>: ["coding", "drawing", "skateboarding"],</p>
				<p><span class="js-key">active</span>: true,</p>
				<p>
					<span class="js-key">greeting</span>:
					<span class="js-key">function() &#123; return "✋ High Five!"; &#125;</span>
				</p>
				&#125;
			</div>
			<p>Keys are unquoted</p>
			<p>Functions are allowed</p>
		</div>
		<div class="flex w-full max-w-xl flex-col items-stretch gap-2">
			<h3 class="json-key w-full">JSON string</h3>
			<div class="w-full bg-gray-800 p-4">
				&#123;
				<p><span class="json-key">"name"</span>: "Danny",</p>
				<p><span class="json-key">"age"</span>: 48,</p>
				<p><span class="json-key">"skills"</span>: ["coding", "drawing", "skateboarding"],</p>
				<p><span class="json-key">"active"</span>: true</p>
				&#125;
			</div>
			<p>JSON is stored as a plain string</p>
			<p>Keys must be quoted</p>
			<p>Cannot include functions</p>
		</div>
	</div>

	<hr class="mt-10 w-full border-t-white" />

	<div class="mx-auto mt-10 flex w-full max-w-2xl items-center justify-center gap-2">
		<div class="js-key">Object</div>
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

		<div class="">JSON.stringify(<span class="js-key">Object</span>)</div>
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

		<div class="json-key">JSON string</div>
		<button
			class="flex items-center justify-between rounded-full bg-gray-700 text-left hover:bg-gray-600"
			on:click={toggleStringify}
		>
			<svg
				class="size-6 transition-transform {isOpenStringify ? 'rotate-180' : ''}"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>

	<div class="mx-auto mt-4 flex w-full max-w-2xl items-center justify-center gap-2">
		<div class="json-key">JSON string</div>
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

		<div class="">JSON.parse(<span class="json-key">JSON string</span>)</div>
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

		<div class="js-key">Object</div>
		<button
			class="flex items-center justify-between rounded-full bg-gray-700 text-left hover:bg-gray-600"
			on:click={toggleParse}
		>
			<svg
				class="size-6 transition-transform {isOpenParse ? 'rotate-180' : ''}"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>

	<!-- Collapsible Details Section -->
	<div class="mx-auto w-full max-w-lg">
		{#if isOpenStringify}
			<div class="mt-4 rounded-lg bg-gray-800 p-6 transition-all">
				<div class="mb-8">
					<h4 class="mb-4 text-lg font-semibold">JSON.stringify()</h4>
					<ul class="list-inside list-disc space-y-2">
						<li>Converts JavaScript objects into JSON strings</li>
						<li>
							Can take up to 3 parameters:
							<pre class="mt-2 bg-gray-900 p-2">JSON.stringify(object, replacer, space)</pre>
						</li>
						<li>
							<span class="js-key">object</span>: The object to convert
						</li>
						<li>
							<span class="js-key">replacer</span> (optional): A function or array to transform values
						</li>
						<li>
							<span class="js-key">space</span> (optional): Adds indentation for readability. Common
							value is 2.
						</li>
					</ul>
				</div>
			</div>
		{/if}
		{#if isOpenParse}
			<div class="mt-4 rounded-lg bg-gray-800 p-6 transition-all">
				<div>
					<h4 class="mb-4 text-lg font-semibold">JSON.parse()</h4>
					<ul class="list-inside list-disc space-y-2">
						<li>Parses JSON strings into JavaScript objects</li>
						<li>
							Can take 2 parameters:
							<pre class="mt-2 bg-gray-900 p-2">JSON.parse(text, reviver)</pre>
						</li>
						<li>
							<span class="json-key">text</span>: The JSON string to parse
						</li>
						<li>
							<span class="json-key">reviver</span> (optional): A function to transform parsed values
						</li>
						<li>Throws a SyntaxError if the JSON is invalid</li>
					</ul>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.json-key {
		background-color: #3b82f6; /* Tailwind bg-blue-500 */
		color: white;
		padding: 2px 5px;
		border-radius: 3px;
	}
	.js-key {
		background-color: #ef4444; /* Tailwind bg-red-500 */
		color: white;
		padding: 2px 5px;
		border-radius: 3px;
	}

	h3 {
		height: 50px;
	}

	:global(body) {
		background-color: #1a1a1a;
		color: white;
	}
</style>
