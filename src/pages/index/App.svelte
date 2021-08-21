<script lang="ts">
  import Combobox from "@/components/Combobox";
  import Sidebar from "@/components/Sidebar.svelte";
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import FileInput from "attractions/file-input/file-input.svelte";

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
    {JSON.stringify(values, null, 2)}
    <div class="flex mt-8 w-full space-x-10">
      <div class="space-y-4 w-1/2">
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
      <div class="space-y-4 w-1/2">
        <div class="flex space-x-8">
          <div>
            <p class="text-sm font-semibold mb-1">Motion Card</p>
            <div class="w-32 h-32 bg-gray-400 rounded" />
            <FileInput bind:value={files.videoUrl} />
          </div>
          <div>
            <p class="text-sm font-semibold mb-1">Rock hand-state</p>
            <div class="w-32 h-32 bg-gray-400 rounded" />
            <FileInput bind:value={files.rockImgUrl} />
          </div>
        </div>
        <div class="flex space-x-8">
          <div>
            <p class="text-sm font-semibold mb-1">Scissors hand-state</p>
            <div class="w-32 h-32 bg-gray-400 rounded" />
            <FileInput bind:value={files.scissorImgUrl} />
          </div>
          <div>
            <p class="text-sm font-semibold mb-1">Paper hand-state</p>
            <div class="w-32 h-32 bg-gray-400 rounded" />
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
