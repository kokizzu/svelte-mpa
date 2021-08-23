<script lang="ts">
  import Combobox from "@/components/Combobox";
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import Image from "@/components/Image";
  import FileInput from "@/components/FileInput";
  import Button from "@/components/Button";
  import { elements, rarities, series } from "./store";
  import { skinGet, skinUpsert } from "@/api/skin";
  import Video from "@/components/Video/_Video.svelte";

  export let closeCallback: () => void;
  export let id = null;
  export let onSave = () => void 0;

  $: editMode = !!id;

  let loading = false;

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
  };

  const close = () => {
    id = null;
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
      values.videoUrl = setFiles(skin.videoUrl);
      values.rockImgUrl = setFiles(skin.rockImgUrl);
      values.scissorImgUrl = setFiles(skin.scissorImgUrl);
      values.paperImgUrl = setFiles(skin.paperImgUrl);
    } catch {}
  };

  const setFiles = (file) => {
    return file ? file : null;
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
            <Video class="w-full h-32" src={values.videoUrl} />
            <FileInput bind:url={values.videoUrl} uploadUrl="SkinUpload" />
          </div>
          <div class="w-36">
            <p class="text-sm font-semibold mb-1">Rock hand-state</p>
            <Image class="w-full h-32" src={values.rockImgUrl} />
            <FileInput bind:url={values.rockImgUrl} uploadUrl="SkinUpload" />
          </div>
        </div>
        <div class="flex space-x-8">
          <div class="w-36">
            <p class="text-sm font-semibold mb-1">Scissors hand-state</p>
            <Image class="w-full h-32" src={values.scissorImgUrl} />
            <FileInput bind:url={values.scissorImgUrl} uploadUrl="SkinUpload" />
          </div>
          <div class="w-36">
            <p class="text-sm font-semibold mb-1">Paper hand-state</p>
            <Image class="w-full h-32" src={values.paperImgUrl} />
            <FileInput bind:url={values.paperImgUrl} uploadUrl="SkinUpload" />
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
