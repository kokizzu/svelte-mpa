<script lang="ts">
  import Textbox from "@/components/Textbox.svelte";
  import Toggle from "@/components/Toggle";
</script>

<div class="p-8 space-y-4">
  <Textbox type="text" placeholder="Name" label="Textbox" />
  <Toggle offLabel="Off" onLabel="On" label="Status" />
</div>
