<script lang="ts">
  import Select from "svelte-select";

  export let options: any;
  export let value = "";
  export let label = "";

  function handleSelect(event: any) {
    value = event.detail.value;
  }

  $: items = Object.entries(options).map((v) => ({ value: v[0], label: v[1] }));
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="combobox">
  {#if label}
    <span class="combobox-label">{label}</span>
  {/if}
  <Select
    on:select
    {items}
    bind:value
    on:select={handleSelect}
    {...$$restProps}
  />
</label>

<style lang="postcss">
  .combobox {
    --border: theme("colors.gray.500") 1px solid;

    @apply block w-full;
  }

  .combobox-label {
    @apply font-semibold text-sm block mb-1;
  }
</style>
