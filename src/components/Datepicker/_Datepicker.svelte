<script lang="ts">
  import DatePicker from "attractions/date-picker/date-picker.svelte";

  export let value = null;

  let _value = null;

  const handleChange = (e: any) => {
    value = e.detail.value.getTime();
    console.log(value);
  };
</script>

<DatePicker
  bind:value={_value}
  top
  format="%Y-%m-%d"
  on:change={handleChange}
/>
