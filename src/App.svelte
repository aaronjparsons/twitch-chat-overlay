<script>
  import { slide } from 'svelte/transition';
  import Tailwindcss from './Tailwindcss.svelte';
  import MessageCard from './components/MessageCard.svelte'

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

  function addMessage() {
    messages = [{ user: `User ${messages.length + 1}`, content: 'Another message' }, ...messages];
  }
</script>

<main class="flex flex-col p-5 bg-gray-300">
  <div class="flex flex-row mb-5">
    <!-- Controls -->
    <input type="text" class="flex-auto mr-5" />
    <button>All</button>
    <button>M</button>
    <button>!</button>
    <button>R</button>
  </div>
  <div class="message-list flex-auto rounded p-2 bg-gray-200 shadow-inner">
    <!-- Message List -->
    <button on:click="{addMessage}">Add Message</button>
    {#each messages as message, index (message)}
      <div transition:slide>
        <MessageCard message="{message}" />
      </div>
    {/each}
  </div>
</main>
<Tailwindcss />

<style>
  :global(body) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  main {
    height: 100vh;
    overflow-y: hidden;
  }

  .message-list {
    overflow-y: auto;
  }
</style>