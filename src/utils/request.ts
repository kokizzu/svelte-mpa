import ky from "ky";
export const endpoint =
  "http://localhost:8080/https://diamondhandsapi.candlestick.com/api";

const api = ky.create({
  prefixUrl: endpoint,
});

async function fetchApi(
  method: "GET" | "POST",
  path: string,
  data: any,
  cbOk: Function,
  cbErr: Function
) {
  try {
    const opts: Record<string, any> = { method };

    if (method === "POST" && !(data instanceof FormData)) {
      opts.headers = {
        "Content-Type": "application/json",
      };
    }

    if (data) {
      opts.body = data;
    }
    const res = await api(path, opts).json();
    cbOk(res);
  } catch (e) {
    console.log(e);
    cbErr(e);
  }
}

export { api, fetchApi };
