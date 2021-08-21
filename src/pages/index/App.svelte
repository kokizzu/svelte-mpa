<script lang="ts">
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import Combobox from "@/components/Combobox";
</script>

<div class="p-8 space-y-4">
  <Textbox type="text" placeholder="Name" label="Textbox" />
  <Toggle offLabel="Off" onLabel="On" label="Status" />
  <Combobox
    label="Combobox"
    placeholder="Select.."
    options={["Apple", "Orange", "Pineapple"]}
    value="Orange"
  />
</div>
