<script lang="ts">
  import Combobox from "@/components/Combobox";
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import Image from "@/components/Image";
  import FileInput from "@/components/FileInput";
  import Button from "@/components/Button";
  import { token } from "@/stores/user";
  import { onMount } from "svelte";
  import { api } from "@/utils/request";

  export let closeCallback: any;

  let files = {
    videoUrl: null,
    rockImgUrl: null,
    paperImgUrl: null,
    scissorImgUrl: null,
  };

  const data = {
    elements: {},
    series: {},
    rarities: {},
  };

  let loading = false;

  onMount(async () => {
    await loadData();
  });

  const originalValues = {
    name: "",
    descrHtml: "",
    price: 0,
    quota: 0,
    stardustId: "",
    sold: 0,
    status: false,
    videoUrl: "",
    rockImgUrl: "",
    paperImgUrl: "",
    scissorImgUrl: "",
    series: "",
    rarity: "",
    element: "",
  };
  let values = { ...originalValues };

  const handleSubmit = async () => {
    try {
      loading = true;
      const res = await api
        .post("SkinUpsert", {
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

  async function loadData() {
    try {
      const [ele, ser, rar]: any[] = await Promise.all([
        api.get("ElementList").json(),
        api.get("PackList").json(),
        api.get("RarityList").json(),
      ]);

      data.elements = ele.elements;
      data.series = ser.packs;
      data.rarities = rar.rarities;
    } catch (e) {
      console.log(e);
    }
  }
</script>

<form
  class="p-6 max-w-[768px] w-full bg-white rounded shadow-lg h-full overflow-y-auto"
  on:submit|preventDefault={handleSubmit}
>
  <h1 class="text-lg font-semibold">Add Skin</h1>
  <div class="grid lg:grid-cols-2 grid-cols-1 mt-8 w-full gap-10">
    <div class="space-y-4">
      <Textbox
        type="text"
        bind:value={values.name}
        label="NFT Card Name"
        placeholder="Name"
      />
      <Textbox
        rows="3"
        textarea
        bind:value={values.descrHtml}
        label="Description"
        placeholder="About the card"
      />
      <div class="flex children:w-1/2 space-x-4">
        <Textbox
          type="number"
          bind:value={values.price}
          label="Price"
          placeholder="In $DIH Value"
        />
        <Textbox
          type="number"
          bind:value={values.quota}
          label="Quota"
          placeholder="1.000"
        />
      </div>
      <Textbox
        type="text"
        bind:value={values.stardustId}
        label="Stardust ItemTypeID"
        placeholder="0000"
      />
      <Textbox type="number" bind:value={values.sold} label="Sold Items" />
      <Toggle bind:value={values.status} label="Status" />
    </div>
    <div class="space-y-4">
      <div class="flex space-x-8">
        <div class="w-36">
          <p class="text-sm font-semibold mb-1">Motion Card</p>
          <Image class="w-full h-32" />
          <FileInput bind:value={files.videoUrl} />
        </div>
        <div class="w-36">
          <p class="text-sm font-semibold mb-1">Rock hand-state</p>
          <Image class="w-full h-32" />
          <FileInput bind:value={files.rockImgUrl} />
        </div>
      </div>
      <div class="flex space-x-8">
        <div class="w-36">
          <p class="text-sm font-semibold mb-1">Scissors hand-state</p>
          <Image class="w-full h-32" />
          <FileInput bind:value={files.scissorImgUrl} />
        </div>
        <div class="w-36">
          <p class="text-sm font-semibold mb-1">Paper hand-state</p>
          <Image class="w-full h-32" />
          <FileInput bind:value={files.paperImgUrl} />
        </div>
      </div>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Combobox
          label="Series"
          options={data.series}
          bind:value={values.series}
        />
        <Combobox
          label="Rarity"
          options={data.rarities}
          bind:value={values.rarity}
        />
        <Combobox
          label="Element"
          options={data.elements}
          bind:value={values.element}
        />
      </div>
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
