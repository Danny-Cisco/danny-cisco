// timerStore.js
import { writable, derived } from 'svelte/store';

function createTimerStore() {
	// Create the base writable stores
	const startDateObj = writable(null);
	const nowDateObj = writable(null);
	const endDateObj = writable(null);

	// Create derived stores for the millisecond values
	const startMs = derived(startDateObj, ($startDateObj) => $startDateObj?.getTime());
	const nowMs = derived(nowDateObj, ($nowDateObj) => $nowDateObj?.getTime());
	const endMs = derived(endDateObj, ($endDateObj) => $endDateObj?.getTime());

	// Initialize clock interval ID
	let nowClock;

	// Start the clock
	const startClock = () => {
		// Clear any existing interval first
		if (nowClock) clearInterval(nowClock);

		// Update now time every second
		nowClock = setInterval(() => {
			nowDateObj.set(new Date());
		}, 1000);

		return nowClock;
	};

	// Stop the clock
	const stopClock = () => {
		if (nowClock) {
			clearInterval(nowClock);
			nowClock = null;
		}
	};

	// Initialize all dates
	const initializeDates = () => {
		const now = new Date();
		startDateObj.set(now);
		nowDateObj.set(now);
		endDateObj.set(now);
	};

	// Reset now to current time
	const getNow = () => {
		nowDateObj.set(new Date());
	};

	return {
		// Expose the stores
		startDateObj,
		nowDateObj,
		endDateObj,
		startMs,
		nowMs,
		endMs,

		// Expose the methods
		startClock,
		stopClock,
		initializeDates,
		getNow
	};
}

// Export a singleton instance
export const timerStore = createTimerStore();
