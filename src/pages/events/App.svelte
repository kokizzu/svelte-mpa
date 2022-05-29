<script lang="ts">
  import Button from '@/components/Button';
  import Login from '@/components/Login.svelte';
  import Sidebar from '@/components/Sidebar.svelte';
  import { token } from '@/stores/user';
  import Grid from 'gridjs-svelte';
  import Modal from 'attractions/modal/modal.svelte';
  import { endpoint } from '@/utils/request';
  import EventDialog from './EventDialog.svelte';
  import { eventGet, eventUpsert } from '@/api/event';
  import { btn, del, raw } from '@/utils/vdom';
  import tinydate from 'tinydate';

  let showDialog = false;
  let selectedId = null;

  let gridInstance;

  const formatDate = tinydate('{DD}/{MM}/{YYYY}');

  const editEvent = function (id: any) {
    selectedId = id;
    showDialog = true;
  };

  const deleteEvent = async function (id: any) {
    try {
      const detail = (await eventGet(id)) as any;
      const res = await eventUpsert({
        ...detail.event,
        doDelete: true,
        eventId: id,
      });
      rerenderGrid();
    } catch (e) {
      console.log(e);
    }
  };

  const restoreEvent = async function (id: any) {
    try {
      const detail = (await eventGet(id)) as any;
      const res = await eventUpsert({
        ...detail.event,
        doRestore: true,
        eventId: id,
      });
      rerenderGrid();
    } catch (e) {
      console.log(e);
    }
  };

  function rerenderGrid() {
    gridInstance.forceRender();
  }

  const transformData = (events: any) => {
    return events.map(evt => {
      const deleted = evt.isDeleted;
      return [
        [
          btn({
            text: 'Edit',
            onClick: () => editEvent(evt.id),
            className: 'text-indigo-500 mr-2',
          }),
          !deleted
            ? btn({
                text: 'Delete',
                onClick: () => deleteEvent(evt.id),
                className: 'text-red-500',
              })
            : btn({
                text: 'Restore',
                onClick: () => restoreEvent(evt.id),
                className: 'text-green-500',
              }),
        ],
        evt.id,
        !deleted ? evt.name : del(evt.name),
        raw(evt.descrHtml),
        formatDate(new Date(evt.createdAt * 1000)),
      ];
    });
  };
</script>

<div class="w-full h-full flex">
  <Sidebar />
  <div class="min-h-full p-8 w-full overflow-y-auto">
    <Button class="mb-2" on:click={() => (showDialog = true)}>Add Event</Button>
    <Grid
      bind:instance={gridInstance}
      columns={[
        'Action',
        {
          name: 'id',
          hidden: true,
        },
        'Name',
        'Description',
        'Created At',
      ]}
      pagination={{
        enabled: true,
        limit: 10,
        server: {
          url: (prev, page, limit) => `${prev}?limit=${limit}&offset=${page * limit}`,
        },
      }}
      server={{
        url: `${endpoint}/EventList`,
        then: data => transformData(data.events),
        total: data => data.total,
      }}
    />
  </div>
</div>

<Modal bind:open={showDialog} let:closeCallback class="py-8 px-4" noClickaway>
  {#if showDialog}
    <EventDialog {closeCallback} onSave={rerenderGrid} id={selectedId} />
  {/if}
</Modal>

{#if !$token}
  <Login />
{/if}

<style global windi:global windi:preflights windi:safelist>
  html, body, #app {
    @apply w-full h-full;
  }
</style>
