import { getToken } from "@/stores/user";
import { fetchApi } from "@/utils/request";

export const eventGet = (id: any) => {
  return new Promise(async (resolv, reject) => {
    const qs = new URLSearchParams({ eventId: id });
    await fetchApi("GET", `EventGet?${qs}`, null, resolv, reject);
  });
};

export const eventList = (params: any) => {
  return new Promise(async (resolv, reject) => {
    const qs = new URLSearchParams(params);
    await fetchApi("GET", `EventList?${qs}`, null, resolv, reject);
  });
};

export const eventUpsert = (values: any) => {
  return new Promise(async (resolv, reject) => {
    const data = { ...values, sessionToken: getToken() };
    await fetchApi("POST", "EventUpsert", JSON.stringify(data), resolv, reject);
  });
};

export const eventUpload = (file: any) => {
  return new Promise(async (resolv, reject) => {
    const data = new FormData();
    data.append("fileBinary", file);
    await fetchApi(
      "POST",
      "EventUpload?sessionToken=" + getToken(),
      data,
      resolv,
      reject
    );
  });
};
