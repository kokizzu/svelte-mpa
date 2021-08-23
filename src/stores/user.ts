import { get, writable } from "svelte/store";

export const token = writable(localStorage.getItem("sessionToken") || "");
token.subscribe((v) => localStorage.setItem("sessionToken", v));

export const getToken = () => get(token);
