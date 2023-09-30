<script lang="ts">
	export let number: number;
	export let selectedNumber: number | undefined;
	export let clickAction: (number: number) => void;

	const selected = typeof selectedNumber === 'number' && selectedNumber === number;
	const isSelectedValid = typeof selectedNumber === 'number' && selectedNumber > 0;
</script>

<input type="hidden" name="selected" value={number} />
<button
	class={'card card-hover p-8 w-[100px] text-center variant-filled-surface'}
	type="submit"
	disabled={isSelectedValid}
	aria-disabled={isSelectedValid}
	on:click={() => clickAction(number)}
>
	<h2 class:text-success-500={selected} class:text-error-500={isSelectedValid}>
		{number}
	</h2>
</button>
