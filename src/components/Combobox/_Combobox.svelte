<script lang="ts">
  import Select from "svelte-select";

  export let options: string[];
  export let value = "";
  export let label = "";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="combobox">
  {#if label}
    <span class="combobox-label">{label}</span>
  {/if}
  <Select on:select items={options} {value} {...$$restProps} />
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
