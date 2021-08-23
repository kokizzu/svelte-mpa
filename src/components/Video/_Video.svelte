<script>
  import { fade } from "svelte/transition";

  export let src = null;
  let className = "";
  export { className as class };

  let loaded = false;
  let el;

  $: if (el) {
    el.onload = () => {
      loaded = true;
    };
  }
</script>

{#if src}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video controls {src} transition:fade class={className} bind:this={el}>
    Your browser does not support the video tag.
  </video>
{:else}
  <div class="no-image {className}">
    <!-- icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-10 w-10"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
      />
    </svg>
  </div>
{/if}

<style lang="postcss">
  .no-image {
    @apply bg-gray-300 grid place-items-center text-gray-600;
  }
</style>
