<script lang="ts">
  import { getToken } from "@/stores/user";

  import { fetchApi } from "@/utils/request";

  import { createEventDispatcher } from "svelte";

  export let uploadUrl: string;
  export let url = null;
  export let resPath = "skinUpload";

  let file = null;
  let loading = false;

  const dispatch = createEventDispatcher();

  const handleChange = async (e: any) => {
    try {
      loading = true;
      const files = e.target.files;
      file = files && files[0];
      if (file) {
        dispatch("change", { file });
        const res = (await uploader(file, {})) as any;
        url = res[resPath].filePath;
      }
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  };

  const uploader = (file: any, params: any) => {
    return new Promise(async (resolv, reject) => {
      const data = new FormData();
      data.append("fileBinary", file);

      const qs = new URLSearchParams(params);
      qs.append("sessionToken", getToken());

      await fetchApi("POST", `${uploadUrl}?${qs}`, data, resolv, reject);
    });
  };
</script>

<div class="relative w-full">
  {#if loading}
    <div
      class="border bg-white rounded px-4 py-2 text-center text-sm font-semibold inline-block w-full cursor-wait"
    >
      Uploading...
    </div>
  {:else}
    <label class="file-btn">
      <input type="file" class="hidden" on:change={handleChange} />
      Upload
    </label>
  {/if}
</div>

<style lang="postcss">
  .file-btn {
    @apply px-4 py-2 border border-indigo-500 bg-white rounded text-center;
    @apply font-semibold text-sm text-indigo-500 inline-block w-full cursor-pointer;
  }
</style>
