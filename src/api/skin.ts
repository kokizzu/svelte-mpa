import { getToken } from "@/stores/user";
import { fetchApi } from "@/utils/request";

export const skinGet = (id: any) => {
  return new Promise(async (resolv, reject) => {
    const qs = new URLSearchParams({ skinId: id });
    await fetchApi("GET", `SkinGet?${qs}`, null, resolv, reject);
  });
};

export const skinList = (params: any) => {
  return new Promise(async (resolv, reject) => {
    const qs = new URLSearchParams(params);
    await fetchApi("GET", `SkinList?${qs}`, null, resolv, reject);
  });
};

export const skinUpsert = (values: any) => {
  return new Promise(async (resolv, reject) => {
    const data = { ...values, sessionToken: getToken() };
    await fetchApi("POST", "SkinUpsert", JSON.stringify(data), resolv, reject);
  });
};

export const skinUpload = (file: any) => {
  return new Promise(async (resolv, reject) => {
    const data = new FormData();
    data.append("fileBinary", file);
    await fetchApi(
      "POST",
      "SkinUpload?sessionToken=" + getToken(),
      data,
      resolv,
      reject
    );
  });
};
