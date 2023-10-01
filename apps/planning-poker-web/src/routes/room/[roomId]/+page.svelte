<script lang="ts">
	import { enhance } from '$app/forms';
	import DisplayList from '@components/DisplayList.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data;
	export let form;

	let roomName = data.room.name;
</script>

<form method="POST" use:enhance class="grid gap-4 justify-items-center text-center">
	<label class="label">
		<span>Your Display Name:</span>
		<input
			name="displayName"
			class="input"
			class:input-error={form?.missing}
			type="text"
			value={form?.displayName ?? ''}
		/>

		{#if form?.missing}
			<p class="error text-error-500">You must enter a display name.</p>
		{/if}
	</label>

	<SlideToggle name="isHost" checked={form?.isHost}>Room Host</SlideToggle>

	<button class="btn variant-ghost-primary" type="submit">Join room</button>
</form>

<DisplayList displays={data.room.displays} {roomName} />
