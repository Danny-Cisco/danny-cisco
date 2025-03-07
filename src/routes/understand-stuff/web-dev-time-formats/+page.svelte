<script lang="ts">
	// We use Svelte’s reactivity to update our values when the user interacts
	let dateInput = '';
	let dateObj: Date;
	let isoString = '';
	let utcString = '';
	let localString = '';
	let unixTimestamp = 0;
	let formattedZone = '';

	// A selection of time zones to experiment with.
	// (You can easily add more from the IANA time zone list.)
	let timeZones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
	let selectedTimeZone = 'UTC';

	// This function updates all our output variables based on the input date and chosen time zone.
	function updateDate() {
		if (dateInput) {
			// Create a new date object based on the input string
			dateObj = new Date(dateInput);
			// ISO 8601: e.g. "2025-03-06T12:00:00.000Z"
			isoString = dateObj.toISOString();
			// UTC String: e.g. "Thu, 06 Mar 2025 12:00:00 GMT"
			utcString = dateObj.toUTCString();
			// Local string based on the user's environment
			localString = dateObj.toString();
			// Unix timestamp (in milliseconds)
			unixTimestamp = dateObj.getTime();
			// Using Intl.DateTimeFormat to format the date for the selected time zone.
			formattedZone = new Intl.DateTimeFormat('en-US', {
				timeZone: selectedTimeZone,
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			}).format(dateObj);
		}
	}
</script>

<div class="container">
	<h1>Time Formats on the Web</h1>
	<p>
		This interactive page explains everything about time formats, time zones, and how JavaScript
		deals with date and time. You’ll see live examples as you change the date, time, and selected
		time zone.
	</p>

	<h2>1. Input a Date and Time</h2>
	<p>Use the control below to pick a date and time. The browser will display a localized picker.</p>
	<input type="datetime-local" bind:value={dateInput} on:change={updateDate} />

	<h2>2. Select a Time Zone</h2>
	<p>
		Choose a time zone to see how the same moment is represented in different parts of the world.
	</p>
	<select bind:value={selectedTimeZone} on:change={updateDate}>
		{#each timeZones as tz}
			<option value={tz}>{tz}</option>
		{/each}
	</select>

	{#if dateInput}
		<h2>3. Output Formats</h2>
		<div class="code-block">
			<p><strong>ISO 8601:</strong> {isoString}</p>
			<p><strong>UTC String:</strong> {utcString}</p>
			<p><strong>Local String:</strong> {localString}</p>
			<p><strong>Unix Timestamp:</strong> {unixTimestamp}</p>
			<p>
				<strong>Formatted in {selectedTimeZone}:</strong>
				{formattedZone}
			</p>
		</div>
	{/if}

	<h2>Deep Dive: Concepts Behind the Code</h2>

	<section>
		<h3>Time Formats</h3>
		<p>Time formats determine how date and time information is structured and communicated:</p>
		<ul>
			<li>
				<strong>ISO 8601:</strong> An internationally accepted way to represent date and time (e.g.
				<code>2025-03-06T12:00:00Z</code>). It’s the standard output for many APIs.
			</li>
			<li>
				<strong>RFC 2822:</strong> Often used in email headers, formatted like
				<code>Thu, 06 Mar 2025 12:00:00 +0000</code>.
			</li>
			<li>
				<strong>Unix Timestamp:</strong> A numeric representation (milliseconds since January 1, 1970)
				that is often used in computing.
			</li>
		</ul>
		<p>
			JavaScript provides methods like <code>toISOString()</code>, <code>toUTCString()</code>, and
			<code>toString()</code> to convert date objects into these formats.
		</p>
	</section>

	<section>
		<h3>Time Zones</h3>
		<p>
			Time zones help us interpret a moment in time according to geographical and political regions:
		</p>
		<ul>
			<li>
				<strong>UTC (Coordinated Universal Time):</strong> The baseline time zone from which all others
				are calculated.
			</li>
			<li>
				<strong>Local Time:</strong> The time as configured on the user’s device, which may adjust for
				daylight saving.
			</li>
			<li>
				<strong>IANA Time Zone Database:</strong> A comprehensive database that JavaScript’s
				<code>Intl</code> API leverages to format dates in specific regions.
			</li>
		</ul>
		<p>
			For advanced handling, libraries like <a href="https://momentjs.com/timezone/" target="_blank"
				>Moment Timezone</a
			>
			or <a href="https://moment.github.io/luxon/" target="_blank">Luxon</a> provide even greater control.
		</p>
	</section>

	<section>
		<h3>JavaScript and Time Handling</h3>
		<p>
			The built-in <code>Date</code> object in JavaScript, along with the modern <code>Intl</code> API,
			provides tools to:
		</p>
		<ul>
			<li>
				<strong>Create Dates:</strong> Using <code>new Date()</code> to generate a date object from a
				variety of inputs.
			</li>
			<li>
				<strong>Parse Strings:</strong> Converting a date string into a Date object using
				<code>Date.parse()</code>.
			</li>
			<li>
				<strong>Format Dates:</strong> With methods such as <code>toISOString()</code>,
				<code>toUTCString()</code>, and <code>toString()</code>.
			</li>
		</ul>
		<p>
			As you build more complex applications, consider using libraries that add more power and
			clarity when handling internationalization and time zones.
		</p>
	</section>

	<h2>Additional Resources</h2>
	<ul>
		<li>
			<a
				href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"
				target="_blank"
			>
				MDN Date Documentation
			</a>
		</li>
		<li>
			<a
				href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
				target="_blank"
			>
				MDN Intl Documentation
			</a>
		</li>
		<li>
			<a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank"> ISO 8601 on Wikipedia </a>
		</li>
		<li>
			<a href="https://moment.github.io/luxon/#/" target="_blank"> Luxon Documentation </a>
		</li>
	</ul>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: sans-serif;
		line-height: 1.6;
	}
	input,
	select {
		padding: 0.5rem;
		margin: 0.5rem 0;
		font-size: 1rem;
		color: black;
	}
	.code-block {
		background: #f5f5f5;
		color: black;
		padding: 1rem;
		border-radius: 5px;
		font-family: monospace;
	}
	h1,
	h2,
	h3 {
		margin-top: 1.5rem;
	}
</style>
