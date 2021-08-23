import { h, html } from "gridjs";

export const btn = ({ text, onClick, className }) => {
  return h(
    "button",
    {
      onClick,
      className,
    },
    text
  );
};

export const del = (text) => {
  return h("del", {}, text);
};

export const raw = (content) => {
  return html(content);
};
