<script lang="ts">
  import Textbox from "@/components/Textbox";
  import Toggle from "@/components/Toggle";
  import Combobox from "@/components/Combobox";
  import { TextField, DatePicker, Switch } from "attractions";
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

  <a href="/table">Table</a>

  <div class="text-xl font-bold">Attractions</div>

  <div>
    <p class="font-semibold">Textbox</p>
    <TextField placeholder="Input..." />
  </div>
  <div>
    <p class="font-semibold">Datepicker</p>
    <DatePicker format="%m/%d/%Y" />
  </div>

  <div>
    <p class="font-semibold">Datepicker range</p>
    <DatePicker format="%m/%d/%Y" range />
  </div>
  <div class="flex items-center">
    <p class="font-semibold mr-5">Toggle</p>
    <Switch />
  </div>
</div>
