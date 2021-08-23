<script lang="ts">
  import { api } from "@/utils/request";
  import { token } from "@/stores/user";

  import Button from "./Button";
  import Textbox from "./Textbox";

  const values = {
    email: "kiswono@gmail.com",
    password: "kiswono@gmail.com",
  };

  const handleSubmit = async () => {
    try {
      const res = (await api
        .post("PlayerLogin", {
          json: values,
        })
        .json()) as any;
      token.set(res.sessionToken);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<div class="login px-6 md:px-0">
  <div class="max-w-md w-full rounded bg-white shadow p-5">
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <Textbox type="email" bind:value={values.email} />
      <Textbox type="password" bind:value={values.password} />
      <Button type="submit" block>Login</Button>
    </form>
  </div>
</div>

<style lang="postcss">
  .login {
    @apply w-full h-full grid place-items-center bg-opacity-40 bg-black fixed inset-0 z-50;
  }
</style>
