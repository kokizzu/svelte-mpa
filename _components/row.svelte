<script>
	export let cells = [];
	// since _components starts with underscore, should not generate .html automatically
</script>

<tr>
	{#each cells as cell}
		<td>{cell}</td>
	{/each}
</tr>

<style>
	td {
		border: 1px solid blue;
	}
</style>
