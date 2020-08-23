<script>
  import tmi from 'tmi.js';
  import { slide } from 'svelte/transition';
  import { modalOpen, settings } from './store.js';
  import Tailwindcss from './Tailwindcss.svelte';
  import MessageCard from './components/MessageCard.svelte'
  import Modal from './components/Modal.svelte'

  let filterInput = '';
  let activeButtonIndex = 0;
  const buttons = ['All', 'fa-heart', 'fa-star', 'fa-at'];

  let messages = [];
  let subscriptions = [];

  const client = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [$settings.channel]
  });

  client.connect();

  // Chat
  client.on('chat', (channel, userstate, message, self) => {
    addToMessages(userstate['display-name'], message, 'chat');
  });

  // Whisper
  client.on('whisper', (channel, userstate, message, self) => {
    console.log('whisper', userstate);
    addToMessages(userstate['display-name'], message, 'whisper');
  });

  // Subscription
  client.on("subscription", (channel, username, method, message, userstate) => {
    // Do your stuff.
    console.log('SUBSCRIPTION: ', username, method, message, userstate);
    addToMessages(userstate['display-name'], userstate['system-msg'], 'sub', message);
    addToSubscriptions(userstate['display-name'], userstate['system-msg'], 'resub', message);
  });

  client.on("resub", (channel, username, months, message, userstate, methods) => {
    // Do your stuff.
    console.log('RESUB: ', username, months, message, userstate, methods);
    addToMessages(userstate['display-name'], userstate['system-msg'], 'resub', message);
    addToSubscriptions(userstate['display-name'], userstate['system-msg'], 'resub', message);
  });

  $: displayedMessages = messages.filter(message => {
    if ($settings.ignoreCommands && message.content.charAt(0) === '!') {
      return false;
    }

    if (filterInput.length) {
      const regex = new RegExp(filterInput, 'gi');
      return regex.test(message.content);
    }

    return true;
  });

  function addToMessages(user, content, type, userMsg = null) {
    messages = [
      {
        user,
        content,
        userMsg,
        type
      },
      ...messages
    ].slice(0, 50);
  }

  function addToSubscriptions(user, content, type, userMsg = null) {
    subscriptions = [
      {
        user,
        content,
        userMsg,
        type
      },
      ...subscriptions
    ].slice(0, 50);
  }

  function triggerButton(index) {
    activeButtonIndex = index;
  }

  function clearMessages() {
    messages = [];
  }

  function openModal() {
    $modalOpen = true;
  }
</script>

<main class="flex flex-col h-full overflow-y-hidden p-5 bg-gray-300">
  <div class="flex flex-row mb-5">
      <!-- Controls -->
    <input bind:value={filterInput} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mr-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Filter by content. Eg: Hey|Hello">
    {#each buttons as button, i}
      <button on:click={() => triggerButton(i)} class="{activeButtonIndex === i ? 'active' : ''} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {#if i !== 0}
          <i class="fas {button}"></i>
        {:else}
          {button}
        {/if}
      </button>
    {/each}
    <button on:click={openModal} class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"><i class="fas fa-cog"></i></button>
  </div>
  <div class="flex-auto rounded p-2 bg-gray-200 shadow-inner overflow-y-auto">
    <!-- Message List -->
    <button on:click="{clearMessages}">Clear Messages</button>
    {#each displayedMessages as message, index (message)}
      <div transition:slide>
        <MessageCard message="{message}" />
      </div>
    {/each}
  </div>
</main>
<Modal />
<Tailwindcss />

<style>
  :global(body) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .active {
    @apply bg-blue-700;
  }
</style>