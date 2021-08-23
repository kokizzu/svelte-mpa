<script lang="ts">
  import { skinGet, skinUpsert } from "@/api/skin";
  import Button from "@/components/Button";
  import Login from "@/components/Login.svelte";
  import Sidebar from "@/components/Sidebar.svelte";
  import { token } from "@/stores/user";
  import { endpoint } from "@/utils/request";
  import { btn, del, raw } from "@/utils/vdom";
  import Modal from "attractions/modal/modal.svelte";
  import Grid from "gridjs-svelte";
  import { onMount } from "svelte";
  import SkinDialog from "./SkinDialog.svelte";
  import { elements, loadData, rarities, series } from "./store";

  let showDialog = false;
  let selectedId = null;

  let gridInstance;

  onMount(async () => {
    await loadData();
  });

  const editSkin = function (id: any) {
    selectedId = id;
    showDialog = true;
  };

  const deleteSkin = async function (id: any) {
    try {
      const detail = (await skinGet(id)) as any;
      const res = await skinUpsert({
        ...detail.skin,
        doDelete: true,
        skinId: id,
      });
      rerenderGrid();
    } catch (e) {
      console.log(e);
    }
  };

  const restoreSkin = async function (id: any) {
    try {
      const detail = (await skinGet(id)) as any;
      const res = await skinUpsert({
        ...detail.skin,
        doRestore: true,
        skinId: id,
      });
      rerenderGrid();
    } catch (e) {
      console.log(e);
    }
  };

  function rerenderGrid() {
    gridInstance.forceRender();
  }

  const transformData = (skins: any) => {
    return skins.map((skin) => {
      const deleted = skin.isDeleted;
      return [
        [
          btn({
            text: "Edit",
            onClick: () => editSkin(skin.id),
            className: "text-indigo-500 mr-2",
          }),
          !deleted
            ? btn({
                text: "Delete",
                onClick: () => deleteSkin(skin.id),
                className: "text-red-500",
              })
            : btn({
                text: "Restore",
                onClick: () => restoreSkin(skin.id),
                className: "text-green-500",
              }),
        ],
        skin.id,
        !deleted ? skin.name : del(skin.name),
        raw(skin.descrHtml),
        skin.price,
        skin.quota,
        $elements[skin.element] || skin.element,
        $rarities[skin.rarity] || skin.rarity,
        $series[skin.series] || skin.series,
      ];
    });
  };
</script>

<div class="w-full h-full flex">
  <Sidebar />
  <div class="min-h-full p-8 w-full overflow-y-auto">
    <Button on:click={() => (showDialog = true)} class="mb-2">Add Skin</Button>
    <Grid
      bind:instance={gridInstance}
      columns={[
        "Action",
        {
          name: "id",
          hidden: true,
        },
        "Name",
        {
          name: "Description",
        },
        "Price",
        "Quota",
        "Element",
        "Rarity",
        "Series",
      ]}
      pagination={{
        enabled: true,
        limit: 10,
        server: {
          url: (prev, page, limit) =>
            `${prev}?limit=${limit}&offset=${page * limit}`,
        },
      }}
      server={{
        url: `${endpoint}/SkinList`,
        then: (data) => transformData(data.skins),
        total: (data) => data.total,
      }}
    />
  </div>
</div>

<Modal bind:open={showDialog} let:closeCallback class="py-8 px-4" noClickaway>
  {#if showDialog}
    <SkinDialog {closeCallback} bind:id={selectedId} onSave={rerenderGrid} />
  {/if}
</Modal>

{#if !$token}
  <Login />
{/if}

<style lang="postcss">
  :global(html, body, #app) {
    @apply w-full h-full;
  }
</style>
