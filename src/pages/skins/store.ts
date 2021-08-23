import { api } from "@/utils/request";
import { writable } from "svelte/store";

export const elements = writable({});
export const series = writable({});
export const rarities = writable({});

export async function loadData() {
  try {
    const [ele, ser, rar]: any[] = await Promise.all([
      api.get("ElementList").json(),
      api.get("PackList").json(),
      api.get("RarityList").json(),
    ]);

    elements.set(ele.elements);
    series.set(ser.packs);
    rarities.set(rar.rarities);
  } catch (e) {
    console.log(e);
  }
}
