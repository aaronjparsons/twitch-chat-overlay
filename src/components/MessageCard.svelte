<script>
  export let message;

  const typeStyles = {
    chat: 'bg-gray-300',
    whisper: 'bg-gray-600',
    sub: 'bg-blue-300',
    resub: 'bg-purple-300',
  }

  const hasCustomMessage =
    (message.type === 'sub' || message.type === 'resub') &&
    message.userMsg &&
    message.userMsg.length;
</script>

<div class="{typeStyles[message.type]} rounded-md shadow-md p-4 m-4">
  <p>{message.user}</p>
  <p>{message.content}</p>
  {#if hasCustomMessage}
    <div class="shadow-md m-4 p-4">
      <p>{message.userMsg}</p>
    </div>
  {/if}
</div>