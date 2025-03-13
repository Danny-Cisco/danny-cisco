import { writable } from 'svelte/store';

export const startMs = writable(0);
export const nowMs = writable(0);
export const endMs = writable(0);

export const durationMs = writable(5000);

export const isRunning = writable(false);
export const alarmIsRinging = writable(false);
export const durationMode = writable(false);
