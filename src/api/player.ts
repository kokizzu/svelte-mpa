import { fetchApi } from "@/utils/request";

export const playerLogin = (values: any) => {
  return new Promise(async (resolv, reject) => {
    await fetchApi(
      "POST",
      `PlayerLogin`,
      JSON.stringify(values),
      resolv,
      reject
    );
  });
};
