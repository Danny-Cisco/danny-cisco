export function playSound() {
	const context = new (window.AudioContext || window.webkitAudioContext)();
	const oscillator = context.createOscillator();
	const gainNode = context.createGain(); // To avoid pops

	oscillator.type = 'sine'; // Change to "square", "sawtooth", "triangle" for different effects
	oscillator.connect(gainNode);
	gainNode.connect(context.destination);

	let startTime = context.currentTime; // Start time
	let frequency = 250; // Start frequency
	let stepDuration = 0.1; // Each step lasts 100ms (0.1 seconds)
	let maxFrequency = 4000;

	// Schedule stepped frequency changes
	for (let i = 0; frequency <= maxFrequency; i++) {
		let stepTime = startTime + i * stepDuration; // Schedule each step 100ms apart
		oscillator.frequency.setValueAtTime(frequency, stepTime);
		frequency *= 2; // Double the frequency each step
	}

	oscillator.start();
	oscillator.stop(startTime + Math.log2(maxFrequency / 250) * stepDuration); // Stop when done
}

export function requestNotificationPermission() {
	if ('Notification' in window) {
		Notification.requestPermission().then((permission) => {
			console.log(Notification.permission);
			if (permission === 'granted') {
				return true;
				console.log('Notifications are allowed!');
			} else {
				console.log('Notifications are blocked!');
				return false;
			}
		});
	} else {
		console.log('This browser does not support notifications.');
	}
}

export function getOneHourLater() {
	// this function loads the time picker with a value 1 hour from the clients local time
	let oneHour = new Date().getTime() + 1 * 60 * 60 * 1000;
	let oneHourString = new Date(oneHour).toISOString().slice(0, 16);
	let tz = new Date().getTimezoneOffset() / 60;
	let tzHour = Math.trunc(tz); // removes decimals
	let tzMin = tz % 1; // extracts only decimals
	tzMin = Math.abs(tzMin); // removes sign from decimal
	tzMin = tzMin * 60; // turns decimal hours into minutes
	if (!tzMin) tzMin = '00';
	let tzString = `${tzHour}:${tzMin}`;
	let finalString = new Date(oneHourString + tzString).toISOString().slice(0, 16);
	return finalString;
}

export function checkSessionStorage() {
	if (!sessionStorage.getItem('startMs')) {
		sessionStorage.setItem('startMs', new Date().getTime());
	}
	if (!sessionStorage.getItem('endMs')) {
		sessionStorage.setItem('endMs', new Date().getTime() + 1 * 60 * 60 * 1000);
	}

	if (!sessionStorage.getItem('isRunning')) {
		sessionStorage.setItem('isRunning', false);
	}
}
