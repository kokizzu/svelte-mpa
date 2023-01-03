<script>
	// should generate index.html
	import Login from './_components/login.svelte'
	import Logo from './_components/logo.svelte'

	let user = {/* user */} || {}
</script>

<div style="display: flex; align-items: center;">
  <h1 style="margin-left: 10px; font-family: sans-serif; color: #4CAF50; font-size: 1.5em;">Dummy Demo</h1>
</div>

{#if !user || !user.Id}
	<Logo></Logo>
	<Login bind:user={user}></Login>
{:else}
	logged in as {JSON.stringify(user)}
{/if}