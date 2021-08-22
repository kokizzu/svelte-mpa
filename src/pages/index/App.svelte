<script lang="ts">
  import Combobox from "@/components/Combobox";
  import Sidebar from "@/components/Sidebar.svelte";
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import Image from "@/components/Image";
  import FileInput from "@/components/FileInput";
  import Button from "@/components/Button";

  let files = {
    videoUrl: null,
    rockImgUrl: null,
    paperImgUrl: null,
    scissorImgUrl: null,
  };

  const elementOptions = {
    machine: "Machine",
    nature: "Nature",
    pyro: "Pyro",
    water: "Water",
  };

  const raritiesOptions = {
    C: "Common",
    R: "Rare",
    SR: "Super Rare",
    UR: "Ultra Rare",
  };

  const seriesOptions = {
    futuristic: "Futuristic",
    monster: "Monster",
    mythical: "Mythical",
    jobs: "Jobs",
    popupArt: "Pop-up Art",
    animal: "Animal",
  };

  const values = {
    name: "",
    descrHtml: "",
    price: "",
    quota: "",
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
</script>

<div class="w-full h-full flex">
  <Sidebar />
  <form class="min-h-full p-8 w-full overflow-y-auto" on:submit|preventDefault>
    <h1 class="text-lg font-semibold">NFT Card Detail</h1>
    <pre>
      {JSON.stringify(values, null, 2)}
    </pre>
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
            type="text"
            bind:value={values.price}
            label="Price"
            placeholder="In $DIH Value"
          />
          <Textbox
            type="text"
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
        <div class="flex space-x-4">
          <Combobox
            label="Series"
            options={seriesOptions}
            bind:value={values.series}
          />
          <Combobox
            label="Rarity"
            options={raritiesOptions}
            bind:value={values.rarity}
          />
          <Combobox
            label="Element"
            options={elementOptions}
            bind:value={values.element}
          />
        </div>
      </div>
    </div>
    <div class="flex mt-4 space-x-2">
      <Button type="submit">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  </form>
</div>

<style lang="postcss">
  :global(html, body, #app) {
    @apply w-full h-full;
  }
</style>
