import { writable } from 'svelte/store';

export const modalOpen = writable(false);

export const settings = writable(
  JSON.parse(window.localStorage.getItem('settings')) ||
  {
    channel: '',
    ignoreCommands: true
  }
);