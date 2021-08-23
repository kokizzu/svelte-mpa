<script lang="ts">
  import { token } from "@/stores/user";
  import { api } from "@/utils/request";

  const routes = [
    { label: "Skin List", path: "/skins" },
    { label: "Event List", path: "/events" },
  ];

  const handleLogout = async () => {
    try {
      const _ = await api.post("PlayerLogout").json();
      token.set("");
    } catch (e) {
      console.log(e);
    }
  };
</script>

<div class="w-[250px] bg-gray-300 h-full p-2 space-y-2 flex-shrink-0 relative">
  {#each routes as route}
    <a href={route.path} class="block font-semibold">{route.label}</a>
  {/each}

  {#if $token}
    <a
      href="/logout"
      class="absolute bottom-2 left-2 font-semibold"
      on:click|preventDefault={handleLogout}
    >
      Logout
    </a>
  {/if}
</div>
