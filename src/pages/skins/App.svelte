<script lang="ts">
  import { skinUpsert } from "@/api/skin";
  import Button from "@/components/Button";
  import Login from "@/components/Login.svelte";
  import Sidebar from "@/components/Sidebar.svelte";
  import { token } from "@/stores/user";
  import { endpoint } from "@/utils/request";
  import Modal from "attractions/modal/modal.svelte";
  import { h } from "gridjs";
  import Grid from "gridjs-svelte";
  import SkinDialog from "./Dialog/SkinDialog.svelte";

  let showDialog = false;
  let selectedId = null;

  let gridInstance;

  const editSkin = function (id: any) {
    selectedId = id;
    showDialog = true;
  };

  const deleteSkin = async function (id: any) {
    try {
      const res = await skinUpsert({ doDelete: true, skinId: id });
      console.log(res);
      rerenderGrid();
    } catch (e) {
      console.log(e);
    }
  };

  function rerenderGrid() {
    gridInstance.forceRender();
  }

  const transformData = (skins: any) => {
    const filtered = skins.filter((skin) => {
      if (skin.isDeleted) {
        return !skin.isDeleted;
      }
      return true;
    });
    console.log(skins);

    return filtered.map((skin) => {
      return [
        null,
        skin.id,
        skin.name,
        skin.descrHtml,
        skin.price,
        skin.quota,
        skin.element,
        skin.rarity,
        skin.series,
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
        {
          name: "Action",
          formatter: (_cell, row) => {
            const skinId = row.cells[1].data;
            return [
              h(
                "button",
                { onClick: () => editSkin(JSON.stringify(skinId)) },
                "edit"
              ),
              h("button", { onClick: () => deleteSkin(skinId) }, "delete"),
            ];
          },
        },
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
    <SkinDialog {closeCallback} id={selectedId} onSave={rerenderGrid} />
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
