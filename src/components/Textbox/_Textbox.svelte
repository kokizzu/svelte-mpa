<script lang="ts">
  import { onMount } from "svelte";

  export let placeholder = "";
  export let value: any = "";
  export let label = "";
  export let textarea = false;
  export let type = "text";

  let el;

  const handleChange = (e: any) => {
    if (type == "number") {
      value = +e.target.value;
    } else {
      value = e.target.value;
    }
  };

  onMount(() => {
    if (el) {
      el.type = type;
    }
  });
</script>

<label for={null} class="textbox">
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
      bind:this={el}
      {placeholder}
      bind:value
      on:change={handleChange}
      on:input={handleChange}
      {...$$restProps}
      class="textbox-input"
    />
  {/if}
</label>

<style windi:global windi:preflights windi:safelist>
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
