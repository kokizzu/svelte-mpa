<script lang="ts">
	export let placeholder = "";
	export let value = "";
	export let label = "";
</script>

<label class="textbox">
	{#if label}
		<span class="textbox-label">{label}</span>
	{/if}
	<input
		{placeholder}
		bind:value
		on:change
		on:input
		{...$$restProps}
		class="textbox-input"
	/>
</label>

<style lang="postcss">
	.textbox {
		@apply block w-full;
	}

	.textbox-label {
		@apply font-semibold text-sm block mb-1;
	}

	.textbox-input {
		@apply w-full rounded;
	}

	.textbox-input:focus {
		@apply border-indigo-500;
	}
</style>
