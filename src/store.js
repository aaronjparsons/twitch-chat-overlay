import { writable } from 'svelte/store';

export const filterInput = writable('');

export const modalOpen = writable(false);

export const settings = writable({
  channel: '',
  ignoreCommands: true
});