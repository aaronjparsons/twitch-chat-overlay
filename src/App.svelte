<script>
  import { slide } from 'svelte/transition';
  import Tailwindcss from './Tailwindcss.svelte';
  import MessageCard from './components/MessageCard.svelte'

  const buttons = [
    {
      text: 'All'
    },
    {
      text: 'M'
    },
    {
      text: 'N'
    },
    {
      text: 'R'
    }
  ]

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
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 mr-5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Filter by content. Eg: Hey|Hello">
    {#each buttons as button}
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {button.text}
      </button>
    {/each}
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