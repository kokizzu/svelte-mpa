<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value = null;

  const dispatch = createEventDispatcher();

  const handleChange = (e: any) => {
    const files = e.target.files;
    const file = files && files[0];
    if (file) {
      value = file;
      dispatch("change", { file });
    }
  };
</script>

<div class="relative w-full">
  <label class="file-input">
    <input type="file" class="hidden" on:change={handleChange} />
    Upload
  </label>
</div>

<style lang="postcss">
  .file-input {
    @apply px-4 py-2 border border-indigo-500 bg-white rounded text-center;
    @apply font-semibold text-sm text-indigo-500 inline-block w-full cursor-pointer;
  }

  .file-input:not(:disabled):hover {
    @apply bg-gray-100;
  }
</style>
