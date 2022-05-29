<script lang="ts">
  import Select from "svelte-select";

  export let options: any;
  export let value: any = "";
  export let label = "";

  $: items = Object.entries(options).map((v) => ({ value: v[0], label: v[1] }));
</script>

<label for={null} class="combobox">
  {#if label}
    <span class="combobox-label">{label}</span>
  {/if}
  <Select
    on:select
    {items}
    bind:value
    inputAttributes={{
      class: "focus:(ring-0)",
    }}
    {...$$restProps}
  />
</label>

<style windi:preflights windi:safelist>
  .combobox {
    --border: theme("colors.gray.500") 1px solid;
    --borderHoverColor: theme("colors.gray.500");
    --borderFocusColor: theme("colors.indigo.500");
    --itemHoverBG: theme("colors.indigo.200");
    --itemIsActiveBG: theme("colors.indigo.500");
    --placeholderColor: theme("colors.gray.600");

    @apply block w-full;
  }

  .combobox-label {
    @apply font-semibold text-sm block mb-1;
  }
</style>
