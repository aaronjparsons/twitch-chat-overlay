<script>
  import { onMount } from 'svelte';
  import { settings, modalOpen } from '../store.js'

  let settingsCopy;
  let channel;
  let ignoreCommands;

  const unsubscribe = settings.subscribe(value => {
    settingsCopy = value
  });

  $: watchModalOpen($modalOpen);

  function watchModalOpen(bool) {
    if (bool) {
      channel = settingsCopy.channel;
      ignoreCommands = settingsCopy.ignoreCommands;
    }
  }

  function saveSettings() {
    const newSettings = { channel, ignoreCommands };
    window.localStorage.setItem('settings', JSON.stringify(newSettings));
    settings.update(value => value = newSettings);
    $modalOpen = false;
  }

  function closeModal() {
    $modalOpen = false;
  }
</script>

{#if $modalOpen}
  <div class="absolute top-0 left-0 w-full h-full z-50">
    <div class="flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75">
      <div class="modal rounded-md bg-white">
        <div class="flex justify-between p-4 border-b-2 border-gray-600">
          <h2>Settings</h2>
          <button on:click="{closeModal}" class="border-none">
            <i class="fas fa-times text-lg px-2"></i>
          </button>
        </div>
        <form on:submit|preventDefault={saveSettings} class="flex flex-col p-4">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="channel-name">
            Twitch Channel Name
          </label>
          <input bind:value={channel} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="channel-name" type="text">
          <label class="inline-flex items-center mt-3">
            <input bind:checked={ignoreCommands} type="checkbox" class="form-checkbox h-5 w-5 text-gray-600">
            <span class="ml-2 text-gray-700">Ignore Commands</span>
          </label>
          <p class="text-xs italic ml-4 text-gray-600">* Ignore all messages beginning with "!"</p>
          <div class="flex justify-end">
            <button on:click="" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
        </form>
        {JSON.stringify(settingsCopy)}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    width: 400px;
  }
</style>