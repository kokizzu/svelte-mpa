<script lang="ts">
	export let value = false;
	export let label = "";
	export let onLabel = "";
	export let offLabel = "";

	const toggleValue = (e: Event) => {
		e.preventDefault();
		value = !value;
	};
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="flex items-center">
	{#if label}
		<p class="text-sm font-semibold">{label}</p>
	{/if}
	<label class="flex items-center cursor-pointer ml-4" on:click={toggleValue}>
		<!-- toggle -->
		<div class="relative">
			<!-- input -->
			<input type="checkbox" class="sr-only" bind:value />
			<!-- line -->
			<div
				class="block {value
					? 'bg-indigo-500'
					: 'bg-gray-400'} w-12 h-7 rounded-full"
			/>
			<!-- dot -->
			<div
				class:dot-checked={value}
				class="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"
			/>
		</div>
		<!-- label -->
		<div class="ml-3 text-gray-700 font-medium text-sm">
			{value ? onLabel : offLabel}
		</div>
	</label>
</div>

<style lang="postcss">
	.dot-checked {
		transform: translateX(100%);
	}
</style>
