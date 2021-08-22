<script lang="ts">
  export let value = null;

  let files: FileList;

  $: value = files && files[0];
</script>

<div class="relative w-full">
  <label class="file-input">
    <input type="file" class="hidden" bind:files />
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
