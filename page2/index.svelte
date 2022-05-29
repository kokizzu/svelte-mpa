<script>
	// should generate page2/index.html from outer _layout.html
	import Row from './_components/row.svelte'

	export let list = [/* from_server */]

	if (!list.length) {
		list = [
			['A', 1],
			['B', 2],
			['C', 3],
		]
	}
</script>

<div>
	<table>
		<thead>
		<tr>
			<th>Col1</th>
			<th>Col2</th>
		</tr>
		</thead>
		<tbody>
		{#each list as row}
			<Row cells={row}></Row>
		{/each}
		</tbody>
	</table>
</div>
