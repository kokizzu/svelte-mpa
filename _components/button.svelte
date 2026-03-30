<script>
	let { title = $bindable('') } = $props()
	// since _components starts with underscore, should not generate .html automatically
	function appendTitle() {
		title += 'x'
	}
</script>

<button onclick={appendTitle}>{title}</button>
