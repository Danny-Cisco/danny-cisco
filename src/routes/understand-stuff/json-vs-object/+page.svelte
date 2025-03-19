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
	<h2 class="py-10 text-2xl">JSON vs JavaScript Object</h2>

	<div class="flex w-full flex-col items-start gap-8">
		<p>
			JSON and Javascript objects look very similar at a glance, but they are actually very
			different.
		</p>
		<p>
			JSON can be thought of as a simple notation standard for storing key/value pairs outside of
			your code.
		</p>
		<p>
			A javascript object stores key/value pairs, but it is also more active. It can mutate itself
			with methods (functions), as well as enable object oriented programming by encapsulating
			related functions inside the object.
		</p>
		<p>
			From a practical standpoint, most front-end code on the web shies away from object-oriented
			programming do to the trouble of triggering reactivity when an object mutates. The biggest
			asset remains being able to use dot notation to access key value pairs, and the many built in
			methods such as sort and map which are built in to every object.
		</p>
		<p>Summary:</p>
		<p>
			<span class="js-key">Use javascript objects</span> to deal key/value pairs internally.
		</p>
		<p>
			<span class="json-key">Use json notation </span> to send, receive and store key/value pairs externally.
		</p>
	</div>

	<div class="flex w-full max-w-xl flex-col items-stretch gap-2">
		<div class="mt-10 flex w-full max-w-xl flex-col items-stretch gap-2">
			<h3 class="json-key w-full">JSON string</h3>
			<div class="w-full bg-gray-800 p-4">
				&#123;
				<p><span class="json-key">"name"</span>: "Danny",</p>
				<p><span class="json-key">"age"</span>: 48,</p>
				<p><span class="json-key">"skills"</span>: ["coding", "drawing", "skateboarding"],</p>
				<p><span class="json-key">"active"</span>: true</p>
				&#125;
			</div>
			<p>JSON is just a notation standard</p>
			<p>JSON is stored as a plain string</p>
			<p>Keys must be quoted</p>
			<p>Cannot include functions</p>
			<p>Must be parsed into a javascript object before it can be used in javascript</p>
			<p>The 2 common ways of parsing are:</p>
			<p>response.body.json() if parsing from a fetch api call</p>
			<p>or JSON.parse(myJsonString) for other parsing such as when json is stored on a server.</p>
		</div>
		<h3 class="js-key mt-20 w-full">JavaScript Object</h3>
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
		<p>
			JavaScript objects contain many built in methods that must be stripped away if intending to
			store the object in JSON notation
		</p>
		<p>That is where JSON.stringify(myObject) comes in.</p>
	</div>

	<hr class="mt-10 w-full border-dashed border-t-white/50" />

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
			class="ml-20 flex w-5 items-center justify-center rounded-full bg-gray-700 hover:cursor-pointer hover:bg-gray-600"
			on:click={toggleStringify}
		>
			?
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
			class="ml-20 flex w-5 items-center justify-center rounded-full bg-gray-700 hover:cursor-pointer hover:bg-gray-600"
			on:click={toggleParse}
		>
			?
		</button>
	</div>
	<div class="mx-auto mt-4 flex w-full max-w-2xl items-center justify-center gap-2">
		<div class="json-key">JSON from fetch api</div>
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

		<div class="">response.body.json()</div>
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
			class="ml-20 flex w-5 items-center justify-center rounded-full bg-gray-700 hover:cursor-pointer hover:bg-gray-600"
			on:click={toggleParse}
		>
			?
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
							<span class="json-key">text</span>: The JSON string to parse.
						</li>
						<li>
							<span class="json-key">reviver</span> (optional): A function to transform parsed values.
						</li>
						<li>Throws a SyntaxError if the JSON is invalid.</li>
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
