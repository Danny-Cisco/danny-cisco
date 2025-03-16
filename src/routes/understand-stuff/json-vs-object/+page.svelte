<script>
	const jsonExample = `{
    \"name\": \"Alex\",
    \"age\": 30,
    \"skills\": [\"coding\", \"music\", \"skateboarding\"],
    \"active\": true
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
</script>

<div class="page">
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
	<div class="mx-auto mt-10 flex w-full max-w-lg gap-2">
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
	</div>
	<div class="mx-auto mt-4 flex w-full max-w-lg gap-2">
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
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: 20px;
	}
	.box {
		width: 100%;
		padding: 15px;
		border-radius: 8px;
		background-color: #1e1e1e; /* Dark mode background */
		color: white;
	}
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
	.shared {
		color: #10b981; /* Tailwind text-green-500 */
	}
	pre {
		width: 100%;
		font-family: monospace;
		white-space: pre-wrap;
	}
	h3 {
		height: 50px;
	}
</style>
