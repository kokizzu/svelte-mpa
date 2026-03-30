<script>
	import Links from '../../_components/links.svelte'
	let count = $state(0);

	function doSomething() {
		count++
	}
</script>

<button onclick={doSomething}>clicked {count}x</button>
<Links></Links>
