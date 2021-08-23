<script lang="ts">
  export let href: string = null;
  export let type: "submit" | "button" = "button";
  let className = "";
  export { className as class };
  export let block = false;
  export let variant = "primary";

  const variants = {
    primary:
      "bg-indigo-500 text-white border-transparent not-disabled:hover:bg-indigo-600",
    secondary: "bg-white text-gray-700 not-disabled:hover:bg-gray-100",
  };
</script>

{#if href}
  <a
    {href}
    on:click
    class="btn {variants[variant]} {className}"
    class:w-full={block}
    {...$$restProps}
  >
    <slot />
  </a>
{:else}
  <button
    on:click
    {type}
    class="btn {variants[variant]} {className}"
    class:w-full={block}
    {...$$restProps}
  >
    <slot />
  </button>
{/if}

<style lang="postcss">
  .btn {
    @apply inline-flex justify-center items-center py-2 px-4;
    @apply border text-sm font-medium rounded;
  }

  .btn:focus {
    @apply outline-none;
  }

  .btn:disabled {
    @apply bg-opacity-40 cursor-not-allowed;
  }
</style>
