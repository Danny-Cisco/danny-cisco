<script>
	let showAdvanced = false;
	let responseData = null;
	let isLoading = false;
	let errorMessage = null;

	// Function to make API requests
	async function makeFetchRequest() {
		isLoading = true;
		errorMessage = null;
		responseData = null;

		try {
			const url = showAdvanced
				? 'https://jsonplaceholder.typicode.com/posts'
				: 'https://jsonplaceholder.typicode.com/posts/1';

			const options = showAdvanced
				? {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							title: 'Svelte Fetch Demo',
							body: 'This is a test post.',
							userId: 1
						})
					}
				: null;

			const response = await fetch(url, options);
			const data = await response.json();
			responseData = JSON.stringify(data, null, 2);
		} catch (error) {
			errorMessage = 'Failed to fetch data';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="page pb-40">
	<h2 class="py-10 text-2xl">Anatomy of the Fetch API</h2>

	<!-- Toggle Between Simple and Advanced Examples -->
	<div class="flex justify-center">
		<button class="toggle-btn" on:click={() => (showAdvanced = !showAdvanced)}>
			{showAdvanced ? 'Show Simple Fetch' : 'Show Advanced Fetch'}
		</button>
	</div>

	<!-- Simple Fetch Example -->
	{#if !showAdvanced}
		<div class="example-container">
			<h3>Basic Fetch Request</h3>
			<pre class="fetch-code">
				<span class="url">fetch('https://jsonplaceholder.typicode.com/posts/1')</span>
				<span class="promise">.then(response =&gt; response.json())</span>
				<span class="callback">.then(data =&gt; console.log(data));</span>
			</pre>
			<p>Fetches a single post from JSONPlaceholder.</p>
		</div>
	{/if}

	<!-- Advanced Fetch Example -->
	{#if showAdvanced}
		<div class="example-container">
			<h3>Advanced Fetch with Options</h3>
			<pre class="fetch-code">
				<span class="url">fetch('https://jsonplaceholder.typicode.com/posts', &#123;</span>
				<span class="method">  method: 'POST',</span>
				<span class="headers">  headers: &#123; 'Content-Type': 'application/json' &#125;,</span>
				<span
					class="body">  body: JSON.stringify(&#123; title: 'Svelte Fetch Demo', body: 'This is a test post.', userId: 1 &#125;)</span
				>
				<span class="url">&#125;)</span>
				<span class="promise">.then(response =&gt; response.json())</span>
				<span class="callback">.then(data =&gt; console.log(data));</span>
			</pre>
			<p>Sends a test POST request to JSONPlaceholder.</p>
		</div>
	{/if}

	<!-- Run API Call -->
	<div class="fetch-action">
		<button class="fetch-btn" on:click={makeFetchRequest}>Run Fetch Request</button>
	</div>

	<!-- Response Output -->
	{#if isLoading}
		<p class="loading">Loading...</p>
	{/if}

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}

	{#if responseData}
		<div class="response-container">
			<h3>API Response:</h3>
			<pre class="response-box">{responseData}</pre>
		</div>
	{/if}
</div>

<style>
	.page {
		color: white;
		background-color: #1a1a1a;
		text-align: center;
	}

	.toggle-btn {
		background-color: #2563eb;
		color: white;
		padding: 10px 20px;
		border-radius: 8px;
		border: none;
		cursor: pointer;
	}

	.toggle-btn:hover {
		background-color: #1e40af;
	}

	.example-container {
		background-color: #2d2d2d;
		padding: 20px;
		margin-top: 20px;
		border-radius: 8px;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	.fetch-code {
		background-color: #1e293b;
		padding: 15px;
		border-radius: 8px;
		color: white;
		font-family: monospace;
		text-align: left;
		overflow-x: auto;
	}

	.fetch-action {
		margin-top: 20px;
	}

	.fetch-btn {
		background-color: #10b981;
		color: white;
		padding: 10px 20px;
		border-radius: 8px;
		border: none;
		cursor: pointer;
		font-size: 1rem;
	}

	.fetch-btn:hover {
		background-color: #059669;
	}

	.loading {
		color: #facc15;
		font-size: 1.2rem;
		margin-top: 10px;
	}

	.error {
		color: #f43f5e;
		font-size: 1.2rem;
		margin-top: 10px;
	}

	.response-container {
		margin-top: 20px;
		background-color: #1e293b;
		padding: 15px;
		border-radius: 8px;
		color: white;
		font-family: monospace;
		text-align: left;
		overflow-x: auto;
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	.response-box {
		white-space: pre-wrap;
	}

	/* Syntax Highlighting */
	.url {
		color: #22d3ee;
	} /* Cyan */
	.method {
		color: #facc15;
	} /* Yellow */
	.headers {
		color: #f43f5e;
	} /* Red */
	.body {
		color: #10b981;
	} /* Green */
	.promise {
		color: #f97316;
	} /* Orange */
	.callback {
		color: #a855f7;
	} /* Purple */
</style>
