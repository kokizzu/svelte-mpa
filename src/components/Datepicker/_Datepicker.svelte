<script lang="ts">
  import DatePicker from "attractions/date-picker/date-picker.svelte";
  import { onMount } from "svelte";

  export let value = null;

  let _value = null;

  onMount(() => {
    if (value) {
      _value = new Date(value);
    }
  });

  const handleChange = (e: any) => {
    value = e.detail.value.getTime();
  };
</script>

<DatePicker
  bind:value={_value}
  top
  format="%Y-%m-%d"
  on:change={handleChange}
/>
