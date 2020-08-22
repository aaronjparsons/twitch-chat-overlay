<script>
  import { slide } from 'svelte/transition';
  import { filterInput, modalOpen } from './store.js';
  import Tailwindcss from './Tailwindcss.svelte';
  import MessageCard from './components/MessageCard.svelte'
  import Modal from './components/Modal.svelte'

  let activeButtonIndex = 0;
  const buttons = [
    {
      text: 'All',
      color: 'bg-blue-500 hover:bg-blue-700',
      action: () => {}
    },
    {
      icon: 'fa-heart',
      color: 'bg-blue-500 hover:bg-blue-700',
      action: () => {}
    },
    {
      icon: 'fa-star',
      color: 'bg-blue-500 hover:bg-blue-700',
      action: () => {}
    },
    {
      icon: 'fa-at',
      color: 'bg-blue-500 hover:bg-blue-700',
      action: () => {}
    },
    {
      icon: 'fa-cog',
      color: 'bg-gray-700 hover:bg-gray-800',
      action: openModal
    }
  ];

  let messages = [
    {
      user: 'User 1',
      content: 'Hey there!'
    },
    {
      user: 'Carlton',
      content: 'Do the dance!'
    }
  ];

  function triggerButton(index) {
    if (index !== buttons.length - 1) {
      activeButtonIndex = index;
    }
    buttons[index].action();
  }

  function addMessage() {
    messages = [{ user: `User ${messages.length + 1}`, content: 'Another message' }, ...messages];
  }

  function openModal() {
    $modalOpen = true;
  }
</script>

<main class="flex flex-col h-full overflow-y-hidden p-5 bg-gray-300">
  <div class="flex flex-row mb-5">
    <!-- Controls -->
    <input bind:value={$filterInput} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mr-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Filter by content. Eg: Hey|Hello">
    {#each buttons as button, i}
      <button on:click="{() => triggerButton(i)}" class="{activeButtonIndex === i ? 'active' : ''} {button.color} text-white font-bold py-2 px-4 rounded">
        {#if button.icon}
          <i class="fas {button.icon}"></i>
        {:else}
          {button.text}
        {/if}
      </button>
    {/each}
  </div>
  <div class="flex-auto rounded p-2 bg-gray-200 shadow-inner overflow-y-auto">
    <!-- Message List -->
    <button on:click="{addMessage}">Add Message</button>
    {#each messages as message, index (message)}
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