// timerStore.js
import { writable, derived, get } from 'svelte/store';

function createTimerStore() {
	// Base time stores
	const startDateObj = writable(null);
	const nowDateObj = writable(null);
	const endDateObj = writable(null);

	// Derived millisecond values
	const startMs = derived(startDateObj, ($startDateObj) => $startDateObj?.getTime());
	const nowMs = derived(nowDateObj, ($nowDateObj) => $nowDateObj?.getTime());
	const endMs = derived(endDateObj, ($endDateObj) => $endDateObj?.getTime());

	// Additional timer specific stores
	const isRunning = writable(false);
	const timerDuration = writable(120); // Default 120 minutes
	const timerEndTime = writable(null);
	const seconds = writable(0);
	const minutes = writable(0);
	const pageLoaded = writable(false);
	const isEndTime = writable(true);

	// Derived values for UI
	const nowMins = derived(
		[timerDuration, minutes],
		([$timerDuration, $minutes]) => $timerDuration - $minutes
	);

	const buttonLabel = derived(isRunning, ($isRunning) => ($isRunning ? 'STOP' : 'START'));

	const endTimeButtonLabel = derived(isEndTime, ($isEndTime) =>
		$isEndTime ? 'END TIME' : 'DURATION'
	);

	// Intervals
	let interval60;
	let interval1;
	let nowClock;

	// Initialize all dates
	const initializeDates = () => {
		const now = new Date();
		startDateObj.set(now);
		nowDateObj.set(now);
		endDateObj.set(now);

		const today = now.toISOString().split('T')[0];
		return today;
	};

	// Start the timer
	const startTimer = () => {
		isRunning.set(true);

		// Start minute counter
		if (interval60) clearInterval(interval60);
		interval60 = setInterval(() => {
			if (get(isRunning)) {
				minutes.update((m) => m + 1);
			}
		}, 1000 * 60);

		// Start second counter
		if (interval1) clearInterval(interval1);
		interval1 = setInterval(() => {
			if (get(isRunning)) {
				seconds.update((s) => s + 1);
				// Also update nowDateObj for accurate time tracking
				nowDateObj.set(new Date());
			}
		}, 1000);

		return { interval60, interval1 };
	};

	// Stop the timer
	const stopTimer = () => {
		isRunning.set(false);
	};

	// Toggle timer state
	const toggleTimer = () => {
		const running = get(isRunning);
		if (running) {
			stopTimer();
		} else {
			startTimer();
		}
	};

	// Update end time and recalculate duration
	const updateEndTime = (timeString) => {
		timerEndTime.set(timeString);

		if (get(pageLoaded) && !get(isRunning)) {
			const today = get(nowDateObj).toISOString().split('T')[0];
			const fullDateTime = `${today}T${timeString}`;
			const targetMs = new Date(fullDateTime).getTime();
			const currentMs = get(nowMs);

			let calculatedDuration = Math.trunc((targetMs - currentMs) / 1000 / 60);

			// If duration is negative, add 24 hours (1440 minutes)
			if (calculatedDuration < 0) {
				calculatedDuration += 1440;
			}

			timerDuration.set(calculatedDuration);
		}
	};

	// Clean up all intervals
	const cleanup = () => {
		if (interval60) clearInterval(interval60);
		if (interval1) clearInterval(interval1);
		if (nowClock) clearInterval(nowClock);
	};

	// Toggle between end time and duration input modes
	const toggleEndTimeMode = () => {
		isEndTime.update((val) => !val);
	};

	return {
		// Base stores
		startDateObj,
		nowDateObj,
		endDateObj,
		startMs,
		nowMs,
		endMs,

		// Timer specific stores
		isRunning,
		timerDuration,
		timerEndTime,
		seconds,
		minutes,
		pageLoaded,
		isEndTime,
		nowMins,
		buttonLabel,
		endTimeButtonLabel,

		// Methods
		initializeDates,
		startTimer,
		stopTimer,
		toggleTimer,
		updateEndTime,
		cleanup,
		toggleEndTimeMode
	};
}

// Export a singleton instance
export const timerStore = createTimerStore();
