<script>
	// should generate page1/subpage.html from nearest _layout.html
	import Links from '../_components/links.svelte'
	export let foo = {/* something */} 

	if (Object.keys(foo).length == 0) {
		foo = {a: 1, b: 2}
	}
</script>

<div>
	just random subpage, should generate page1/subpage.html
	<code>{JSON.stringify(foo)}</code>
</div>
<Links></Links>
