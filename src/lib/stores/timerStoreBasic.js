import { writable } from 'svelte/store';

export const startMs = writable(0);
export const nowMs = writable(0);
export const endMs = writable(0);
