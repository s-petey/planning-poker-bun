<script lang="ts">
	import { enhance } from '$app/forms';
	import RoomList from '../components/RoomList.svelte';

	export let data;
	export let form;

	let roomName = form?.roomName ?? '';

	$: filteredRooms = data.rooms.filter((room) => {
		return room.name.toLowerCase().includes(roomName.toLowerCase());
	});
</script>

<h2>Search for or select your room</h2>

<form method="POST" class="grid gap-4 justify-items-center text-center" use:enhance>
	<label class="label">
		<span>Create or filter rooms:</span>
		<input
			name="roomName"
			class="input"
			class:input-error={form?.missing}
			type="text"
			bind:value={roomName}
		/>

		{#if form?.missing}
			<p class="error text-error-500">You must enter a room name or select one below.</p>
		{/if}
	</label>

	<button class="btn variant-ghost-primary" type="submit">Create or Join Room</button>
</form>

<RoomList rooms={filteredRooms} />
