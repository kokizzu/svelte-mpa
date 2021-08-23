<script lang="ts">
  import Combobox from "@/components/Combobox";
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import Image from "@/components/Image";
  import FileInput from "@/components/FileInput";
  import Button from "@/components/Button";
  import { onMount } from "svelte";
  import { elements, loadData, rarities, series } from "./store";
  import { skinGet, skinUpload, skinUpsert } from "@/api/skin";
  import Video from "@/components/Video/_Video.svelte";

  export let closeCallback: () => void;
  export let id = null;
  export let onSave = () => void 0;

  $: editMode = !!id;

  let files = {
    videoUrl: null,
    rockImgUrl: null,
    paperImgUrl: null,
    scissorImgUrl: null,
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
      const data: any = { ...values };
      data.element = data.element.value;
      data.series = data.series.value;
      data.rarity = data.rarity.value;
      const res = await skinUpsert(data);
      onSave();
      close();
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  };

  const clear = () => {
    values = { ...originalValues };
    files = {
      videoUrl: null,
      rockImgUrl: null,
      paperImgUrl: null,
      scissorImgUrl: null,
    };
  };

  const close = () => {
    clear();
    closeCallback();
  };

  const getSkinDetail = async () => {
    if (!editMode) return;
    try {
      const res = (await skinGet(id)) as any;
      const skin = res.skin;
      Object.entries(skin).forEach((v) => {
        values[v[0]] = v[1];
      });
      values["skinId"] = skin.id;
      files.videoUrl = setFiles(skin.videoUrl);
      files.rockImgUrl = setFiles(skin.rockImgUrl);
      files.scissorImgUrl = setFiles(skin.scissorImgUrl);
      files.paperImgUrl = setFiles(skin.paperImgUrl);
      console.log(values);
    } catch {}
  };

  const setFiles = (file) => {
    if (file) {
      return `https://diamondhandsapi.candlestick.com/${file}`;
    }
    return null;
  };

  const uploadFile = async (e: any, field: any) => {
    try {
      const res = (await skinUpload(e.detail.file)) as any;
      const filePath = res.skinUpload.filePath;
      values[field] = filePath;
      files[field] = `https://diamondhandsapi.candlestick.com/${filePath}`;
    } catch {}
  };
</script>

<form
  class="p-6 max-w-[768px] w-full bg-white rounded shadow-lg h-full overflow-y-auto"
  on:submit|preventDefault={handleSubmit}
>
  {#await getSkinDetail()}
    loading...
  {:then _}
    <h1 class="text-lg font-semibold">{editMode ? "Edit" : "Add"} Skin</h1>
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
            <Video class="w-full h-32" src={files.videoUrl} />
            <FileInput on:change={(e) => uploadFile(e, "videoUrl")} />
          </div>
          <div class="w-36">
            <p class="text-sm font-semibold mb-1">Rock hand-state</p>
            <Image class="w-full h-32" src={files.rockImgUrl} />
            <FileInput on:change={(e) => uploadFile(e, "rockImgUrl")} />
          </div>
        </div>
        <div class="flex space-x-8">
          <div class="w-36">
            <p class="text-sm font-semibold mb-1">Scissors hand-state</p>
            <Image class="w-full h-32" src={files.scissorImgUrl} />
            <FileInput on:change={(e) => uploadFile(e, "scissorImgUrl")} />
          </div>
          <div class="w-36">
            <p class="text-sm font-semibold mb-1">Paper hand-state</p>
            <Image class="w-full h-32" src={files.paperImgUrl} />
            <FileInput on:change={(e) => uploadFile(e, "paperImgUrl")} />
          </div>
        </div>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Combobox
            label="Series"
            options={$series}
            bind:value={values.series}
          />
          <Combobox
            label="Rarity"
            options={$rarities}
            bind:value={values.rarity}
          />
          <Combobox
            label="Element"
            options={$elements}
            bind:value={values.element}
          />
        </div>
      </div>
    </div>
    <div class="flex mt-4 space-x-2">
      <Button type="submit" disabled={loading}>Save</Button>
      <Button variant="secondary" on:click={close}>Cancel</Button>
    </div>
  {/await}
</form>
