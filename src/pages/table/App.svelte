<script lang="ts">
  import Grid from "gridjs-svelte";

  const columns = ["Name", "Email"];
  const rows = [
    { name: "John", email: "john@example.com" },
    { name: "Mark", email: "mark@gmail.com" },
    { name: "Asdf", email: "asdf@gmail.com" },
    { name: "Zxcv", email: "zxcv@gmail.com" },
    { name: "Qwer", email: "qwer@gmail.com" },
    { name: "Hjkl", email: "hjkl@gmail.com" },
  ];
</script>

<div class="p-8 space-y-4">
  <Grid data={rows} {columns} pagination={{ limit: 2, enabled: true }} />
</div>
