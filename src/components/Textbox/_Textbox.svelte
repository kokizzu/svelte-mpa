<script lang="ts">
  export let placeholder = "";
  export let value: any = "";
  export let label = "";
  export let textarea = false;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="textbox">
  {#if label}
    <span class="textbox-label">{label}</span>
  {/if}
  {#if textarea}
    <textarea
      {placeholder}
      bind:value
      on:change
      on:input
      {...$$restProps}
      class="textbox-input px-3 py-2"
    />
  {:else}
    <input
      {placeholder}
      bind:value
      on:change
      on:input
      {...$$restProps}
      class="textbox-input"
    />
  {/if}
</label>

<style lang="postcss">
  .textbox {
    @apply block w-full;
  }

  .textbox-label {
    @apply font-semibold text-sm block mb-1;
  }

  .textbox-input {
    @apply w-full rounded;
  }

  .textbox-input:focus {
    @apply border-indigo-500;
  }
</style>
