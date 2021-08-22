<script>
  import { fade } from "svelte/transition";

  export let src = null;
  export let alt = null;
  let className = "";
  export { className as class };

  let loaded = false;
  let thisImage;

  $: if (thisImage) {
    thisImage.onload = () => {
      loaded = true;
    };
  }
</script>

{#if src}
  <img {src} {alt} transition:fade class={className} bind:this={thisImage} />
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
        fill-rule="evenodd"
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
{/if}

<style lang="postcss">
  .no-image {
    @apply bg-gray-300 grid place-items-center text-gray-600;
  }
</style>
