import App from "./App.svelte";
import "virtual:windi.css";
import "gridjs/dist/theme/mermaid.css";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
