<script>
	// State variables
	let signBit = 0;
	let exponentBits = 0;
	let mantissaBit = 0;
	let explanation = '';
	let sliderValue = 0;

	// Make decimalValue reactive based on the bit values
	$: {
		// This reactive block will run whenever signBit, exponentBits, or mantissaBit changes
		const signMultiplier = signBit === 0 ? 1 : -1;
		const biasedExponent = exponentBits - 1; // Bias of 1
		const mantissaValue = mantissaBit === 0 ? 0 : 0.5; // Single mantissa bit represents 2^-1 = 0.5

		if (exponentBits === 0) {
			// Denormalized numbers (exponent = 0)
			decimalValue = signMultiplier * Math.pow(2, -1) * mantissaValue;
			explanation = `Denormalized number: ${signMultiplier} × 2^(-1) × ${mantissaValue}`;
		} else if (exponentBits === 3) {
			// Special values for exponent = 3 (all 1s)
			if (mantissaBit === 0) {
				decimalValue = signMultiplier * Infinity;
				explanation = `${signMultiplier === 1 ? 'Positive' : 'Negative'} infinity`;
			} else {
				decimalValue = NaN;
				explanation = `NaN (Not a Number)`;
			}
		} else {
			// Normalized numbers (exponent between 0 and 3 exclusive)
			decimalValue = signMultiplier * Math.pow(2, biasedExponent) * (1 + mantissaValue);
			explanation = `Normalized number: ${signMultiplier} × 2^(${biasedExponent}) × (1 + ${mantissaValue})`;
		}
	}

	// Calculate binary representation from individual bits
	$: binaryValue = `${signBit}${exponentBits.toString(2).padStart(2, '0')}${mantissaBit}`;

	// Declare decimalValue after it's used in the reactive statement
	let decimalValue;

	function handleSliderChange(e) {
		sliderValue = parseInt(e.target.value);

		// Adjust sign and exponent based on the slider, but leave mantissa untouched
		signBit = sliderValue < 0 ? 1 : 0;

		// Map slider values to exponents
		const absValue = Math.abs(sliderValue);
		if (absValue === 0) {
			exponentBits = 0;
		} else if (absValue <= 0.5) {
			exponentBits = 0;
		} else if (absValue <= 1) {
			exponentBits = 1;
		} else if (absValue <= 2) {
			exponentBits = 2;
		} else {
			exponentBits = 3;
		}
	}

	function toggleSign() {
		signBit = signBit === 0 ? 1 : 0;
	}

	function cycleExponent() {
		exponentBits = (exponentBits + 1) % 4;
	}

	function toggleMantissa() {
		mantissaBit = mantissaBit === 0 ? 1 : 0;
	}
</script>

<div
	class="bg-gray-100 text-gray-500"
	style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;"
>
	<h1 style="font-size: 24px; margin-bottom: 16px;">Understanding Floating Point Mantissa (FP4)</h1>
	<p style="margin-bottom: 24px;">
		FP4 format: 1 sign bit, 2 exponent bits (bias of 1), 1 mantissa bit
	</p>

	<div style="text-align: center; margin-bottom: 32px;">
		<h2 style="font-size: 48px; margin-bottom: 8px;">
			{#if Number.isNaN(decimalValue)}
				NaN
			{:else if decimalValue === Infinity}
				∞
			{:else if decimalValue === -Infinity}
				-∞
			{:else}
				{decimalValue.toFixed(2)}
			{/if}
		</h2>
		<div>Decimal Value</div>
	</div>

	<div class="w-full justify-center" style="display: flex; gap: 16px; margin-bottom: 24px;">
		<div>
			<button
				on:click={toggleSign}
				style="width: 80px; height: 80px; font-size: 24px; font-weight: bold; background-color: #ffdddd; border: 2px solid #ffaaaa; border-radius: 8px; cursor: pointer; margin-bottom: 8px;"
			>
				{signBit}
			</button>
			<div>
				<div style="font-weight: bold;">Sign Bit</div>
				<div style="font-size: 14px;">{signBit === 0 ? 'Positive' : 'Negative'}</div>
			</div>
		</div>

		<div style="text-align: center;">
			<button
				on:click={cycleExponent}
				style="width: 80px; height: 80px; font-size: 24px; font-weight: bold; background-color: #ddffdd; border: 2px solid #aaffaa; border-radius: 8px; cursor: pointer; margin-bottom: 8px;"
			>
				{exponentBits.toString(2).padStart(2, '0')}
			</button>
			<div>
				<div style="font-weight: bold;">Exponent Bits</div>
				<div style="font-size: 14px;">Bias of 1, Actual: {exponentBits - 1}</div>
			</div>
		</div>

		<div style="text-align: center;">
			<button
				on:click={toggleMantissa}
				style="width: 80px; height: 80px; font-size: 24px; font-weight: bold; background-color: #ddddff; border: 2px solid #aaaaff; border-radius: 8px; cursor: pointer; margin-bottom: 8px;"
			>
				{mantissaBit}
			</button>
			<div>
				<div style="font-weight: bold;">Mantissa Bit</div>
				<div style="font-size: 14px;">Value: {mantissaBit === 0 ? '0' : '0.5'}</div>
			</div>
		</div>
	</div>

	<div style="margin-bottom: 24px;">
		<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
			<span>-3</span>
			<span>-2</span>
			<span>-1</span>
			<span>0</span>
			<span>1</span>
			<span>2</span>
			<span>3</span>
		</div>
		<input
			type="range"
			min="-3"
			max="3"
			step="0.5"
			value={sliderValue}
			on:input={handleSliderChange}
			style="width: 100%; margin-bottom: 4px;"
		/>
		<div style="text-align: center;">
			Slider value: {sliderValue} (adjusts sign & exponent only)
		</div>
	</div>

	<div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
		<h2 style="font-size: 20px; margin-bottom: 8px;">Binary Representation</h2>
		<div style="font-family: monospace; font-size: 20px; font-weight: bold;">
			{binaryValue} = {signBit}
			{exponentBits.toString(2).padStart(2, '0')}
			{mantissaBit}
		</div>
	</div>

	<div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
		<h2 style="font-size: 20px; margin-bottom: 8px;">Explanation</h2>
		<p>{explanation}</p>
	</div>

	<div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px;">
		<h2 style="font-size: 20px; margin-bottom: 8px;">The Role of the Mantissa</h2>
		<p style="margin-bottom: 8px;">
			The mantissa represents the precision bits of a floating-point number.
		</p>
		<p style="margin-bottom: 8px;">
			In normalized form, the mantissa is interpreted as 1.mantissa_bits:
		</p>
		<ul style="margin-left: 20px;">
			<li>When mantissa bit = 0: value = 1.0</li>
			<li>When mantissa bit = 1: value = 1.5</li>
		</ul>
		<p style="margin-top: 8px;">
			Try toggling the mantissa bit with exponent = 01 to see the value change between 1.0 and 1.5
		</p>
	</div>
</div>
