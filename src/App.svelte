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

<main>
  <button on:click="{addMessage}">Add Message</button>
  {#each messages as message, index (message)}
    <div transition:slide>
      <MessageCard message="{message}" />
    </div>
  {/each}
</main>
<Tailwindcss />
