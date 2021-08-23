<script lang="ts">
  import Button from "@/components/Button";
  import Login from "@/components/Login.svelte";
  import Sidebar from "@/components/Sidebar.svelte";
  import { token } from "@/stores/user";
  import { html } from "gridjs";
  import Grid from "gridjs-svelte";
  import Modal from "attractions/modal/modal.svelte";
  import AddEventDialog from "./_AddEventDialog.svelte";

  let showAddDialog = false;
</script>

<div class="w-full h-full flex">
  <Sidebar />
  <div class="min-h-full p-8 w-full overflow-y-auto">
    <Button class="mb-2" on:click={() => (showAddDialog = true)}>
      Add Event
    </Button>
    <Grid
      columns={[
        {
          name: "Action",
          formatter: (cell) =>
            html(`<a href="/ed" class="underline text-blue-500">Edit</b>`),
        },
        {
          name: "id",
          hidden: true,
        },
        "Name",
        "Description",
        "Created At",
      ]}
      server={{
        url: "http://localhost:8080/https://diamondhandsapi.candlestick.com/api/EventList?limit=10",
        then: (data) =>
          data.events.map((event) => {
            return [
              null,
              event.id,
              event.name,
              event.descrHtml,
              event.createdAt,
            ];
          }),
      }}
    />
  </div>
</div>

<Modal
  bind:open={showAddDialog}
  let:closeCallback
  class="py-8 px-4"
  noClickaway
>
  <AddEventDialog {closeCallback} />
</Modal>

{#if !$token}
  <Login />
{/if}

<style lang="postcss">
  :global(html, body, #app) {
    @apply w-full h-full;
  }
</style>
