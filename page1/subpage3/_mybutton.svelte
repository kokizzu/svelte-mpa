<script>
	import Links from '../../_components/links.svelte'
	let count = 0;

	function doSomething() {
		count++
	}
</script>

<button on:click={doSomething}>clicked {count}x</button>
<Links></Links>
