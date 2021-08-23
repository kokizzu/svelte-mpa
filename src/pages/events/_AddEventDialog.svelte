<script lang="ts">
  import Combobox from "@/components/Combobox";
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import Datepicker from "@/components/Datepicker";
  import Button from "@/components/Button";
  import Image from "@/components/Image";
  import FileInput from "@/components/FileInput";
  import { token } from "@/stores/user";
  import { api } from "@/utils/request";

  export let closeCallback: any;

  let files = {
    bannerImageUrl: null,
  };

  const originalValues = {
    name: "",
    descrHtml: "",
    startedAt: null,
    endedAt: null,
    status: false,
    repeatEvery: 0,
    repeatDuration: 0,
    bannerImgUrl: "",
    notes: "",
  };

  let values = {
    ...originalValues,
  };

  let loading = false;

  const handleSubmit = async () => {
    try {
      loading = true;
      const res = await api
        .post("EventUpsert", {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, sessionToken: $token }),
        })
        .json();
      clear();
      closeCallback();
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  };

  const clear = () => {
    values = { ...originalValues };
  };
</script>

<form
  class="p-6 max-w-[768px] w-full bg-white rounded shadow-lg h-full overflow-y-auto"
  on:submit|preventDefault={handleSubmit}
>
  <h1 class="text-lg font-semibold">Event Detail</h1>
  <div class="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
    <div class="space-y-4">
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
      <Combobox label="Frequency" options={{ onetime: "One time" }} />
      <div class="flex space-x-6">
        <div>
          <p class="font-semibold text-sm">From</p>
          <Datepicker bind:value={values.startedAt} />
        </div>
        <div>
          <p class="font-semibold text-sm">To</p>
          <Datepicker bind:value={values.endedAt} />
        </div>
      </div>
      <Toggle bind:value={values.status} label="Status" />
    </div>
    <div class="space-y-4">
      <div class="w-36">
        <p class="text-sm font-semibold mb-1">Event Banner</p>
        <Image class="w-full h-32" />
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
    <Button type="submit" disabled={loading}>Save</Button>
    <Button
      variant="secondary"
      on:click={() => {
        clear();
        closeCallback();
      }}>Cancel</Button
    >
  </div>
</form>
