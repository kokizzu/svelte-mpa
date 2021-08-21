<script lang="ts">
  import Combobox from "@/components/Combobox";
  import Sidebar from "@/components/Sidebar.svelte";
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import FileInput from "attractions/file-input/file-input.svelte";
  import DatePicker from "attractions/date-picker/date-picker.svelte";

  let files = {
    bannerImageUrl: null,
  };

  const values = {
    eventId: "",
    name: "First 30-days Campaign",
    descrHtml: "Lorem ipsum...",
    startedAt: null,
    endedAt: null,
    status: false,
    repeatEvery: "",
    repeatDuration: "",
    bannerImgUrl: "",
    sessionToken: "",
    notes: "",
  };
</script>

<div class="w-full h-full flex">
  <Sidebar />
  <form class="min-h-full p-8 w-full overflow-y-auto" on:submit|preventDefault>
    <h1 class="text-lg font-semibold">Event Detail</h1>
    <div class="flex mt-8 w-full space-x-10">
      <div class="space-y-4 w-1/2">
        <Textbox
          type="text"
          bind:value={values.name}
          label="Event Name"
          placeholder="Name"
        />
        <Textbox
          rows="3"
          textarea
          bind:value={values.descrHtml}
          label="Description"
          placeholder="About the card"
        />
        <Combobox label="Frequency" options={["One time"]} />
        <div class="flex space-x-6">
          <div>
            <p class="font-semibold text-sm">From</p>
            <DatePicker bind:value={values.startedAt} top />
          </div>
          <div>
            <p class="font-semibold text-sm">To</p>
            <DatePicker bind:value={values.endedAt} top />
          </div>
        </div>
        <Toggle bind:value={values.status} label="Status" />
      </div>
      <div class="space-y-4 w-1/2">
        <div>
          <p class="text-sm font-semibold mb-1">Event Banner</p>
          <div class="w-32 h-32 bg-gray-400 rounded" />
          <FileInput bind:value={files.bannerImageUrl} />
        </div>
        <Textbox
          rows="6"
          textarea
          bind:value={values.notes}
          label="Event Rules and Logic"
          placeholder="Notes"
        />
      </div>
    </div>
    <div class="flex mt-4 space-x-2">
      <button
        type="submit"
        class="rounded bg-indigo-500 px-8 py-2 text-sm text-white font-semibold"
      >
        Save
      </button>
      <button
        type="button"
        class="rounded bg-white-500 border px-8 py-2 text-sm font-semibold"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

<style lang="postcss">
  :global(html, body, #app) {
    @apply w-full h-full;
  }
</style>
